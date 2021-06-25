import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import { TURNO_OFERTA_NO_RECONOCIDO } from "../excepciones/turnoOfeta.excepcion";

export interface turnoTrabajoOfertaProps {
    turno: string;
}

export class TurnoTrabajo extends ValueObject<turnoTrabajoOfertaProps> {
    private constructor(props: turnoTrabajoOfertaProps) {
        super(props);
    }

    public static crear(turno: string): Resultado<TurnoTrabajo> {
        //Validaciones de valores posible
        let valores = ["diurno", "nocturno", "mixto"];
        if (valores.indexOf(turno) == -1)
            return Resultado.falla<any>(TURNO_OFERTA_NO_RECONOCIDO);

        return Resultado.ok<TurnoTrabajo>(new TurnoTrabajo({ turno }));
    }
}
