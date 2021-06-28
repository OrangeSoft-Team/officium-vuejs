import { Entidad } from "../../comun/dominio/entidad";
import { Resultado } from "../../comun/dominio/resultado";
import { Fecha } from "../../comun/dominio/valueObjects/fecha";
import { Identificador } from "../../comun/dominio/valueObjects/Identificador";
import { CargoOferta } from "./valueObjects/cargoOferta";
import { DescripcionOferta } from "./valueObjects/descripcionOferta";
import { DuracionEstimadaOferta } from "./valueObjects/duracionEstimadaOferta";
import { EstadoOferta } from "./valueObjects/estadoOferta";
import { NumeroVacantesOferta } from "./valueObjects/numeroVacantesOferta";
import { SueldoOferta } from "./valueObjects/sueldoOferta";
import { TituloOferta } from "./valueObjects/tituloOferta";
import { TurnoTrabajo } from "./valueObjects/turnoTrabajoOferta";

export interface OfertaLaboralProps {
    idOfertaLaboral?: Identificador;
    titulo: TituloOferta;
    fechaPublicacion?: Fecha;
    cargo: CargoOferta;
    sueldo: SueldoOferta;
    duracionEstimada: DuracionEstimadaOferta;
    turnoTrabajo: TurnoTrabajo;
    numeroVacantes: NumeroVacantesOferta;
    descripcion?: DescripcionOferta;
    estado?: EstadoOferta;
}

export class OfertaLaboral extends Entidad<OfertaLaboralProps> {
    public static crear(props: OfertaLaboralProps): Resultado<OfertaLaboral> {
        //Creamos la entidad
        return Resultado.ok<OfertaLaboral>(new OfertaLaboral(props));
    }
}
