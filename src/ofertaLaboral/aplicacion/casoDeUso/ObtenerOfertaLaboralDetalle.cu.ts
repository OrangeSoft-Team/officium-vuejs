import { OfertasLaboralesMapeador } from "../OfertaLaboral.mapeador";
import { IOfertasLaboralesRepo } from "../IOfertaLaboral.repositorio";
import { CasoUso } from "../../../comun/aplicacion/casoUso";
import { Resultado } from "../../../comun/dominio/resultado";
import { OfertaLaboralEmpresaDTO } from "../dto/OfertaLaboralEmpresaDTO";

export interface SolicitudOfertaLaboralDTO {
    idOfertaLaboral: string;
}

export class ObtenerOfertaLaboral
    implements
        CasoUso<
            SolicitudOfertaLaboralDTO,
            Resultado<OfertaLaboralEmpresaDTO>
        >
{
    //Repositorio
    private RepoOfertasLaborales: IOfertasLaboralesRepo;

    constructor(RepoImplementacion: IOfertasLaboralesRepo) {
        this.RepoOfertasLaborales = RepoImplementacion;
    }

    //Query
    public async ejecutar(
        solicitud: SolicitudOfertaLaboralDTO
    ): Promise<Resultado<OfertaLaboralEmpresaDTO>> {
        //Llamamos al repositorio
        let ofertaLaboralOrError =
            await this.RepoOfertasLaborales.obtenerOfertaLaboralDetalle(
                solicitud
            );
        if (ofertaLaboralOrError.esFallido)
            return Resultado.falla<any>(ofertaLaboralOrError.error);

        //Convertimos a dominio
        let ofertasOrError = OfertasLaboralesMapeador.aDominio(
            ofertaLaboralOrError.getValue()
        );
        if (ofertasOrError.esFallido)
            return Resultado.falla<any>(ofertasOrError.error);

        //Respondo con un DTO
        let respuestaOrError = OfertasLaboralesMapeador.aDTO(
            ofertasOrError.getValue()
        );

        if (respuestaOrError.esFallido)
            return Resultado.falla<any>(respuestaOrError.error);

        return Resultado.ok<OfertaLaboralEmpresaDTO>(
            respuestaOrError.getValue()
        );
    }
}
