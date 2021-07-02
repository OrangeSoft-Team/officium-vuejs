import { Resultado } from "../resultado";
import { ValueObject } from "../valueObject";
import {
    NOMBRE_LONGITUD_NO_VALIDA,
} from "../excepciones/nombrePais.excepcion";

export interface NombreProps {
    nombre: string;
}

export class NombreMunicipio extends ValueObject<NombreProps> {
    private constructor(props: NombreProps) {
        super(props);
    }
    
    public valor(): string {
        return this.props.nombre;
    }

    public static crear(nombre: string): Resultado<NombreMunicipio> {
        //Valor tamaño del nombre
        if (nombre.length >= 2 || nombre.length <= 128)
            return Resultado.falla<any>(NOMBRE_LONGITUD_NO_VALIDA);

        return Resultado.ok<NombreMunicipio>(new NombreMunicipio({ nombre }));
    }
}
