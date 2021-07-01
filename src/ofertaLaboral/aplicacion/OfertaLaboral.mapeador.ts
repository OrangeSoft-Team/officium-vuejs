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
        if (turnoTrabajoOrError.esFallido) {
            return Resultado.falla<any>(turnoTrabajoOrError.error);
        }

        let numeroVacantesOrError = NumeroVacantesOferta.crear(
            dto.numeroVacantes
        );
        if (numeroVacantesOrError.esFallido) {
            return Resultado.falla<any>(numeroVacantesOrError.error);
        }

        //Propiedades de entidad
        let ofertaProps: OfertaLaboralProps = {
            titulo: tituloOrError.getValue(),
            cargo: cargoOrError.getValue(),
            sueldo: sueldoOrError.getValue(),
            duracionEstimada: duracionEstimadaOrError.getValue(),
            turnoTrabajo: turnoTrabajoOrError.getValue(),
            numeroVacantes: numeroVacantesOrError.getValue(),
        };

        //OPCIONALES
        let fechaPublicacionOrError: Resultado<Fecha>;
        if (dto.hasOwnProperty("fechaPublicacion")) {
            fechaPublicacionOrError = Fecha.crear(<string>dto.fechaPublicacion);
            if (fechaPublicacionOrError.esFallido)
                return Resultado.falla<any>(fechaPublicacionOrError.error);
            ofertaProps.fechaPublicacion = fechaPublicacionOrError.getValue();
        }

        let descripcionOrError: Resultado<DescripcionOferta>;
        if (dto.hasOwnProperty("descripcion")) {
            descripcionOrError = DescripcionOferta.crear(
                <string>dto.descripcion
            );
            if (descripcionOrError.esFallido)
                return Resultado.falla<any>(descripcionOrError.error);
            ofertaProps.descripcion = descripcionOrError.getValue();
        }

        let estadoOfertaOrError: Resultado<EstadoOferta>;
        if (dto.hasOwnProperty("estado")) {
            estadoOfertaOrError = EstadoOferta.crear(<string>dto.estado);
            if (estadoOfertaOrError.esFallido)
                return Resultado.falla<any>(estadoOfertaOrError.error);
            ofertaProps.estado = estadoOfertaOrError.getValue();
        }

        let idOrError: Resultado<Identificador>;
        if (dto.hasOwnProperty("idOfertaLaboral")) {
            idOrError = Identificador.crear(<string>dto.idOfertaLaboral);

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
        if (
            entidad.props.hasOwnProperty("fechaPublicacion") &&
            entidad.props.fechaPublicacion != undefined
        )
            propsDTO.fechaPublicacion = entidad.props.fechaPublicacion.valor();

        if (
            entidad.props.hasOwnProperty("idOfertaLaboral") &&
            entidad.props.idOfertaLaboral != undefined
        )
            propsDTO.idOfertaLaboral = <string>(
                entidad.props.idOfertaLaboral.valor()
            );

        if (
            entidad.props.hasOwnProperty("descripcion") &&
            entidad.props.descripcion != undefined
        )
            propsDTO.descripcion = <string>entidad.props.descripcion.valor();

        if (
            entidad.props.hasOwnProperty("estado") &&
            entidad.props.estado != undefined
        )
            propsDTO.estado = <string>entidad.props.estado.valor();

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

    public static aDTOConjunto(
        entidades: OfertaLaboral[]
    ): Resultado<OfertaLaboralEmpresaDTO[]> {
        //Array auxiliar
        let arrayOfertasLaboralesDTO: OfertaLaboralEmpresaDTO[] = [];

        for (let oferta of entidades) {
            let ofertaDTOOrError = OfertasLaboralesMapeador.aDTO(oferta);

            if (ofertaDTOOrError.esFallido)
                return Resultado.falla<any>(ofertaDTOOrError.error);

            arrayOfertasLaboralesDTO.push(ofertaDTOOrError.getValue());
        }

        return Resultado.ok<OfertaLaboralEmpresaDTO[]>(
            arrayOfertasLaboralesDTO
        );
    }
}
