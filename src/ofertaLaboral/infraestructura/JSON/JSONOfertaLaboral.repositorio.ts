import { SolicitudOfertasLaboralesActivasDTO } from "../../aplicacion/casoDeUso/ObtenerOfertasLaboralesActivas.cu";
import { OfertaLaboralEmpresaDTO } from "../../aplicacion/dto/OfertaLaboralEmpresaDTO";
import { Resultado } from "../../../comun/dominio/resultado";
import { IOfertasLaboralesRepo } from "../../aplicacion/IOfertaLaboral.repositorio";
import { OFERTAS_LABORALES_RESPUESTA_VALIDA } from "./ofertasLaboralesRespuestas";

export class JSONOfertaLaboralRepositorio implements IOfertasLaboralesRepo {
    obtenerOfertasLaboralesActivas(
        id: SolicitudOfertasLaboralesActivasDTO
    ): Resultado<OfertaLaboralEmpresaDTO[]> {
        return Resultado.ok<OfertaLaboralEmpresaDTO[]>(
            OFERTAS_LABORALES_RESPUESTA_VALIDA
        );
    }
}
