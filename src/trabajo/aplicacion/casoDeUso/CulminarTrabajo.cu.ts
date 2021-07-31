import { CasoUso } from "../../../comun/aplicacion/casoUso";
import { SolicitudTrabajoDTO } from "../casoDeUso/ObtenerTrabajoDetalle.cu";
import { ITrabajoRepo } from "../ITrabajos.repositorio";
import { Resultado } from "../../../comun/dominio/resultado";
import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";

export class CulminarTrabajo
    implements CasoUso<SolicitudTrabajoDTO, Resultado<OperacionExitosaDTO>>
{
    //Repositorio
    private RepoTrabajo: ITrabajoRepo;

    constructor(repoImplementacion: ITrabajoRepo) {
        this.RepoTrabajo = repoImplementacion;
    }

    //Query
    public async ejecutar(
        identificador: SolicitudTrabajoDTO
    ): Promise<Resultado<OperacionExitosaDTO>> {
        //Llamamos al repositorio
        const trabajoEstadoOrError = await this.RepoTrabajo.culminaTrabajo(
            identificador
        );
        if (trabajoEstadoOrError.esFallido)
            return Resultado.falla<any>(trabajoEstadoOrError.error);

        return Resultado.ok<OperacionExitosaDTO>({
            mensaje: OPERACION_EXITOSA,
        });
    }
}
