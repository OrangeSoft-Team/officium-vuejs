import { Resultado } from "@/comun/dominio/resultado";
import { ValueObject } from "@/comun/dominio/valueObject";
import { ESTADO_OFERTA_NO_RECONOCIDO } from "../excepciones/estadoOferta.excepcion";

export interface estadoOfertaProps {
    estado: string;
}

export class EstadoOferta extends ValueObject<estadoOfertaProps> {
    private constructor(props: estadoOfertaProps) {
        super(props);
    }

    public static crear(estado: string): Resultado<EstadoOferta> {
        //Validaciones de valores posible
        let valores = ["publicado", "cancelado"];
        if (valores.indexOf(estado) == -1)
            return Resultado.falla<any>(ESTADO_OFERTA_NO_RECONOCIDO);

        return Resultado.ok<EstadoOferta>(new EstadoOferta({ estado }));
    }
}
