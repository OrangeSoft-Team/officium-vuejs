import { Resultado } from "@/comun/dominio/resultado";
import { ValueObject } from "@/comun/dominio/valueObject";
import { DURACION_ESTIMADA_VALOR_NO_VALIDA } from "../excepciones/duracionEstimada.excepcion";

export interface duracionEstimadaValorProps {
    valor: number;
}

export class DuracionEstimadaValorOferta extends ValueObject<duracionEstimadaValorProps> {
    private constructor(props: duracionEstimadaValorProps) {
        super(props);
    }

    public static crear(valor: number): Resultado<DuracionEstimadaValorOferta> {
        //Validaciones de longitud
        if (valor < 0 || valor > 99)
            return Resultado.falla<any>(DURACION_ESTIMADA_VALOR_NO_VALIDA);

        return Resultado.ok<DuracionEstimadaValorOferta>(
            new DuracionEstimadaValorOferta({ valor })
        );
    }
}
