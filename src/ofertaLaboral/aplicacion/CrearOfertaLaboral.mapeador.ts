import { Resultado } from "../../comun/dominio/resultado";
import { DESCRIPCION_OFERTA_LONGITUD_NO_VALIDA } from "../dominio/excepciones/descripcionOferta.excepcion";
import { OfertaLaboral } from "../dominio/OfertaLaboral";
import { CrearOfertaLaboralDTO } from "./dto/CrearOfertaLaboralDTO";

export class CrearOfertaLaboralMapeador {
    //Convertimos a DTO Crear, entidad Oferta Laboral
    public static aDTO(
        entidad: OfertaLaboral
    ): Resultado<CrearOfertaLaboralDTO> {
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
            descripcion: "",
        };

        if (entidad.props.descripcion) {
            dto.descripcion = entidad.props.descripcion.valor();
        } else {
            return Resultado.falla<any>(DESCRIPCION_OFERTA_LONGITUD_NO_VALIDA);
        }

        return Resultado.ok<CrearOfertaLaboralDTO>(dto);
    }
}
