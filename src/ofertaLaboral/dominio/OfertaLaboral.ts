import { Entidad } from "../../comun/dominio/entidad";
import { Direccion } from "../../comun/dominio/entidades/Direccion";
import { Habilidad } from "../../comun/dominio/entidades/habilidad";
import { Resultado } from "../../comun/dominio/resultado";
import { Fecha } from "../../comun/dominio/valueObjects/fecha";
import { Identificador } from "../../comun/dominio/valueObjects/Identificador";
import { requisitosEspeciales } from "../../comun/dominio/valueObjects/requisitosEspeciales";
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
    fechaUltimaModificacion?: Fecha;
    cargo: CargoOferta;
    sueldo?: SueldoOferta;
    duracionEstimada?: DuracionEstimadaOferta;
    turnoTrabajo?: TurnoTrabajo;
    numeroVacantes?: NumeroVacantesOferta;
    descripcion?: DescripcionOferta;
    estado?: EstadoOferta;
    requisitosEspeciales?: requisitosEspeciales;
    direccion?: Direccion;
    habilidades?: Habilidad[];
}

export class OfertaLaboral extends Entidad<OfertaLaboralProps> {
    public static crear(props: OfertaLaboralProps): Resultado<OfertaLaboral> {
        //Creamos la entidad
        return Resultado.ok<OfertaLaboral>(new OfertaLaboral(props));
    }
}
