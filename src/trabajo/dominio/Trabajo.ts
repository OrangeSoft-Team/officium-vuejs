import { Entidad } from "../../comun/dominio/entidad";
import { Resultado } from "../../comun/dominio/resultado";
import { Fecha } from "../../comun/dominio/valueObjects/fecha";
import { Identificador } from "../../comun/dominio/valueObjects/Identificador";
import { Empleado } from "../../empleado/dominio/Empleado";
import { OfertaLaboral } from "../../ofertaLaboral/dominio/OfertaLaboral";
import { EstadoTrabajo } from "./valueObjects/estadoTrabajo";

export interface TrabajoProps {
    identificadorTrabajo?: Identificador;
    fechaInicio: Fecha;
    estado: EstadoTrabajo;
    ofertaLaboral: OfertaLaboral;
    empleado: Empleado;
    fechaCulminacion?: Fecha;
}

export class Trabajo extends Entidad<TrabajoProps> {
    public static crear(props: TrabajoProps): Resultado<Trabajo> {
        //Creamos la entidad
        return Resultado.ok<Trabajo>(new Trabajo(props));
    }
}
