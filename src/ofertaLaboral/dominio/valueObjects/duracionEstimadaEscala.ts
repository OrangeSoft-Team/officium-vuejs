import { Resultado } from "@/comun/dominio/resultado";
import { ValueObject } from "@/comun/dominio/valueObject";
import { DURACION_ESTIMADA_ESCALA_NO_CONOCIDA } from "../excepciones/duracionEstimada.excepcion";

export interface duracionEstimadaEscalaProps {
    escala: string;
}

export class DuracionEstimadaEscala extends ValueObject<duracionEstimadaEscalaProps> {
    private constructor(props: duracionEstimadaEscalaProps) {
        super(props);
    }

    public static crear(escala: string): Resultado<DuracionEstimadaEscala> {
        //Validaciones de valores posible
        let valores = ["hora", "día", "semana", "mes"];
        if (valores.indexOf(escala) == -1)
            return Resultado.falla<any>(DURACION_ESTIMADA_ESCALA_NO_CONOCIDA);

        return Resultado.ok<DuracionEstimadaEscala>(
            new DuracionEstimadaEscala({ escala })
        );
    }
}
