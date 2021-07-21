import { Entidad } from "../entidad";
import { Resultado } from "../resultado";
import { Identificador } from "../valueObjects/Identificador";
import { NombreHabilidad } from "../valueObjects/nombreHabilidad";
import { CategoriaHabilidad } from "../valueObjects/categoriaHabilidad";

export interface HabilidadProps {
    idHabilidad?: Identificador;
    nombre: NombreHabilidad;
    categoria: CategoriaHabilidad;
}

export class Habilidad extends Entidad<HabilidadProps> {
    public static crear(props: HabilidadProps): Resultado<Habilidad> {
        return Resultado.ok<Habilidad>(new Habilidad(props));
    }
}
