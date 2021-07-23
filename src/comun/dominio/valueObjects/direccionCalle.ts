import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import { DIRECCION_LONGITUD_NO_VALIDA } from "../excepciones/direccionCalle.excepcion";

export interface direccionCalleProps {
    nombre: string;
}

export class DireccionCalle extends ValueObject<direccionCalleProps> {
    private constructor(props: direccionCalleProps) {
        super(props);
    }

    public valor(): string {
        return this.props.nombre;
    }

    public static crear(nombre: string): Resultado<DireccionCalle> {
        //Validaciones de longitud
        if (!(nombre.length >= 2 && nombre.length <= 128))
            return Resultado.falla<any>(DIRECCION_LONGITUD_NO_VALIDA);

        return Resultado.ok<DireccionCalle>(new DireccionCalle({ nombre }));
    }
}
