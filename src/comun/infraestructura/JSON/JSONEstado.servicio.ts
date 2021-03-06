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
    obtenerEstado(
        solicitud: SolicitudEstadoUnicoDTO
    ): Promise<Resultado<EstadoDTO>> {
        return new Promise(async (resolve, reject) => {
            const respuestaEstados: Resultado<EstadoDTO[]> =
                await this.obtenerEstados({
                    idPais: solicitud.idPais,
                });
            if (respuestaEstados.esFallido)
                resolve(Resultado.falla<any>(respuestaEstados.error));

            for (let estado of respuestaEstados.getValue()) {
                if (estado.uuidEstado == solicitud.idEstado) {
                    resolve(Resultado.ok<EstadoDTO>(estado));
                }
            }

            resolve(Resultado.falla<any>(OPERACION_FALLIDA));
        });
    }
    obtenerEstados(id: SolicitudEstadoDTO): Promise<Resultado<EstadoDTO[]>> {
        return new Promise((resolve, reject) => {
            //let DATOS_RESPUESTA: EstadoDTO[] = [];

            //Obtenemos de persitencia
            if (id.idPais == "00000000-0000-0000-C000-000000000050")
                resolve(Resultado.ok<EstadoDTO[]>(LISTADO_ESTADO_VENEZUELA));
            else if (id.idPais == "00000000-0000-0000-C000-000000000040")
                resolve(Resultado.ok<EstadoDTO[]>(LISTADO_ESTADO_USA));
            else resolve(Resultado.ok<EstadoDTO[]>(LISTADO_ESTADO_COLOMBIA));
        });
    }
}
