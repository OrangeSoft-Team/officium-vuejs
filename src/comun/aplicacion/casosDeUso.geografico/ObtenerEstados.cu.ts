import { EstadoMapeador } from "../mapeador/Estado.mapeador";
import { CasoUso } from "../casoUso";
import { Resultado } from "../../dominio/resultado";
import { EstadoDTO } from "../dto.geografico/EstadoDTO";
import { IServicioEstado } from "../IServicioEstado";

export interface SolicitudEstadoDTO {
    idPais: string;
}
