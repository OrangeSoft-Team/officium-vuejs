import { Entidad } from "..//entidad";
import { Resultado } from "..//resultado";
import { Identificador } from "../valueObjects/Identificador";
import { NombrePais } from "../valueObjects/nombrePais";

export interface PaisProps {
    idPais: Identificador;
    nombrePais?: NombrePais;
}

export class Pais extends Entidad<PaisProps> {
    public static crear(props: PaisProps): Resultado<Pais> {
        return Resultado.ok<Pais>(new Pais(props));
    }
}
