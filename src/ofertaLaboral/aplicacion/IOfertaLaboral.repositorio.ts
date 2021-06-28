import { Resultado } from "../../comun/dominio/resultado";
import { SolicitudOfertasLaboralesActivasDTO } from "./casoDeUso/ObtenerOfertasLaboralesActivas.cu";
import { SolicitudOfertaLaboralDTO } from "./casoDeUso/ObtenerOfertaLaboralDetalle.cu";
import { SolicitudCreacionOfertaLaboralDTO } from "./casoDeUso/CrearOfertaLaboral.cu";
import { OfertaLaboralEmpresaDTO } from "./dto/OfertaLaboralEmpresaDTO";
import { CrearOfertaLaboralDTO } from "./dto/CrearOfertaLaboralDTO";
import { OperacionExitosaDTO } from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";

export interface IOfertasLaboralesRepo {
    obtenerOfertasLaboralesActivas(
        id: SolicitudOfertasLaboralesActivasDTO
    ): Resultado<OfertaLaboralEmpresaDTO[]>;

    obtenerOfertaLaboralDetalle(
        id: SolicitudOfertaLaboralDTO
    ): Resultado<OfertaLaboralEmpresaDTO>;

    crearOfertaLaboral(
        ofertaLaboral: CrearOfertaLaboralDTO
    ): Resultado<OperacionExitosaDTO>;
}
