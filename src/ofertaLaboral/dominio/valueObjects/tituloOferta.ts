import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import { TITULO_OFERTA_LONGITUD_NO_VALIDA } from "../excepciones/tituloOferta.excepcion";

export interface tituloOfertaProps {
    titulo: string;
}

export class TituloOferta extends ValueObject<tituloOfertaProps> {
    private constructor(props: tituloOfertaProps) {
        super(props);
    }

    public valor(): string {
        return this.props.titulo;
    }

    public static crear(titulo: string): Resultado<TituloOferta> {
        //Validaciones de longitud
        if (!(titulo.length >= 4 && titulo.length <= 80))
            return Resultado.falla<any>(TITULO_OFERTA_LONGITUD_NO_VALIDA);

        return Resultado.ok<TituloOferta>(new TituloOferta({ titulo }));
    }
}
