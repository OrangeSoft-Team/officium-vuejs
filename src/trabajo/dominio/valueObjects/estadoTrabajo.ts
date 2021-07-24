import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import { ESTADO_TRABAJO_NO_RECONOCIDO } from "../excepciones/estadoTrabajo.excepcion";

export interface estadoTrabajoProps {
    estado: string;
}

export class EstadoTrabajo extends ValueObject<estadoTrabajoProps> {
    private constructor(props: estadoTrabajoProps) {
        super(props);
    }

    public valor(): string {
        return this.props.estado;
    }

    public static crear(estado: string): Resultado<EstadoTrabajo> {
        //Validaciones de valores posible
        let valores = ["en progreso", "culminado", "despedido", "retirado"];
        if (valores.indexOf(estado) == -1)
            return Resultado.falla<any>(ESTADO_TRABAJO_NO_RECONOCIDO);

        return Resultado.ok<EstadoTrabajo>(new EstadoTrabajo({ estado }));
    }
}
