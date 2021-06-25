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

        //Convertimos a dominio array
        let conjutoOfertasOrError = OfertasLaboralesMapeador.aDominio(
            ofertaLaboralOrError.getValue()
        );
        if (conjutoOfertasOrError.esFallido)
            return Resultado.falla<any>(conjutoOfertasOrError.error);

        //Respondo con un arreglo segun estandar DTO
        let ConjuntoRespuestaOrError = OfertasLaboralesMapeador.aDTO(
            conjutoOfertasOrError.getValue()
        );

        if (ConjuntoRespuestaOrError.esFallido)
            return Resultado.falla<any>(ConjuntoRespuestaOrError.error);

        return Resultado.ok<OfertaLaboralEmpresaDTO>(
            ConjuntoRespuestaOrError.getValue()
        );
    }
}
