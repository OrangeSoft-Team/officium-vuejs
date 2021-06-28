import { SolicitudOfertasLaboralesActivasDTO } from "../../../aplicacion/casoDeUso/ObtenerOfertasLaboralesActivas.cu";
import { OfertaLaboralEmpresaDTO } from "../../../aplicacion/dto/OfertaLaboralEmpresaDTO";
import { Resultado } from "../../../../comun/dominio/resultado";
import { IOfertasLaboralesRepo } from "../../../aplicacion/IOfertaLaboral.repositorio";
import { SolicitudOfertaLaboralDTO } from "@/ofertaLaboral/aplicacion/casoDeUso/ObtenerOfertaLaboralDetalle.cu";
import { SolicitudCreacionOfertaLaboralDTO } from "@/ofertaLaboral/aplicacion/casoDeUso/CrearOfertaLaboral.cu";
import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { OFERTAS_LABORALES_RESPUESTA_VALIDA } from "../../../infraestructura/JSON/respuestas/ListadoOfertasLaborales";
import { OFERTA_LABORAL_RESPUESTA_VALIDA } from "../../../infraestructura/JSON/respuestas/IndividualOfertaLaboral";

export class JSONOfertaLaboralRepositorio implements IOfertasLaboralesRepo {
    crearOfertaLaboral(
        ofertaLaboral: SolicitudCreacionOfertaLaboralDTO
    ): Resultado<OperacionExitosaDTO> {
        return Resultado.ok<OperacionExitosaDTO>({
            mensaje: OPERACION_EXITOSA,
        });
    }

    obtenerOfertasLaboralesActivas(
        id: SolicitudOfertasLaboralesActivasDTO
    ): Resultado<OfertaLaboralEmpresaDTO[]> {
        return Resultado.ok<OfertaLaboralEmpresaDTO[]>(
            OFERTAS_LABORALES_RESPUESTA_VALIDA
        );
    }

    obtenerOfertaLaboralDetalle(
        id: SolicitudOfertaLaboralDTO
    ): Resultado<OfertaLaboralEmpresaDTO> {
        return Resultado.ok<OfertaLaboralEmpresaDTO>(
            OFERTA_LABORAL_RESPUESTA_VALIDA
        );
    }
}
