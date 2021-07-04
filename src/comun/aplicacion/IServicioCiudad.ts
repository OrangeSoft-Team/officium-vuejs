import { Resultado } from "../dominio/resultado";
import { CiudadDTO } from "./dto.geografico/CiudadDTO";
import { SolicitudCiudadDTO } from "./casosDeUso.geografico/ObtenerCiudades.cu";

export interface IServicioCiudad {
    obtenerCiudades(
        id: SolicitudCiudadDTO
    ): Resultado<CiudadDTO[]>;
}
