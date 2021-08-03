import { Resultado } from "../../comun/dominio/resultado";
import { Empresa } from "../dominio/Empresa";
import { HabilidadMapeador } from "../../comun/aplicacion/mapeador/Habilidad.mapeador";
import { ActualizarDatosBasicosEmpresaDTO } from "./dto/DatosBasicosEmpresaDTO";

export class ActualizarDatosBasicosMapeador {
    public static aDTO(
        entidad: Empresa
    ): Resultado<ActualizarDatosBasicosEmpresaDTO> {
        //Transformacion de habilidad
        const habilidadesOrError = HabilidadMapeador.aDTOConjunto(
            entidad.props.habilidades
        );
        if (habilidadesOrError.esFallido)
            return Resultado.falla<any>(habilidadesOrError.error);

        //Extraemos valores de la entidad
        let propsDTO: ActualizarDatosBasicosEmpresaDTO = {
            nombreEmpresa: entidad.props.nombre.valor(),
            calleUno: entidad.props.direccion.props.calleUno.valor(),
            codigoPostal: entidad.props.direccion.props.codigoPostal.valor(),
            uuidPais: entidad.props.pais.props.idPais.valor(),
            uuidEstado: entidad.props.estado.props.idEstado.valor(),
            uuidCiudad: entidad.props.ciudad.props.idCiudad.valor(),
            uuidHabilidades: HabilidadMapeador.aArregloID(
                habilidadesOrError.getValue()
            ),
        };

        if (
            entidad.props.hasOwnProperty("requisitosEspeciales") &&
            entidad.props.requisitosEspeciales != undefined
        ) {
            propsDTO.requisitosEspeciales =
                entidad.props.requisitosEspeciales.valor();
        }
        if (
            entidad.props.direccion.props.hasOwnProperty("calleDos") &&
            entidad.props.direccion.props.calleDos != undefined
        ) {
            propsDTO.calleDos = entidad.props.direccion.props.calleDos.valor();
        }

        return Resultado.ok<ActualizarDatosBasicosEmpresaDTO>(propsDTO);
    }
}
