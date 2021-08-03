import { Resultado } from "../dominio/resultado";
import { PaisDTO } from "./dto.geografico/PaisDTO";

export interface SolicitudPaisDTO {
    uuidPais: string;
}

export interface IServicioPais {
    obtenerPaises(): Promise<Resultado<PaisDTO[]>>;

    obtenerPais(solicitud: SolicitudPaisDTO): Promise<Resultado<PaisDTO>>;
}
