import { Resultado } from "../../comun/dominio/resultado";
import { Fecha } from "../../comun/dominio/valueObjects/fecha";
import { Identificador } from "../../comun/dominio/valueObjects/Identificador";
import { OfertaLaboral, OfertaLaboralProps } from "../dominio/OfertaLaboral";
import { CargoOferta } from "../dominio/valueObjects/cargoOferta";
import { DescripcionOferta } from "../dominio/valueObjects/descripcionOferta";
import { DuracionEstimadaOferta } from "../dominio/valueObjects/duracionEstimadaOferta";
import { EstadoOferta } from "../dominio/valueObjects/estadoOferta";
import { NumeroVacantesOferta } from "../dominio/valueObjects/numeroVacantesOferta";
import { SueldoOferta } from "../dominio/valueObjects/sueldoOferta";
import { TituloOferta } from "../dominio/valueObjects/tituloOferta";
import { TurnoTrabajo } from "../dominio/valueObjects/turnoTrabajoOferta";
import { OfertaLaboralEmpresaDTO } from "./dto/OfertaLaboralEmpresaDTO";

export class OfertasLaboralesMapeador {
    public static aDominio(
        dto: OfertaLaboralEmpresaDTO
    ): Resultado<OfertaLaboral> {
        //Value Objects principales
        let tituloOrError = TituloOferta.crear(dto.titulo);
        if (tituloOrError.esFallido)
            return Resultado.falla<any>(tituloOrError.error);

        let fechaPublicacionOrError = Fecha.crear(dto.fechaPublicacion);
        if (fechaPublicacionOrError.esFallido)
            return Resultado.falla<any>(fechaPublicacionOrError.error);

        let cargoOrError = CargoOferta.crear(dto.cargo);
        if (cargoOrError.esFallido)
            return Resultado.falla<any>(cargoOrError.error);

        let sueldoOrError = SueldoOferta.crear(dto.sueldo);
        if (sueldoOrError.esFallido)
            return Resultado.falla<any>(sueldoOrError.error);

        let duracionEstimadaOrError = DuracionEstimadaOferta.crear(
            dto.duracionEstimadaValor,
            dto.duracionEstimadaEscala
        );
        if (duracionEstimadaOrError.esFallido)
            return Resultado.falla<any>(duracionEstimadaOrError.error);

        let turnoTrabajoOrError = TurnoTrabajo.crear(dto.turnoTrabajo);
        if (turnoTrabajoOrError.esFallido)
            return Resultado.falla<any>(turnoTrabajoOrError.esFallido);

        let numeroVacantesOrError = NumeroVacantesOferta.crear(
            dto.numeroVacantes
        );
        if (numeroVacantesOrError.esFallido)
            return Resultado.falla<any>(numeroVacantesOrError.error);

        //Propiedades de entidad
        let ofertaProps: OfertaLaboralProps = {
            titulo: tituloOrError.getValue(),
            fechaPublicacion: fechaPublicacionOrError.getValue(),
            cargo: cargoOrError.getValue(),
            sueldo: sueldoOrError.getValue(),
            duracionEstimada: duracionEstimadaOrError.getValue(),
            turnoTrabajo: turnoTrabajoOrError.getValue(),
            numeroVacantes: numeroVacantesOrError.getValue(),
        };

        //OPCIONALES
        let descripcionOrError: Resultado<DescripcionOferta>;
        if (dto.descripcion) {
            descripcionOrError = DescripcionOferta.crear(dto.descripcion);
            if (descripcionOrError.esFallido)
                return Resultado.falla<any>(descripcionOrError.error);
            ofertaProps.descripcion = descripcionOrError.getValue();
        }

        let estadoOfertaOrError: Resultado<EstadoOferta>;
        if (dto.estado) {
            estadoOfertaOrError = EstadoOferta.crear(dto.estado);
            if (estadoOfertaOrError.esFallido)
                return Resultado.falla<any>(estadoOfertaOrError.error);
            ofertaProps.estado = estadoOfertaOrError.getValue();
        }

        let idOrError: Resultado<Identificador>;
        if (dto.idOfertaLaboral) {
            idOrError = Identificador.crear(dto.idOfertaLaboral);

            if (idOrError.esFallido)
                return Resultado.falla<any>(idOrError.error);
            ofertaProps.idOfertaLaboral = idOrError.getValue();
        }

        return Resultado.ok<OfertaLaboral>(
            OfertaLaboral.crear(ofertaProps).getValue()
        );
    }

    public static aDTO(
        entidad: OfertaLaboral
    ): Resultado<OfertaLaboralEmpresaDTO> {
        //Extraemos de entidad
        let propsDTO: OfertaLaboralEmpresaDTO = {
            titulo: entidad.props.titulo.valor(),
            fechaPublicacion: entidad.props.fechaPublicacion.valor(),
            cargo: entidad.props.cargo.valor(),
            sueldo: entidad.props.sueldo.valor(),
            duracionEstimadaEscala:
                entidad.props.duracionEstimada.valor().escala,
            duracionEstimadaValor:
                entidad.props.duracionEstimada.valor().duracion,
            turnoTrabajo: entidad.props.turnoTrabajo.valor(),
            numeroVacantes: entidad.props.numeroVacantes.valor(),
        };

        //Opcionales
        if (entidad.props.idOfertaLaboral)
            propsDTO.idOfertaLaboral = entidad.props.idOfertaLaboral.valor();

        if (entidad.props.descripcion)
            propsDTO.descripcion = entidad.props.descripcion.valor();

        if (entidad.props.estado)
            propsDTO.estado = entidad.props.estado.valor();

        return Resultado.ok<OfertaLaboralEmpresaDTO>(propsDTO);
    }

    public static aDominioConjunto(
        dtos: OfertaLaboralEmpresaDTO[]
    ): Resultado<OfertaLaboral[]> {
        //Convertimos a dominio array
        let arrayOfertasLaborales: OfertaLaboral[] = [];

        for (let oferta of dtos) {
            let ofertaEntidadOrError =
                OfertasLaboralesMapeador.aDominio(oferta);
            //En caso de fallo
            if (ofertaEntidadOrError.esFallido) {
                return Resultado.falla<any>(ofertaEntidadOrError.error);
            }

            //En caso de ser valido
            arrayOfertasLaborales.push(ofertaEntidadOrError.getValue());
        }

        return Resultado.ok<OfertaLaboral[]>(arrayOfertasLaborales);
    }
}
