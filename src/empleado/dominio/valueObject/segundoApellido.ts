import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import { SEGUNDO_APELLIDO_LONGITUD_NO_VALIDA } from "../excepciones/nombreEmpleado.excepcion";

export interface segundoApellidoProps {
    segundoApellido: string;
}

export class SegundoApellido extends ValueObject<segundoApellidoProps> {
    private constructor(props: segundoApellidoProps) {
        super(props);
    }

    public valor() {
        return this.props.segundoApellido;
    }

    public static crear(segundoApellido: string): Resultado<SegundoApellido> {
        //Validaciones de longitud
        if (!(segundoApellido.length >= 3 && segundoApellido.length <= 40))
            return Resultado.falla<any>(SEGUNDO_APELLIDO_LONGITUD_NO_VALIDA);

        return Resultado.ok<SegundoApellido>(
            new SegundoApellido({ segundoApellido })
        );
    }
}
