import { Resultado } from "../../comun/dominio/resultado";
import { OperacionExitosaDTO } from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { TrabajoEmpresaDTO } from "./dto/TrabajoEmpresaDTO";

export interface ITrabajoRepo {
    obtenerTrabajos(): Resultado<TrabajoEmpresaDTO[]>;

    /*obtenerDetalleTrabajo(
        id: SolicitudOfertaLaboralDTO
    ): Resultado<OfertaLaboralEmpresaDTO>;*/
}
