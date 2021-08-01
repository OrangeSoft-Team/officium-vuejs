import { requisitosEspeciales } from "@/comun/dominio/valueObjects/requisitosEspeciales";
import { HABILIDAD_REQUERIDO } from "../../comun/dominio/excepciones/requeridoHabilidad.excepcion";
import { HabilidadDTO } from "../../comun/aplicacion/dtos/HabilidadDTO";
import { HabilidadMapeador } from "../../comun/aplicacion/mapeador/Habilidad.mapeador";
import { Habilidad } from "../../comun/dominio/entidades/habilidad";
import { Resultado } from "../../comun/dominio/resultado";
import { DESCRIPCION_OFERTA_LONGITUD_NO_VALIDA } from "../dominio/excepciones/descripcionOferta.excepcion";
import { OfertaLaboral } from "../dominio/OfertaLaboral";
import { DescripcionOferta } from "../dominio/valueObjects/descripcionOferta";

import { CrearOfertaLaboralDTO } from "./dto/CrearOfertaLaboralDTO";

export class CrearOfertaLaboralMapeador {
    //Convertimos a DTO Crear, entidad Oferta Laboral
    public static aDTO(
        entidad: OfertaLaboral
    ): Resultado<CrearOfertaLaboralDTO> {
        let descripcionOferta: DescripcionOferta;
        if (
            entidad.props.hasOwnProperty("descripcion") &&
            entidad.props.descripcion != undefined
        ) {
            descripcionOferta = entidad.props.descripcion;
        } else {
            return Resultado.falla<any>(DESCRIPCION_OFERTA_LONGITUD_NO_VALIDA);
        }

        //Transformacion de habilidad
        let habilidadesOrError: Resultado<HabilidadDTO[]>;
        if (
            entidad.props.hasOwnProperty("habilidades") &&
            entidad.props.habilidades != undefined &&
            entidad.props.habilidades.length > 0
        ) {
            habilidadesOrError = HabilidadMapeador.aDTOConjunto(
                entidad.props.habilidades
            );

            if (habilidadesOrError.esFallido)
                return Resultado.falla<any>(habilidadesOrError.error);
        } else {
            return Resultado.falla<any>(HABILIDAD_REQUERIDO);
        }

        let dto: CrearOfertaLaboralDTO = {
            titulo: entidad.props.titulo.valor(),
            cargo: entidad.props.cargo.valor(),
            sueldo: <number>entidad.props.sueldo!!.valor(),
            duracionEstimadaValor: <number>(
                entidad.props.duracionEstimada!.valor().duracion
            ),
            duracionEstimadaEscala: <string>(
                entidad.props.duracionEstimada!.valor().escala
            ),
            turnoTrabajo: <string>entidad.props.turnoTrabajo!.valor(),
            numeroVacantes: <number>entidad.props.numeroVacantes!.valor(),
            descripcion: descripcionOferta.valor(),
            habilidades: HabilidadMapeador.aArregloID(
                habilidadesOrError!.getValue()
            ),
        };

        return Resultado.ok<CrearOfertaLaboralDTO>(dto);
    }
}
