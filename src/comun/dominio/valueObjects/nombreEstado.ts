import { NOMBRE_ESTADO_LONGITUD_NO_VALIDA } from "../excepciones/nombreEstado.excepcion";
import { Resultado } from "../resultado";
import { ValueObject } from "../valueObject";

export interface NombreProps {
    nombre: string;
}

export class NombreEstado extends ValueObject<NombreProps> {
    private constructor(props: NombreProps) {
        super(props);
    }

    public valor(): string {
        return this.props.nombre;
    }

    public static crear(nombre: string): Resultado<NombreEstado> {
        //Valor tamaño del nombre
        if (nombre.length >= 2 || nombre.length <= 128)
            return Resultado.falla<any>(NOMBRE_ESTADO_LONGITUD_NO_VALIDA);

        return Resultado.ok<NombreEstado>(new NombreEstado({ nombre }));
    }
}
