import { Resultado } from "../../comun/dominio/resultado";
import { SolicitudOfertasLaboralesActivasDTO } from "./casoDeUso/ObtenerOfertasLaboralesActivas";
import { OfertaLaboralEmpresaDTO } from "./dto/OfertaLaboralEmpresaDTO";

export interface IOfertasLaboralesRepo {
    obtenerOfertasLaboralesActivas(
        id: SolicitudOfertasLaboralesActivasDTO
    ): Resultado<OfertaLaboralEmpresaDTO[]>;
}
