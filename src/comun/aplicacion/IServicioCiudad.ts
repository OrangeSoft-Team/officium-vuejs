import { Resultado } from "../dominio/resultado";
import { CiudadDTO } from "./dto.geografico/CiudadDTO";
import { SolicitudCiudadDTO } from "./casosDeUso.geografico/ObtenerCiudades.cu";

export interface SolicitudCiudadUnicaDTO {
    idEstado: string;
    idCiudad: string;
}

export interface IServicioCiudad {
    obtenerCiudades(id: SolicitudCiudadDTO): Promise<Resultado<CiudadDTO[]>>;

    obtenerCiudad(id: SolicitudCiudadUnicaDTO): Promise<Resultado<CiudadDTO>>;
}
