import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import { SEGUNDO_NOMBRE_LONGITUD_NO_VALIDA } from "../excepciones/nombreEmpleado.excepcion";

export interface segundoNombreProps {
    segundoNombre: string;
}

export class SegundoNombre extends ValueObject<segundoNombreProps> {
    private constructor(props: segundoNombreProps) {
        super(props);
    }

    public valor() {
        return this.props.segundoNombre;
    }

    public static crear(segundoNombre: string): Resultado<SegundoNombre> {
        //Validaciones de longitud
        if (!(segundoNombre.length >= 3 && segundoNombre.length <= 40))
            return Resultado.falla<any>(SEGUNDO_NOMBRE_LONGITUD_NO_VALIDA);

        return Resultado.ok<SegundoNombre>(
            new SegundoNombre({ segundoNombre })
        );
    }
}
