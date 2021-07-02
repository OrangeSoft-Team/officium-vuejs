import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import {
    FORMATO_NUMERO_NO_VALIDA,
    VALOR_NUMERO_NO_VALIDA,
} from "../excepciones/numeroTelefonico.excepcion";

export interface NumeroProps {
    numeroTelef: string;
}

export class NumeroTelef extends ValueObject<NumeroProps> {
    private constructor(props: NumeroProps) {
        super(props);
    }
    
    public valor(): string {
        return this.props.numeroTelef;
    }

    public static crear(numeroTelef: string): Resultado<NumeroTelef> {
        //Validamos formato 
        if (!numeroTelef.includes('+'))
            return Resultado.falla<any>(FORMATO_NUMERO_NO_VALIDA);

        //Valor tamaño del correo
        if (numeroTelef.length < 12 || numeroTelef.length > 16)
            return Resultado.falla<any>(VALOR_NUMERO_NO_VALIDA);

        return Resultado.ok<NumeroTelef>(new NumeroTelef({ numeroTelef }));
    }
}
