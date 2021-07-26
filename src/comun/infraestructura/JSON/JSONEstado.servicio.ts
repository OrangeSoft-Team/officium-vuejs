import { EstadoDTO } from "../../aplicacion/dto.geografico/EstadoDTO";
import {
    IServicioEstado,
    SolicitudEstadoUnicoDTO,
} from "../../aplicacion/IServicioEstado";
import { SolicitudEstadoDTO } from "../../aplicacion/casosDeUso.geografico/ObtenerEstados.cu";
import { Resultado } from "../../dominio/resultado";
import {
    LISTADO_ESTADO_VENEZUELA,
    LISTADO_ESTADO_COLOMBIA,
    LISTADO_ESTADO_USA,
} from "./respuestas/ListadoEstado";
import { OPERACION_FALLIDA } from "../../aplicacion/dto.respuestaOperaciones/OperacionFallida";

export class JSONEstadoServicio implements IServicioEstado {
    obtenerEstado(solicitud: SolicitudEstadoUnicoDTO): Resultado<EstadoDTO> {
        const respuestaEstados: Resultado<EstadoDTO[]> = this.obtenerEstados({
            idPais: solicitud.idPais,
        });
        if (respuestaEstados.esFallido)
            return Resultado.falla<any>(respuestaEstados.error);

        for (let estado of respuestaEstados.getValue()) {
            if (estado.uuidEstado == solicitud.idEstado) {
                return Resultado.ok<EstadoDTO>(estado);
            }
        }

        return Resultado.falla<any>(OPERACION_FALLIDA);
    }
    obtenerEstados(id: SolicitudEstadoDTO): Resultado<EstadoDTO[]> {
        //let DATOS_RESPUESTA: EstadoDTO[] = [];

        //Obtenemos de persitencia
        if (id.idPais == "00000000-0000-0000-C000-000000000050")
            return Resultado.ok<EstadoDTO[]>(LISTADO_ESTADO_VENEZUELA);
        else if (id.idPais == "00000000-0000-0000-C000-000000000040")
            return Resultado.ok<EstadoDTO[]>(LISTADO_ESTADO_USA);
        else return Resultado.ok<EstadoDTO[]>(LISTADO_ESTADO_COLOMBIA);
    }
}
