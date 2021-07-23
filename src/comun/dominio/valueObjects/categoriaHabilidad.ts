import { Resultado } from "../resultado";
import { ValueObject } from "../valueObject";
import { CATEGORIA_HABILIDAD_LONGITUD_NO_VALIDA } from "../excepciones/categoriaHabilidad.excepcion";

export interface CategoriaProps {
    categoria: string;
}

export class categoriaHabilidad extends ValueObject<CategoriaProps> {
    private constructor(props: CategoriaProps) {
        super(props);
    }

    public valor(): string {
        return this.props.categoria;
    }

    public static crear(categoria: string): Resultado<categoriaHabilidad> {
        //Valor tamaño del categoria
        if (!(categoria.length >= 4 && categoria.length <= 64))
            return Resultado.falla<any>(CATEGORIA_HABILIDAD_LONGITUD_NO_VALIDA);

        return Resultado.ok<categoriaHabilidad>(
            new categoriaHabilidad({ categoria })
        );
    }
}
