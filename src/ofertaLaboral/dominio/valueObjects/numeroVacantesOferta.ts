import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import { NUMERO_VACANTES_NO_VALIDA } from "../excepciones/numeroVacantesOferta.excepcion";

export interface numeroVacantesOfertaProps {
    vacantes: number;
}

export class NumeroVacantesOferta extends ValueObject<numeroVacantesOfertaProps> {
    private constructor(props: numeroVacantesOfertaProps) {
        super(props);
    }

    public valor(): number {
        return this.props.vacantes;
    }

    public static crear(vacantes: number): Resultado<NumeroVacantesOferta> {
        //Validaciones de longitud
        if (vacantes < 0 || vacantes > 99)
            return Resultado.falla<any>(NUMERO_VACANTES_NO_VALIDA);

        return Resultado.ok<NumeroVacantesOferta>(
            new NumeroVacantesOferta({ vacantes })
        );
    }
}
