import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import { DESCRIPCION_OFERTA_LONGITUD_NO_VALIDA } from "../excepciones/descripcionOferta.excepcion";

export interface descripcionOfertaProps {
    descripcion: string;
}

export class DescripcionOferta extends ValueObject<descripcionOfertaProps> {
    private constructor(props: descripcionOfertaProps) {
        super(props);
    }

    public valor(): string {
        return this.props.descripcion;
    }

    public static crear(descripcion: string): Resultado<DescripcionOferta> {
        //Validaciones de longitud
        if (!(descripcion.length >= 32 || descripcion.length <= 512))
            return Resultado.falla<any>(DESCRIPCION_OFERTA_LONGITUD_NO_VALIDA);

        return Resultado.ok<DescripcionOferta>(
            new DescripcionOferta({ descripcion })
        );
    }
}
