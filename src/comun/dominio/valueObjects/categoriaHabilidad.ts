import { Resultado } from "../resultado";
import { ValueObject } from "../valueObject";
import { CATEGORIA_HABILIDAD_LONGITUD_NO_VALIDA } from "../excepciones/categoriaHabilidad.excepcion";

export interface NombreProps {
    nombre: string;
}

export class CategoriaHabilidad extends ValueObject<NombreProps> {
    private constructor(props: NombreProps) {
        super(props);
    }

    public valor(): string {
        return this.props.nombre;
    }

    public static crear(nombre: string): Resultado<CategoriaHabilidad> {
        //Valor tamaño del nombre
        if (!(nombre.length >= 4 && nombre.length <= 64))
            return Resultado.falla<any>(CATEGORIA_HABILIDAD_LONGITUD_NO_VALIDA);

        return Resultado.ok<CategoriaHabilidad>(new CategoriaHabilidad({ nombre }));
    }
}
