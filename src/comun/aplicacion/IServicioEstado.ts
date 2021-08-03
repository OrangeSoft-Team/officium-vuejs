import { Resultado } from "../dominio/resultado";
import { EstadoDTO } from "./dto.geografico/EstadoDTO";
import { SolicitudEstadoDTO } from "./casosDeUso.geografico/ObtenerEstados.cu";

export interface SolicitudEstadoUnicoDTO {
    idPais: string;
    idEstado: string;
}

export interface IServicioEstado {
    obtenerEstados(id: SolicitudEstadoDTO): Promise<Resultado<EstadoDTO[]>>;

    obtenerEstado(
        solicitud: SolicitudEstadoUnicoDTO
    ): Promise<Resultado<EstadoDTO>>;
}
