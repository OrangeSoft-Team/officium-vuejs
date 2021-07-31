import { CasoUso } from "../../../comun/aplicacion/casoUso";
import { SolicitudTrabajoDTO } from "../casoDeUso/ObtenerTrabajoDetalle.cu";
import { ITrabajoRepo } from "../ITrabajos.repositorio";
import { Resultado } from "../../../comun/dominio/resultado";


export class CulminarTrabajo
    implements
        CasoUso<SolicitudTrabajoDTO, Resultado<any>>
{
    //Repositorio
    private RepoTrabajo: ITrabajoRepo;

    constructor(
        repoImplementacion: ITrabajoRepo
    ) {
        this.RepoTrabajo = repoImplementacion;
    }

    //Query
    public async ejecutar(
        identificador: SolicitudTrabajoDTO
    ): Promise<Resultado<any>> {
        //Llamamos al repositorio
        const trabajoEstadoOrError =
            await this.RepoTrabajo.culminaTrabajo(identificador);
        if (trabajoEstadoOrError.esFallido)
            return Resultado.falla<any>(trabajoEstadoOrError.error);


        return Resultado.ok<any>(
            trabajoEstadoOrError
        );
    }

}
