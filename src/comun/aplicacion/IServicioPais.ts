import { Resultado } from "../dominio/resultado";
import { PaisDTO } from "./dto.geografico/PaisDTO";

export interface IServicioPais {
    obtenerPaises(): Resultado<PaisDTO[]>;
}
