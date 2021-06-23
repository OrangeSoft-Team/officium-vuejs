import { Entidad } from "@/comun/dominio/entidad";
import { Resultado } from "@/comun/dominio/resultado";
import { Fecha } from "@/comun/dominio/valueObjects/fecha";
import { Identificador } from "@/comun/dominio/valueObjects/Identificador";
import { CargoOferta } from "./valueObjects/cargoOferta";
import { DescripcionOferta } from "./valueObjects/descripcionOferta";
import { DuracionEstimadaOferta } from "./valueObjects/duracionEstimadaOferta";
import { EstadoOferta } from "./valueObjects/estadoOferta";
import { NumeroVacantesOferta } from "./valueObjects/numeroVacantesOferta";
import { SueldoOferta } from "./valueObjects/sueldoOferta";
import { TituloOferta } from "./valueObjects/tituloOferta";
import { TurnoTrabajo } from "./valueObjects/turnoTrabajoOferta";

interface OfertaLaboralProps {
    idOfertaLaboral?: Identificador;
    titulo: TituloOferta;
    fechaPublicacion: Fecha;
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
        if (props.idOfertaLaboral) {
            let idOrError = Identificador.crear(props.idOfertaLaboral.valor());

            if (idOrError.esFallido)
                return Resultado.falla<any>(idOrError.error);
        }

        let tituloOrError = TituloOferta.crear(props.titulo.valor());
        if (tituloOrError.esFallido)
            return Resultado.falla<any>(tituloOrError.error);

        let fechaPublicacionOrError = Fecha.crear(
            props.fechaPublicacion.valor()
        );
        if (fechaPublicacionOrError.esFallido)
            return Resultado.falla<any>(fechaPublicacionOrError.error);

        let cargoOrError = CargoOferta.crear(props.cargo.valor());
        if (cargoOrError.esFallido)
            return Resultado.falla<any>(cargoOrError.error);

        let sueldoOrError = SueldoOferta.crear(props.cargo.valor());
        if (sueldoOrError.esFallido)
            return Resultado.falla<any>(sueldoOrError.error);

        let duracionEstimadaOrError = DuracionEstimadaOferta.crear(
            props.duracionEstimada.valor().duracion,
            props.duracionEstimada.valor().escala
        );
        if (duracionEstimadaOrError.esFallido)
            return Resultado.falla<any>(duracionEstimadaOrError.error);

        let turnoTrabajoOrError = TurnoTrabajo.crear(
            props.turnoTrabajo.valor()
        );
        if (turnoTrabajoOrError.esFallido)
            return Resultado.falla<any>(turnoTrabajoOrError.esFallido);

        let numeroVacantesOrError = NumeroVacantesOferta.crear(
            props.numeroVacantes.valor()
        );
        if (numeroVacantesOrError.esFallido)
            return Resultado.falla<any>(numeroVacantesOrError.error);

        if (props.descripcion) {
            let descripcionOrError = DescripcionOferta.crear(
                props.descripcion.valor()
            );
            if (descripcionOrError.esFallido)
                return Resultado.falla<any>(descripcionOrError.error);
        }

        if (props.estado) {
            let estadoOfertaOrError = EstadoOferta.crear(props.estado.valor());
            if (estadoOfertaOrError.esFallido)
                return Resultado.falla<any>(estadoOfertaOrError.error);
        }

        return Resultado.ok<OfertaLaboral>(new OfertaLaboral(props));
    }
}
