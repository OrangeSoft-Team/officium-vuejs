import { CasoUso } from "../../../comun/aplicacion/casoUso";
import { SolicitudOfertaLaboralDTO } from "../casoDeUso/ObtenerOfertaLaboralDetalle.cu";
import { IOfertasLaboralesRepo } from "../IOfertaLaboral.repositorio";
import { Resultado } from "../../../comun/dominio/resultado";
import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";

export class CancelarOfertaLaboral
    implements CasoUso<SolicitudOfertaLaboralDTO, Resultado<OperacionExitosaDTO>>
{
    //Repositorio
    private RepoOfertaLaboral: IOfertasLaboralesRepo;

    constructor(repoImplementacion: IOfertasLaboralesRepo) {
        this.RepoOfertaLaboral = repoImplementacion;
    }

    //Query
    public async ejecutar(
        identificador: SolicitudOfertaLaboralDTO
    ): Promise<Resultado<OperacionExitosaDTO>> {
        //Llamamos al repositorio
        const cancelarOfertaLaboralOrError = await this.RepoOfertaLaboral.cancelaOfertaLaboral(
            identificador
        );
        if (cancelarOfertaLaboralOrError.esFallido)
            return Resultado.falla<any>(cancelarOfertaLaboralOrError.error);

        return Resultado.ok<OperacionExitosaDTO>({
            mensaje: OPERACION_EXITOSA,
        });
    }
}