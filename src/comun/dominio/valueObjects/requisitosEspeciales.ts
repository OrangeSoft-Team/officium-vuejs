import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import { REQUISITOS_ESPECIALES_LONGITUD_NO_VALIDA } from "../excepciones/requisitosEspeciales.excepcion";

export interface requisitosEspecialesProps {
    nombre: string;
}

export class requisitosEspeciales extends ValueObject<requisitosEspecialesProps> {
    private constructor(props: requisitosEspecialesProps) {
        super(props);
    }

    public valor(): string {
        return this.props.nombre;
    }

    public static crear(nombre: string): Resultado<requisitosEspeciales> {
        //Validaciones de longitud
        if (!(nombre.length >= 4 && nombre.length <= 128))
            return Resultado.falla<any>(REQUISITOS_ESPECIALES_LONGITUD_NO_VALIDA);

        return Resultado.ok<requisitosEspeciales>(new requisitosEspeciales({ nombre }));
    }
}
