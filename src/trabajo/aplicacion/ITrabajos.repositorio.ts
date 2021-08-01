import { OperacionExitosaDTO } from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { Resultado } from "../../comun/dominio/resultado";
import { SolicitudTrabajoDTO } from "./casoDeUso/ObtenerTrabajoDetalle.cu";
import { TrabajoEmpresaDTO } from "./dto/TrabajoEmpresaDTO";

export interface ITrabajoRepo {
    obtenerTrabajos(): Resultado<TrabajoEmpresaDTO[]>;

    obtenerDetalleTrabajo(
        identificador: SolicitudTrabajoDTO
    ): Resultado<TrabajoEmpresaDTO>;

    culminaTrabajo(
        identificador: SolicitudTrabajoDTO
    ): Resultado<OperacionExitosaDTO>;

    cancelaTrabajo(
        identificador: SolicitudTrabajoDTO
    ): Resultado<OperacionExitosaDTO>;
}
