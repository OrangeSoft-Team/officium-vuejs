import { Entidad } from "../entidad";
import { Resultado } from "../resultado";
import { Identificador } from "../valueObjects/Identificador";
import { NombreEstado } from "../valueObjects/nombreEstado";

interface EstadoProps {
    idPais: Identificador;
    nombreEstado?: NombreEstado;
}

export class Estado extends Entidad<EstadoProps> {
    public static crear(props: EstadoProps): Resultado<Estado> {
        if (
            props.hasOwnProperty("nombreEstado") &&
            props.nombreEstado != undefined
        ) {
            let nombreOrError = NombreEstado.crear(props.nombreEstado.valor());
            if (nombreOrError.esFallido)
                return Resultado.falla<any>(nombreOrError.error);
        }
            
        let idOrError = Identificador.crear(props.idPais.valor());
        if (idOrError.esFallido)
            return Resultado.falla<any>(idOrError.error);

        return Resultado.ok<Estado>(new Estado(props));
    }
}
