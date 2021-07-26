import { Resultado } from "../../comun/dominio/resultado";
import { SolicitudTrabajoDTO } from "./casoDeUso/ObtenerTrabajoDetalle.cu";
import { TrabajoEmpresaDTO } from "./dto/TrabajoEmpresaDTO";

export interface ITrabajoRepo {
    obtenerTrabajos(): Resultado<TrabajoEmpresaDTO[]>;

    obtenerDetalleTrabajo(
        identificador: SolicitudTrabajoDTO
    ): Resultado<TrabajoEmpresaDTO>;
}
