import { Resultado } from "../dominio/resultado";
import { HabilidadDTO } from "./dtos/HabilidadDTO";

export interface IServicioHabilidades {
    obtenerHabilidades(): Resultado<HabilidadDTO[]>;
}
