import { CasoUso } from "../../../comun/aplicacion/casoUso";
import { Resultado } from "../../../comun/dominio/resultado";
import { TrabajoEmpresaDTO } from "../dto/TrabajoEmpresaDTO";
import { ITrabajoRepo } from "../ITrabajos.repositorio";
import { TrabajoEmpresaMapeador } from "../Trabajo.mapeador";

export class ObtenerTrabajos
    implements CasoUso<null, Resultado<TrabajoEmpresaDTO[]>>
{
    //Repositorio
    private RepoTrabajo: ITrabajoRepo;

    constructor(repoImplementacion: ITrabajoRepo) {
        this.RepoTrabajo = repoImplementacion;
    }

    //Query
    public async ejecutar(): Promise<Resultado<TrabajoEmpresaDTO[]>> {
        //Llamamos al repositorio
        const trabajosEmpresaOrError = await this.RepoTrabajo.obtenerTrabajos();
        if (trabajosEmpresaOrError.esFallido)
            return Resultado.falla<any>(trabajosEmpresaOrError.error);

        //Convertimos a dominio array
        const conjuntoTrabajosOrError = TrabajoEmpresaMapeador.aDominioConjunto(
            trabajosEmpresaOrError.getValue()
        );
        if (conjuntoTrabajosOrError.esFallido)
            return Resultado.falla<any>(conjuntoTrabajosOrError.error);

        //Respondo con un arreglo segun estandar DTO
        const ConjuntoRespuestaOrError = TrabajoEmpresaMapeador.aDTOConjunto(
            conjuntoTrabajosOrError.getValue()
        );

        if (ConjuntoRespuestaOrError.esFallido)
            return Resultado.falla<any>(ConjuntoRespuestaOrError.error);

        return Resultado.ok<TrabajoEmpresaDTO[]>(
            ConjuntoRespuestaOrError.getValue()
        );
    }
}
