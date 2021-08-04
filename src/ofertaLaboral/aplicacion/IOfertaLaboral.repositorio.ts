import { Resultado } from "../../comun/dominio/resultado";
import { SolicitudOfertaLaboralDTO } from "./casoDeUso/ObtenerOfertaLaboralDetalle.cu";
import { OfertaLaboralEmpresaDTO } from "./dto/OfertaLaboralEmpresaDTO";
import { CrearOfertaLaboralDTO } from "./dto/CrearOfertaLaboralDTO";
import { OperacionExitosaDTO } from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { SolicitudCreacionOfertaLaboralDTO } from "./casoDeUso/CrearOfertaLaboral.cu";
import { ModificarOfertaLaboralDTO } from "./dto/ModificarOfertaLaboralDTO";

export interface IOfertasLaboralesRepo {
    obtenerOfertasLaboralesActivas(): Promise<
        Resultado<OfertaLaboralEmpresaDTO[]>
    >;

    obtenerOfertaLaboralDetalle(
        id: SolicitudOfertaLaboralDTO
    ): Promise<Resultado<OfertaLaboralEmpresaDTO>>;

    crearOfertaLaboral(
        ofertaLaboral: CrearOfertaLaboralDTO
    ): Promise<Resultado<OperacionExitosaDTO>>;

    modificarOfertaLaboral(
        ofertaLaboral: ModificarOfertaLaboralDTO,
        identificador: { uuid: string }
    ): Resultado<OperacionExitosaDTO>;

    cancelaOfertaLaboral(
        id: SolicitudOfertaLaboralDTO
    ): Resultado<OperacionExitosaDTO>;
}
