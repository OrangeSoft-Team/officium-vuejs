import { Resultado } from "../resultado";
import { ValueObject } from "../valueObject";
import { NOMBRE_HABILIDAD_LONGITUD_NO_VALIDA } from "../excepciones/nombreHabilidad.excepcion";

export interface NombreProps {
    nombre: string;
}

export class NombreHabilidad extends ValueObject<NombreProps> {
    private constructor(props: NombreProps) {
        super(props);
    }

    public valor(): string {
        return this.props.nombre;
    }

    public static crear(nombre: string): Resultado<NombreHabilidad> {
        //Valor tamaño del nombre
        if (!(nombre.length >= 4 && nombre.length <= 64))
            return Resultado.falla<any>(NOMBRE_HABILIDAD_LONGITUD_NO_VALIDA);

        return Resultado.ok<NombreHabilidad>(new NombreHabilidad({ nombre }));
    }
}
