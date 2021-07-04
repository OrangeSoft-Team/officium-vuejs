import { Resultado } from "../dominio/resultado";
import { EstadoDTO } from "./dto.geografico/EstadoDTO";
import { SolicitudEstadoDTO } from "./casosDeUso.geografico/ObtenerEstados.cu";

export interface IServicioEstado {
    obtenerEstados(
        id: SolicitudEstadoDTO
    ): Resultado<EstadoDTO[]>;
}
