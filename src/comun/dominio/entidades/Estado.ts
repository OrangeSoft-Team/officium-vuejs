import { Entidad } from "../entidad";
import { Resultado } from "../resultado";
import { Identificador } from "../valueObjects/Identificador";
import { NombreEstado } from "../valueObjects/nombreEstado";

export interface EstadoProps {
    idEstado: Identificador;
    nombreEstado?: NombreEstado;
}

export class Estado extends Entidad<EstadoProps> {
    public static crear(props: EstadoProps): Resultado<Estado> {
        return Resultado.ok<Estado>(new Estado(props));
    }
}
