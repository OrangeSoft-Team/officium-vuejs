import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import {
    FORMATO_CORREO_NO_VALIDA,
    VALOR_CORREO_NO_VALIDA,
} from "../excepciones/correoElectronico.excepcion";

export interface correoProps {
    correo: string;
}

export class Correo extends ValueObject<correoProps> {
    private constructor(props: correoProps) {
        super(props);
    }
    
    public valor(): string {
        return this.props.correo;
    }

    public static crear(correo: string): Resultado<Correo> {
        //Validamos formato correo@ejemplo.com
         if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(correo))
            return Resultado.falla<any>(FORMATO_CORREO_NO_VALIDA);

        //Valor tamaño del correo
        if (correo.length < 3 || correo.length > 320)
            return Resultado.falla<any>(VALOR_CORREO_NO_VALIDA);

        return Resultado.ok<Correo>(new Correo({ correo }));
    }
}
