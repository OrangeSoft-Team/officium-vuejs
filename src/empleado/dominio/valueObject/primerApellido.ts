import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import { PRIMER_APELLIDO_LONGITUD_NO_VALIDA } from "../excepciones/nombreEmpleado.excepcion";

export interface primerApellidoProps {
    primerApellido: string;
}

export class PrimerApellido extends ValueObject<primerApellidoProps> {
    private constructor(props: primerApellidoProps) {
        super(props);
    }

    public valor() {
        return this.props.primerApellido;
    }

    public static crear(primerApellido: string): Resultado<PrimerApellido> {
        //Validaciones de longitud
        if (!(primerApellido.length >= 3 && primerApellido.length <= 40))
            return Resultado.falla<any>(PRIMER_APELLIDO_LONGITUD_NO_VALIDA);

        return Resultado.ok<PrimerApellido>(
            new PrimerApellido({ primerApellido })
        );
    }
}
