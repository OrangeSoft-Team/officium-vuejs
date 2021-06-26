import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import { DURACION_ESTIMADA_VALOR_NO_VALIDA } from "../excepciones/duracionEstimada.excepcion";
import { DURACION_ESTIMADA_ESCALA_NO_CONOCIDA } from "../excepciones/duracionEstimada.excepcion";

export interface duracionEstimadaProps {
    duracion: number;
    escala: string;
}

export class DuracionEstimadaOferta extends ValueObject<duracionEstimadaProps> {
    private constructor(props: duracionEstimadaProps) {
        super(props);
    }

    public valor(): duracionEstimadaProps {
        return this.props;
    }

    public static crear(
        duracion: number,
        escala: string
    ): Resultado<DuracionEstimadaOferta> {
        //Validaciones de longitud
        if (duracion < 0 || duracion > 99)
            return Resultado.falla<any>(DURACION_ESTIMADA_VALOR_NO_VALIDA);

        //Validaciones de valores posible
        let valores = ["hora", "día", "semana", "mes"];
        if (valores.indexOf(escala) == -1)
            return Resultado.falla<any>(DURACION_ESTIMADA_ESCALA_NO_CONOCIDA);

        return Resultado.ok<DuracionEstimadaOferta>(
            new DuracionEstimadaOferta({ duracion, escala })
        );
    }
}
