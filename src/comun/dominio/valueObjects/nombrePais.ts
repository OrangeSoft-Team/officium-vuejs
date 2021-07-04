import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import { NOMBRE_PAIS_LONGITUD_NO_VALIDA } from "../excepciones/nombrePais.excepcion";

export interface NombreProps {
    nombre: string;
}

export class NombrePais extends ValueObject<NombreProps> {
    private constructor(props: NombreProps) {
        super(props);
    }

    public valor(): string {
        return this.props.nombre;
    }

    public static crear(nombre: string): Resultado<NombrePais> {
        //Valor tamaño del nombre
        if (!(nombre.length >= 2 && nombre.length <= 128))
            return Resultado.falla<any>(NOMBRE_PAIS_LONGITUD_NO_VALIDA);

        return Resultado.ok<NombrePais>(new NombrePais({ nombre }));
    }
}
