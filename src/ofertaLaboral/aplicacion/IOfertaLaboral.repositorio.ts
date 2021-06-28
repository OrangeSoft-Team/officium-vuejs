import { Resultado } from "../../comun/dominio/resultado";
import { SolicitudOfertasLaboralesActivasDTO } from "./casoDeUso/ObtenerOfertasLaboralesActivas.cu";
import { SolicitudOfertaLaboralDTO } from "./casoDeUso/ObtenerOfertaLaboralDetalle.cu";
import { SolicitudCreacionOfertaLaboralDTO } from "./casoDeUso/CrearOfertaLaboral.cu";
import { OfertaLaboralEmpresaDTO } from "./dto/OfertaLaboralEmpresaDTO";

export interface IOfertasLaboralesRepo {
    obtenerOfertasLaboralesActivas(
        id: SolicitudOfertasLaboralesActivasDTO
    ): Resultado<OfertaLaboralEmpresaDTO[]>;

    obtenerOfertaLaboralDetalle(
        id: SolicitudOfertaLaboralDTO
    ): Resultado<OfertaLaboralEmpresaDTO>;

    crearOfertaLaboral(
        id: SolicitudCreacionOfertaLaboralDTO
    ): Resultado<OfertaLaboralEmpresaDTO>;
}
