import { OfertaLaboral } from "../../dominio/OfertaLaboral";
import { OfertasLaboralesMapeador } from "../OfertaLaboral.mapeador";
import { IOfertasLaboralesRepo } from "../IOfertaLaboral.repositorio";
import { CasoUso } from "../../../comun/aplicacion/casoUso";
import { Resultado } from "../../../comun/dominio/resultado";

export interface SolicitudOfertasLaboralesActivasDTO {
    idEmpresa: string;
}

export class ObtenerOfertasLaboralesActivas
    implements
        CasoUso<
            SolicitudOfertasLaboralesActivasDTO,
            Resultado<OfertaLaboral[]>
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
    ): Promise<Resultado<OfertaLaboral[]>> {
        //Llamamos al repositorio
        let ofertasLaboralesActivasOrError =
            await this.RepoOfertasLaborales.obtenerOfertasLaboralesActivas(
                solicitud
            );
        if (ofertasLaboralesActivasOrError.esFallido)
            return Resultado.falla<any>(ofertasLaboralesActivasOrError.error);

        //Convertimos a dominio array
        let ConjutoOfertasOrError = OfertasLaboralesMapeador.aDominioConjunto(
            ofertasLaboralesActivasOrError.getValue()
        );
        if (ConjutoOfertasOrError.esFallido)
            return Resultado.falla<any>(ConjutoOfertasOrError.error);

        return Resultado.ok<OfertaLaboral[]>(ConjutoOfertasOrError.getValue());
    }
}
