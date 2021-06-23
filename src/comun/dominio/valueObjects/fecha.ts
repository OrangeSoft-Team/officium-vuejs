import { Resultado } from "@/comun/dominio/resultado";
import { ValueObject } from "@/comun/dominio/valueObject";
import {
    FORMATO_FECHA_NO_VALIDA,
    VALOR_FECHA_NO_VALIDA,
} from "../excepciones/fecha.excepcion";

export interface fechaProps {
    fecha: string;
}

export class Fecha extends ValueObject<fechaProps> {
    private constructor(props: fechaProps) {
        super(props);
    }

    public static crear(fecha: string): Resultado<Fecha> {
        //Validamos formato dd/mm/yyyy
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(fecha))
            return Resultado.falla<any>(FORMATO_FECHA_NO_VALIDA);

        let fechaPartes = fecha.split("/");
        let fechaDia = Number(fechaPartes[0]);
        let fechaMes = Number(fechaPartes[1]);
        let fechaAnno = Number(fechaPartes[2]);

        //Valor de mes valido 1-12
        if (fechaMes < 1 || fechaMes > 12)
            return Resultado.falla<any>(VALOR_FECHA_NO_VALIDA);

        //Valor de año valido 1000-4000
        if (fechaAnno < 1000 || fechaAnno > 4000)
            return Resultado.falla<any>(VALOR_FECHA_NO_VALIDA);

        //Valor de dias valido 1-31
        let mesLargo = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (
            fechaAnno % 400 == 0 ||
            (fechaAnno % 100 != 0 && fechaAnno % 4 == 0)
        )
            mesLargo[1] = 29; //Anno bisiesto

        if (fechaDia < 0 || fechaDia > mesLargo[fechaMes - 1])
            return Resultado.falla<any>(VALOR_FECHA_NO_VALIDA);

        return Resultado.ok<Fecha>(new Fecha({ fecha }));
    }
}
