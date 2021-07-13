import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import { NOMBRE_EMPRESA_LONGITUD_NO_VALIDA } from "../excepciones/nombreEmpresa.excepcion";

export interface nombreEmpresaProps {
    nombre: string;
}

export class NombreEmpresa extends ValueObject<nombreEmpresaProps> {
    private constructor(props: nombreEmpresaProps) {
        super(props);
    }

    public valor(): string {
        return this.props.nombre;
    }

    public static crear(nombre: string): Resultado<NombreEmpresa> {
        //Validaciones de longitud
        if (!(nombre.length >= 4 && nombre.length <= 128))
            return Resultado.falla<any>(NOMBRE_EMPRESA_LONGITUD_NO_VALIDA);

        return Resultado.ok<NombreEmpresa>(new NombreEmpresa({ nombre }));
    }
}
