import { CiudadMapeador } from "../../comun/aplicacion/mapeador/Ciudad.mapaeador";
import { EstadoMapeador } from "../../comun/aplicacion/mapeador/Estado.mapeador";
import { PaisMapeador } from "../../comun/aplicacion/mapeador/Pais.mapeador";
import { Pais } from "../../comun/dominio/entidades/Pais";
import { Resultado } from "../../comun/dominio/resultado";
import { codigoPostal } from "../../comun/dominio/valueObjects/codigoPostal";
import { Correo } from "../../comun/dominio/valueObjects/correoElectronico";
import { DireccionCalle } from "../../comun/dominio/valueObjects/direccionCalle";
import { Identificador } from "../../comun/dominio/valueObjects/Identificador";
import { Empresa, EmpresaProps } from "../dominio/Empresa";
import { NombreEmpresa } from "../dominio/valueObjects/nombreEmpresa";
import { DatosBasicosEmpresaDTO } from "./dto/DatosBasicosEmpresaDTO";

export class DatosBasicosMapeador {
    public static aDominio(dto: DatosBasicosEmpresaDTO): Resultado<Empresa> {
        let nombreOrError = NombreEmpresa.crear(dto.nombreEmpresa);
        if (nombreOrError.esFallido)
            return Resultado.falla<any>(nombreOrError.error);

        let correoOrError = Correo.crear(dto.correoElectronico);
        if (correoOrError.esFallido)
            return Resultado.falla<any>(correoOrError.error);

        let direccionOrError = DireccionCalle.crear(dto.direccionCalle);
        if (direccionOrError.esFallido)
            return Resultado.falla<any>(direccionOrError.error);

        let codigoPostalOrError = codigoPostal.crear(dto.codigoPostal);
        if (codigoPostalOrError.esFallido)
            return Resultado.falla<any>(codigoPostalOrError.esFallido);

        let paisOrError = PaisMapeador.aDominio({ uuidPais: dto.uuidPais });
        if (paisOrError.esFallido)
            return Resultado.falla<any>(paisOrError.esFallido);

        let estadoOrError = EstadoMapeador.aDominio({
            uuidEstado: dto.uuidEstado,
        });
        if (estadoOrError.esFallido)
            return Resultado.falla<any>(estadoOrError.esFallido);

        let ciudadOrError = CiudadMapeador.aDominio({
            uuidCiudad: dto.uuidCiudad,
        });
        if (ciudadOrError.esFallido)
            return Resultado.falla<any>(ciudadOrError.esFallido);

        const empresaProps: EmpresaProps = {
            nombre: nombreOrError.getValue(),
            correoElectronico: correoOrError.getValue(),
            direccionCalle: direccionOrError.getValue(),
            codigoPostal: codigoPostalOrError.getValue(),
            pais: paisOrError.getValue(),
            estado: estadoOrError.getValue(),
            ciudad: ciudadOrError.getValue(),
        };

        let idEmpresaOrError: Resultado<Identificador>;
        if (dto.hasOwnProperty("uuidEmpresa")) {
            idEmpresaOrError = Identificador.crear(dto.uuuidEmpresa);
            if (idEmpresaOrError.esFallido)
                return Resultado.falla<any>(idEmpresaOrError.error);

            //Agregamos al ser valido
            empresaProps.idEmpresa = idEmpresaOrError.getValue();
        }

        return Resultado.ok<Empresa>(Empresa.crear(empresaProps).getValue());
    }

    public static aDTO(entidad: Empresa): Resultado<DatosBasicosEmpresaDTO> {
        //Extraemos valores de la entidad
        let propsDTO: DatosBasicosEmpresaDTO = {
            nombreEmpresa: entidad.props.nombre.valor(),
            correoElectronico: entidad.props.correoElectronico.valor(),
            direccionCalle: entidad.props.direccionCalle.valor(),
            codigoPostal: entidad.props.codigoPostal.valor(),
            uuidPais: entidad.props.pais.props.idPais.valor(),
            uuidEstado: entidad.props.estado.props.idEstado.valor(),
            uuidCiudad: entidad.props.ciudad.props.idCiudad.valor(),
        };

        //Opcionales
        if (entidad.props.hasOwnProperty("idEmpresa")) {
            propsDTO.uuuidEmpresa = entidad.props.idEmpresa.valor();
        }

        return Resultado.ok<DatosBasicosEmpresaDTO>(propsDTO);
    }
}
