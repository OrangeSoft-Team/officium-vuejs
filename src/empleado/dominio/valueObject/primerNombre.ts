import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import { PRIMER_NOMBRE_LONGITUD_NO_VALIDA } from "../excepciones/nombreEmpleado.excepcion";

export interface primerNombreProps {
    primerNombre: string;
}

export class PrimerNombre extends ValueObject<primerNombreProps> {
    private constructor(props: primerNombreProps) {
        super(props);
    }

    public valor() {
        return this.props.primerNombre;
    }

    public static crear(primerNombre: string): Resultado<PrimerNombre> {
        //Validaciones de longitud
        if (!(primerNombre.length >= 3 && primerNombre.length <= 40))
            return Resultado.falla<any>(PRIMER_NOMBRE_LONGITUD_NO_VALIDA);

        return Resultado.ok<PrimerNombre>(new PrimerNombre({ primerNombre }));
    }
}
