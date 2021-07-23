import { Entidad } from "../entidad";
import { Resultado } from "../resultado";
import { Identificador } from "../valueObjects/Identificador";
import { DireccionCalle } from "../valueObjects/direccionCalle";
import { codigoPostal } from "../valueObjects/codigoPostal";

export interface DireccionProps {
    id?: Identificador;
    calleUno: DireccionCalle;
    calleDos?: DireccionCalle;
    codigoPostal: codigoPostal;
}

export class Direccion extends Entidad<DireccionProps> {
    public static crear(props: DireccionProps): Resultado<Direccion> {
        return Resultado.ok<Direccion>(new Direccion(props));
    }
}
