import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import { CODIGO_POSTAL_LONGITUD_NO_VALIDA } from "../excepciones/codigoPostal.excepcion";

export interface codigoPostalProps {
    nombre: string;
}

export class codigoPostal extends ValueObject<codigoPostalProps> {
    private constructor(props: codigoPostalProps) {
        super(props);
    }
    
    public valor(): string {
        return this.props.nombre;
    }

    public static crear(nombre: string): Resultado<codigoPostal> {
        //Validaciones de longitud
        if (!(nombre.length >= 1 || nombre.length <= 10))
            return Resultado.falla<any>(CODIGO_POSTAL_LONGITUD_NO_VALIDA);

        return Resultado.ok<codigoPostal>(new codigoPostal({ nombre }));
    }
}
