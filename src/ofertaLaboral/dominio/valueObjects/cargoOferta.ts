import { Resultado } from "../../../comun/dominio/resultado";
import { ValueObject } from "../../../comun/dominio/valueObject";
import { CARGO_OFERTA_LONGITUD_NO_VALIDA } from "../excepciones/cargoOferta.excepcion";

export interface cargoOfertaProps {
    cargo: string;
}

export class CargoOferta extends ValueObject<cargoOfertaProps> {
    private constructor(props: cargoOfertaProps) {
        super(props);
    }

    public valor(): string {
        return this.props.cargo;
    }

    public static crear(cargo: string): Resultado<CargoOferta> {
        //Validaciones de longitud
        if (!(cargo.length >= 4 && cargo.length <= 40))
            return Resultado.falla<any>(CARGO_OFERTA_LONGITUD_NO_VALIDA);

        return Resultado.ok<CargoOferta>(new CargoOferta({ cargo }));
    }
}
