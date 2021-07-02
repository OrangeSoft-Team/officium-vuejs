import { Entidad } from "../entidad";
import { Resultado } from "../resultado";
import { Identificador } from "../valueObjects/Identificador";
import { NombreCiudad } from "../valueObjects/nombreCiudad";

export interface CiudadProps {
    idCiudad: Identificador;
    nombreCiudad?: NombreCiudad;
}

export class Ciudad extends Entidad<CiudadProps> {
    public static crear(props: CiudadProps): Resultado<Ciudad> {
        return Resultado.ok<Ciudad>(new Ciudad(props));
    }
}
