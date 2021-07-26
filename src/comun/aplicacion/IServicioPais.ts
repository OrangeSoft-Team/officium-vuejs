import { Resultado } from "../dominio/resultado";
import { PaisDTO } from "./dto.geografico/PaisDTO";

export interface SolicitudPaisDTO {
    uuidPais: string;
}

export interface IServicioPais {
    obtenerPaises(): Resultado<PaisDTO[]>;

    obtenerPais(solicitud: SolicitudPaisDTO): Resultado<PaisDTO>;
}
