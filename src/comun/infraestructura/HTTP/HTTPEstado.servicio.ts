import { EstadoDTO } from "../../aplicacion/dto.geografico/EstadoDTO";
import {
    IServicioEstado,
    SolicitudEstadoUnicoDTO,
} from "../../aplicacion/IServicioEstado";
import { SolicitudEstadoDTO } from "../../aplicacion/casosDeUso.geografico/ObtenerEstados.cu";
import { Resultado } from "../../dominio/resultado";
import { OPERACION_FALLIDA } from "../../aplicacion/dto.respuestaOperaciones/OperacionFallida";
import axios from "axios";
import { NEST_URL_BASE } from "../../../main";

export class HTTPEstadoServicio implements IServicioEstado {
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
            axios
                .get(
                    NEST_URL_BASE + "ubicacion/paises/" + id.idPais + "/estados"
                )
                .then((res) => {
                    resolve(Resultado.ok<EstadoDTO[]>(res.data));
                })
                .catch((e) => {
                    resolve(Resultado.falla<any>(e));
                });
        });
    }
}
