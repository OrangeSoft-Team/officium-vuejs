import { Entidad } from "../entidad";
import { Resultado } from "../resultado";
import { Identificador } from "../valueObjects/Identificador";
import { nombreHabilidad } from "../valueObjects/nombreHabilidad";
import { categoriaHabilidad } from "../valueObjects/categoriaHabilidad";

export interface HabilidadProps {
    idHabilidad: Identificador;
    nombre?: nombreHabilidad;
    categoria?: categoriaHabilidad;
}

export class Habilidad extends Entidad<HabilidadProps> {
    public static crear(props: HabilidadProps): Resultado<Habilidad> {
        return Resultado.ok<Habilidad>(new Habilidad(props));
    }
}
