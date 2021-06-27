import { SolicitudOfertasLaboralesActivasDTO } from "../../aplicacion/casoDeUso/ObtenerOfertasLaboralesActivas.cu";
import { OfertaLaboralEmpresaDTO } from "../../aplicacion/dto/OfertaLaboralEmpresaDTO";
import { Resultado } from "../../../comun/dominio/resultado";
import { IOfertasLaboralesRepo } from "../../aplicacion/IOfertaLaboral.repositorio";
import {
    OFERTAS_LABORALES_RESPUESTA_CON_ERROR_VACANTES,
    OFERTAS_LABORALES_RESPUESTA_VALIDA,
    OFERTA_LABORAL_RESPUESTA_VALIDA,
} from "./ofertasLaboralesRespuestas";
import { SolicitudOfertaLaboralDTO } from "@/ofertaLaboral/aplicacion/casoDeUso/ObtenerOfertaLaboralDetalle.cu";

export class JSONOfertaLaboralRepositorio implements IOfertasLaboralesRepo {
    obtenerOfertasLaboralesActivas(
        id: SolicitudOfertasLaboralesActivasDTO
    ): Resultado<OfertaLaboralEmpresaDTO[]> {
        return Resultado.ok<OfertaLaboralEmpresaDTO[]>(
            OFERTAS_LABORALES_RESPUESTA_VALIDA

            // OFERTAS_LABORALES_RESPUESTA_CON_ERROR_VACANTES
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
