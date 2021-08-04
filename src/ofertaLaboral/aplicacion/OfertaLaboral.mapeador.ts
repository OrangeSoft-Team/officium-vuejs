import { HabilidadMapeador } from "../../comun/aplicacion/mapeador/Habilidad.mapeador";
import { Habilidad } from "../../comun/dominio/entidades/habilidad";
import { Resultado } from "../../comun/dominio/resultado";
import { Fecha } from "../../comun/dominio/valueObjects/fecha";
import { Identificador } from "../../comun/dominio/valueObjects/Identificador";
import { requisitosEspeciales } from "../../comun/dominio/valueObjects/requisitosEspeciales";
import { OfertaLaboral, OfertaLaboralProps } from "../dominio/OfertaLaboral";
import { CargoOferta } from "../dominio/valueObjects/cargoOferta";
import { DescripcionOferta } from "../dominio/valueObjects/descripcionOferta";
import { DuracionEstimadaOferta } from "../dominio/valueObjects/duracionEstimadaOferta";
import { EstadoOferta } from "../dominio/valueObjects/estadoOferta";
import { NumeroVacantesOferta } from "../dominio/valueObjects/numeroVacantesOferta";
import { SueldoOferta } from "../dominio/valueObjects/sueldoOferta";
import { TituloOferta } from "../dominio/valueObjects/tituloOferta";
import { TurnoTrabajo } from "../dominio/valueObjects/turnoTrabajoOferta";
import {
    OfertaLaboralEmpresaDTO,
    OfertaLaboralTrabajoDTO,
} from "./dto/OfertaLaboralEmpresaDTO";

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
        let idOrError: Resultado<Identificador>;
        if (dto.hasOwnProperty("uuid")) {
            idOrError = Identificador.crear(<string>dto.uuid);

            if (idOrError.esFallido)
                return Resultado.falla<any>(idOrError.error);
            ofertaProps.idOfertaLaboral = idOrError.getValue();
        }

        let fechaPublicacionOrError: Resultado<Fecha>;
        if (dto.hasOwnProperty("fechaPublicacion")) {
            fechaPublicacionOrError = Fecha.crear(<string>dto.fechaPublicacion);
            if (fechaPublicacionOrError.esFallido)
                return Resultado.falla<any>(fechaPublicacionOrError.error);
            ofertaProps.fechaPublicacion = fechaPublicacionOrError.getValue();
        }

        let fechaModificacionOrError: Resultado<Fecha>;
        if (dto.hasOwnProperty("fechaModificacion")) {
            fechaModificacionOrError = Fecha.crear(
                <string>dto.fechaModificacion
            );
            if (fechaModificacionOrError.esFallido)
                return Resultado.falla<any>(fechaModificacionOrError.error);
            ofertaProps.fechaUltimaModificacion =
                fechaModificacionOrError.getValue();
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

        let reqEspecialesOrError: Resultado<requisitosEspeciales>;
        if (
            dto.hasOwnProperty("requisitosEspeciales") &&
            dto.requisitosEspeciales != undefined &&
            dto.requisitosEspeciales != ""
        ) {
            reqEspecialesOrError = requisitosEspeciales.crear(
                dto.requisitosEspeciales
            );
            if (reqEspecialesOrError.esFallido)
                return Resultado.falla<any>(reqEspecialesOrError.error);

            //Agregamos al ser valido
            ofertaProps.requisitosEspeciales = reqEspecialesOrError.getValue();
        }

        let habilidadesOrError: Resultado<Habilidad[]>;
        if (dto.hasOwnProperty("habilidades") && dto.habilidades != undefined) {
            habilidadesOrError = HabilidadMapeador.aDominioConjunto(
                dto.habilidades
            );
            if (habilidadesOrError.esFallido)
                return Resultado.falla<any>(habilidadesOrError.error);

            ofertaProps.habilidades = habilidadesOrError.getValue();
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
            sueldo: <number>entidad.props.sueldo!!.valor(),
            duracionEstimadaEscala: <string>(
                entidad.props.duracionEstimada!.valor().escala
            ),
            duracionEstimadaValor: <number>(
                entidad.props.duracionEstimada!.valor().duracion
            ),
            turnoTrabajo: <string>entidad.props.turnoTrabajo!.valor(),
            numeroVacantes: <number>entidad.props.numeroVacantes!.valor(),
        };

        //Opcionales
        if (
            entidad.props.hasOwnProperty("idOfertaLaboral") &&
            entidad.props.idOfertaLaboral != undefined
        )
            propsDTO.uuid = <string>entidad.props.idOfertaLaboral.valor();
        if (
            entidad.props.hasOwnProperty("fechaPublicacion") &&
            entidad.props.fechaPublicacion != undefined
        )
            propsDTO.fechaPublicacion = entidad.props.fechaPublicacion.valor();

        if (
            entidad.props.hasOwnProperty("fechaUltimaModificacion") &&
            entidad.props.fechaUltimaModificacion != undefined
        )
            propsDTO.fechaModificacion =
                entidad.props.fechaUltimaModificacion.valor();

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

        if (
            entidad.props.hasOwnProperty("requisitosEspeciales") &&
            entidad.props.requisitosEspeciales != undefined &&
            entidad.props.requisitosEspeciales.valor() != ""
        ) {
            propsDTO.requisitosEspeciales =
                entidad.props.requisitosEspeciales.valor();
        }

        if (
            entidad.props.hasOwnProperty("habilidades") &&
            entidad.props.habilidades
        ) {
            //Transformacion de habilidad
            const habilidadesOrError = HabilidadMapeador.aDTOConjunto(
                entidad.props.habilidades
            );
            if (habilidadesOrError.esFallido)
                return Resultado.falla<any>(habilidadesOrError.error);

            propsDTO.habilidades = habilidadesOrError.getValue();
        }

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

    public static aDominioParaTrabajo(
        dto: OfertaLaboralTrabajoDTO
    ): Resultado<OfertaLaboral> {
        //Value Objects principales
        let tituloOrError = TituloOferta.crear(dto.titulo);
        if (tituloOrError.esFallido)
            return Resultado.falla<any>(tituloOrError.error);

        let cargoOrError = CargoOferta.crear(dto.cargo);
        if (cargoOrError.esFallido)
            return Resultado.falla<any>(cargoOrError.error);

        //Propiedades de entidad
        let ofertaProps: OfertaLaboralProps = {
            titulo: tituloOrError.getValue(),
            cargo: cargoOrError.getValue(),
            //duracionEstimada: duracionEstimadaOrError.getValue(),
            //turnoTrabajo: turnoTrabajoOrError.getValue(),
        };

        //Opcionales
        let duracionEstimadaOrError: Resultado<DuracionEstimadaOferta>;
        if (
            dto.hasOwnProperty("duracionEstimadaValor") &&
            dto.hasOwnProperty("duracionEstimadaEscala")
        ) {
            duracionEstimadaOrError = DuracionEstimadaOferta.crear(
                <number>dto.duracionEstimadaValor,
                <string>dto.duracionEstimadaEscala
            );
            if (duracionEstimadaOrError.esFallido)
                return Resultado.falla<any>(duracionEstimadaOrError.error);
            ofertaProps.duracionEstimada = duracionEstimadaOrError.getValue();
        }

        let turnoTrabajoOrError: Resultado<TurnoTrabajo>;
        if (dto.hasOwnProperty("turnoTrabajo")) {
            turnoTrabajoOrError = TurnoTrabajo.crear(<string>dto.turnoTrabajo);
            if (turnoTrabajoOrError.esFallido)
                return Resultado.falla<any>(turnoTrabajoOrError.error);
            ofertaProps.turnoTrabajo = turnoTrabajoOrError.getValue();
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

        return Resultado.ok<OfertaLaboral>(
            OfertaLaboral.crear(ofertaProps).getValue()
        );
    }

    public static aDTOParaTrabajo(
        entidad: OfertaLaboral
    ): Resultado<OfertaLaboralTrabajoDTO> {
        //Extraemos de entidad
        let propsDTO: OfertaLaboralTrabajoDTO = {
            titulo: entidad.props.titulo.valor(),
            cargo: entidad.props.cargo.valor(),
        };

        //opcionales
        if (
            entidad.props.hasOwnProperty("duracionEstimada") &&
            entidad.props.duracionEstimada != undefined
        ) {
            propsDTO.duracionEstimadaEscala =
                entidad.props.duracionEstimada.valor().escala;
            propsDTO.duracionEstimadaValor =
                entidad.props.duracionEstimada.valor().duracion;
        }

        if (
            entidad.props.hasOwnProperty("turnoTrabajo") &&
            entidad.props.turnoTrabajo != undefined
        )
            propsDTO.turnoTrabajo = entidad.props.turnoTrabajo.valor();

        if (
            entidad.props.hasOwnProperty("descripcion") &&
            entidad.props.descripcion != undefined
        )
            propsDTO.descripcion = entidad.props.descripcion.valor();

        return Resultado.ok<OfertaLaboralTrabajoDTO>(propsDTO);
    }
}
