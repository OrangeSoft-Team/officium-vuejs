import { CiudadMapeador } from "../../comun/aplicacion/mapeador/Ciudad.mapaeador";
import { EstadoMapeador } from "../../comun/aplicacion/mapeador/Estado.mapeador";
import { PaisMapeador } from "../../comun/aplicacion/mapeador/Pais.mapeador";
import { HabilidadMapeador } from "../../comun/aplicacion/mapeador/Habilidad.mapeador";
import { Pais } from "../../comun/dominio/entidades/Pais";
import { Resultado } from "../../comun/dominio/resultado";
import { codigoPostal } from "../../comun/dominio/valueObjects/codigoPostal";
import { Correo } from "../../comun/dominio/valueObjects/correoElectronico";
import { DireccionCalle } from "../../comun/dominio/valueObjects/direccionCalle";
import { Identificador } from "../../comun/dominio/valueObjects/Identificador";
import { requisitosEspeciales } from "../../comun/dominio/valueObjects/requisitosEspeciales";
import { Direccion } from "../../comun/dominio/entidades/Direccion";
import { Empresa, EmpresaProps } from "../dominio/Empresa";
import { NombreEmpresa } from "../dominio/valueObjects/nombreEmpresa";
import { DatosBasicosEmpresaDTO } from "./dto/DatosBasicosEmpresaDTO";
import { DireccionMapeador } from "../../comun/aplicacion/mapeador/Direccion.mapaeador";
import { DireccionDTO } from "../../comun/aplicacion/dtos/DireccionDTO";

export class DatosBasicosMapeador {
    public static aDominio(dto: DatosBasicosEmpresaDTO): Resultado<Empresa> {
        let nombreOrError = NombreEmpresa.crear(dto.nombreEmpresa);
        if (nombreOrError.esFallido)
            return Resultado.falla<any>(nombreOrError.error);

        let correoOrError = Correo.crear(dto.correoElectronico);
        if (correoOrError.esFallido)
            return Resultado.falla<any>(correoOrError.error);

        let paisOrError = PaisMapeador.aDominio({ uuidPais: dto.uuidPais });
        if (paisOrError.esFallido)
            return Resultado.falla<any>(paisOrError.error);

        let estadoOrError = EstadoMapeador.aDominio({
            uuidEstado: dto.uuidEstado,
        });
        if (estadoOrError.esFallido)
            return Resultado.falla<any>(estadoOrError.error);

        let ciudadOrError = CiudadMapeador.aDominio({
            uuidCiudad: dto.uuidCiudad,
        });
        if (ciudadOrError.esFallido)
            return Resultado.falla<any>(ciudadOrError.error);

        /*
        let habilidadesOrError = HabilidadMapeador.aDominioConjunto({
            dtos: dto.habilidad
        });
        if (ciudadOrError.esFallido)
            return Resultado.falla<any>(ciudadOrError.error);
        */

        //Entidad direccion
        let direccionDTO: DireccionDTO = {
            calleUno: dto.calleUno,
            codigoPostal: dto.codigoPostal,
        };
        if (dto.hasOwnProperty("calleDos") && dto.calleDos != undefined)
            direccionDTO.calleDos = dto.calleDos;

        const direccionOrError = DireccionMapeador.aDominio(direccionDTO);
        if (direccionOrError.esFallido)
            return Resultado.falla<any>(direccionOrError.error);

        const empresaProps: EmpresaProps = {
            nombre: nombreOrError.getValue(),
            correoElectronico: correoOrError.getValue(),
            direccion: direccionOrError.getValue(),
            pais: paisOrError.getValue(),
            estado: estadoOrError.getValue(),
            ciudad: ciudadOrError.getValue(),
        };

        let idEmpresaOrError: Resultado<Identificador>;
        if (dto.hasOwnProperty("uuidEmpresa") && dto.uuidEmpresa != undefined) {
            idEmpresaOrError = Identificador.crear(dto.uuidEmpresa);
            if (idEmpresaOrError.esFallido)
                return Resultado.falla<any>(idEmpresaOrError.error);

            //Agregamos al ser valido
            empresaProps.idEmpresa = idEmpresaOrError.getValue();
        }

        let reqEspecialesOrError: Resultado<requisitosEspeciales>;
        if (
            dto.hasOwnProperty("requisitosEspeciales") &&
            dto.requisitosEspeciales != undefined
        ) {
            reqEspecialesOrError = requisitosEspeciales.crear(
                dto.requisitosEspeciales
            );
            if (reqEspecialesOrError.esFallido)
                return Resultado.falla<any>(reqEspecialesOrError.error);

            //Agregamos al ser valido
            empresaProps.requisitosEspeciales = reqEspecialesOrError.getValue();
        }

        /*
        let calleDosOrError: Resultado<DireccionCalle>;
        if (dto.hasOwnProperty("calleDos") && dto.calleDos != undefined) {
            calleDosOrError = requisitosEspeciales.crear(dto.calleDos);
            if (calleDosOrError.esFallido)
                return Resultado.falla<any>(calleDosOrError.error);

            //Agregamos al ser valido
            empresaProps.calleDos = calleDosOrError.getValue();
        }
        */

        return Resultado.ok<Empresa>(Empresa.crear(empresaProps).getValue());
    }

    public static aDTO(entidad: Empresa): Resultado<DatosBasicosEmpresaDTO> {
        //Extraemos valores de la entidad
        let propsDTO: DatosBasicosEmpresaDTO = {
            nombreEmpresa: entidad.props.nombre.valor(),
            correoElectronico: entidad.props.correoElectronico.valor(),
            calleUno: entidad.props.direccion.props.calleUno.valor(),
            codigoPostal: entidad.props.direccion.props.codigoPostal.valor(),
            uuidPais: entidad.props.pais.props.idPais.valor(),
            uuidEstado: entidad.props.estado.props.idEstado.valor(),
            uuidCiudad: entidad.props.ciudad.props.idCiudad.valor(),
        };

        //Opcionales
        if (
            entidad.props.hasOwnProperty("idEmpresa") &&
            entidad.props.idEmpresa != undefined
        ) {
            propsDTO.uuidEmpresa = entidad.props.idEmpresa.valor();
        }
        if (
            entidad.props.hasOwnProperty("requisitosEspeciales") &&
            entidad.props.requisitosEspeciales != undefined
        ) {
            propsDTO.requisitosEspeciales =
                entidad.props.requisitosEspeciales.valor();
        }
        if (
            entidad.props.hasOwnProperty("calleDos") &&
            entidad.props.direccion.props.calleDos != undefined
        ) {
            propsDTO.calleDos = entidad.props.direccion.props.calleDos.valor();
        }

        return Resultado.ok<DatosBasicosEmpresaDTO>(propsDTO);
    }
}
