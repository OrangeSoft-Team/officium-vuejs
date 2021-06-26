import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import {
    SUELDO_OFERTA_LABORAL_NEGATIVO,
    SUELDO_OFERTA_LABORAL_SUPERA_LIMITE,
} from "../excepciones/sueldoOferta.excepcion";

export interface sueldoOfertaProps {
    sueldo: number;
}

export class SueldoOferta extends ValueObject<sueldoOfertaProps> {
    private constructor(props: sueldoOfertaProps) {
        super(props);
    }

    public valor(): number {
        return this.props.sueldo;
    }

    public static crear(sueldo: number): Resultado<SueldoOferta> {
        //Validacion positivo
        if (sueldo < 0)
            return Resultado.falla<any>(SUELDO_OFERTA_LABORAL_NEGATIVO);

        //Validar limite superior
        if (sueldo > 1000000)
            return Resultado.falla<any>(SUELDO_OFERTA_LABORAL_SUPERA_LIMITE);

        //Formateamos a 2 decimales
        sueldo = Number(sueldo.toFixed(2));

        return Resultado.ok<SueldoOferta>(new SueldoOferta({ sueldo }));
    }
}
