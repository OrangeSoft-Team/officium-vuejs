import { OfertaLaboral } from "../../dominio/OfertaLaboral";
import { OfertasLaboralesMapeador } from "../OfertaLaboral.mapeador";
import { IOfertasLaboralesRepo } from "../IOfertaLaboral.repositorio";
import { CasoUso } from "../../../comun/aplicacion/casoUso";
import { Resultado } from "../../../comun/dominio/resultado";
import { OfertaLaboralEmpresaDTO } from "../dto/OfertaLaboralEmpresaDTO";

export interface SolicitudOfertasLaboralesActivasDTO {
    idEmpresa: string;
}

export class ObtenerOfertasLaboralesActivas
    implements
        CasoUso<
            SolicitudOfertasLaboralesActivasDTO,
            Resultado<OfertaLaboralEmpresaDTO[]>
        >
{
    //Repositorio
    private RepoOfertasLaborales: IOfertasLaboralesRepo;

    constructor(RepoImplementacion: IOfertasLaboralesRepo) {
        this.RepoOfertasLaborales = RepoImplementacion;
    }

    //Query
    public async ejecutar(
        solicitud: SolicitudOfertasLaboralesActivasDTO
    ): Promise<Resultado<OfertaLaboralEmpresaDTO[]>> {
        //Llamamos al repositorio
        let ofertasLaboralesActivasOrError =
            await this.RepoOfertasLaborales.obtenerOfertasLaboralesActivas(
                solicitud
            );
        if (ofertasLaboralesActivasOrError.esFallido)
            return Resultado.falla<any>(ofertasLaboralesActivasOrError.error);

        //Convertimos a dominio array
        let conjutoOfertasOrError = OfertasLaboralesMapeador.aDominioConjunto(
            ofertasLaboralesActivasOrError.getValue()
        );
        if (conjutoOfertasOrError.esFallido)
            return Resultado.falla<any>(conjutoOfertasOrError.error);

        //Respondo con un arreglo segun estandar DTO
        let ConjuntoRespuestaOrError = OfertasLaboralesMapeador.aDTOConjunto(
            conjutoOfertasOrError.getValue()
        );

        if (ConjuntoRespuestaOrError.esFallido)
            return Resultado.falla<any>(ConjuntoRespuestaOrError.error);

        return Resultado.ok<OfertaLaboralEmpresaDTO[]>(
            ConjuntoRespuestaOrError.getValue()
        );
    }
}
