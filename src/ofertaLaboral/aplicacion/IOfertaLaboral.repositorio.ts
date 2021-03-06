import { Resultado } from "../../comun/dominio/resultado";
import { SolicitudOfertaLaboralDTO } from "./casoDeUso/ObtenerOfertaLaboralDetalle.cu";
import { OfertaLaboralEmpresaDTO } from "./dto/OfertaLaboralEmpresaDTO";
import { CrearOfertaLaboralDTO } from "./dto/CrearOfertaLaboralDTO";
import { OperacionExitosaDTO } from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { SolicitudCreacionOfertaLaboralDTO } from "./casoDeUso/CrearOfertaLaboral.cu";
import { ModificarOfertaLaboralDTO } from "./dto/ModificarOfertaLaboralDTO";

export interface IOfertasLaboralesRepo {
    obtenerOfertasLaboralesActivas(): Resultado<OfertaLaboralEmpresaDTO[]>;

    obtenerOfertaLaboralDetalle(
        id: SolicitudOfertaLaboralDTO
    ): Resultado<OfertaLaboralEmpresaDTO>;

    crearOfertaLaboral(
        ofertaLaboral: CrearOfertaLaboralDTO
    ): Resultado<OperacionExitosaDTO>;

    modificarOfertaLaboral(
        ofertaLaboral: ModificarOfertaLaboralDTO,
        identificador: { uuid: string }
    ): Resultado<OperacionExitosaDTO>;

    cancelaOfertaLaboral(
        id: SolicitudOfertaLaboralDTO
    ): Resultado<OperacionExitosaDTO>;
}
