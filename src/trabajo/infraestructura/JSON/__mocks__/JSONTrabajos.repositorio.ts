import { Resultado } from "../../../../comun/dominio/resultado";
import { TrabajoEmpresaDTO } from "../../../aplicacion/dto/TrabajoEmpresaDTO";
import { ITrabajoRepo } from "../../../aplicacion/ITrabajos.repositorio";
import { TRABAJOS_EMPRESA_VALIDA } from ".././respuestas/ListadoTrabajos";
import { OPERACION_FALLIDA } from "../../../../comun/aplicacion/dto.respuestaOperaciones/OperacionFallida";
import { SolicitudTrabajoDTO } from "../../../aplicacion/casoDeUso/ObtenerTrabajoDetalle.cu";
import { LISTADO_TRABAJOS_DETALLE } from "../respuestas/ListadoDetalleTrabajos";
import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";

export class JSONTrabajosRepositorio implements ITrabajoRepo {
    obtenerTrabajos(): Resultado<TrabajoEmpresaDTO[]> {
        //Respondemos a la solicitud
        return Resultado.ok<TrabajoEmpresaDTO[]>(TRABAJOS_EMPRESA_VALIDA);
    }

    obtenerDetalleTrabajo(
        identificador: SolicitudTrabajoDTO
    ): Resultado<TrabajoEmpresaDTO> {
        const listadoTrabajos: TrabajoEmpresaDTO[] = LISTADO_TRABAJOS_DETALLE;

        for (let trabajo of listadoTrabajos) {
            if (identificador.uuid_trabajo == trabajo!.uuid) {
                return Resultado.ok<TrabajoEmpresaDTO>(trabajo);
            }
        }

        return Resultado.falla<any>(OPERACION_FALLIDA);
    }

    culminaTrabajo(
        identificador: SolicitudTrabajoDTO
    ): Resultado<OperacionExitosaDTO> {
        //Respondemos a la solicitud
        return Resultado.ok<OperacionExitosaDTO>({
            mensaje: OPERACION_EXITOSA,
        });
    }

    cancelaTrabajo(
        identificador: SolicitudTrabajoDTO
    ): Resultado<OperacionExitosaDTO> {
        //Respondemos a la solicitud
        return Resultado.ok<OperacionExitosaDTO>({
            mensaje: OPERACION_EXITOSA,
        });
    }
}
