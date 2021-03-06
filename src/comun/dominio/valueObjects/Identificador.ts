import { IDENTIFICADOR_VACIO } from "../excepciones/identificador.excepcion";
import { Resultado } from "../resultado";
import { ValueObject } from "../valueObject";

export interface IdentificadorProps {
    id: string;
}

export class Identificador extends ValueObject<IdentificadorProps> {
    private constructor(props: IdentificadorProps) {
        super(props);
    }

    public valor(): string {
        return this.props.id;
    }

    public static crear(id: string): Resultado<Identificador> {
        //No deber ser vacio ni null
        if (id == null || id == "" || id == undefined)
            return Resultado.falla<any>(IDENTIFICADOR_VACIO);

        return Resultado.ok<Identificador>(new Identificador({ id }));
    }
}
