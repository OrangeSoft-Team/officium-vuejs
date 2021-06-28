import { OfertasLaboralesMapeador } from "../OfertaLaboral.mapeador";
import { IOfertasLaboralesRepo } from "../IOfertaLaboral.repositorio";
import { CasoUso } from "../../../comun/aplicacion/casoUso";
import { Resultado } from "../../../comun/dominio/resultado";
import { OfertaLaboralEmpresaDTO } from "../dto/OfertaLaboralEmpresaDTO";


export interface SolicitudCreacionOfertaLaboralDTO {
    idEmpresa: string;
}

export class CrearOfertaLaboral
    implements
        CasoUso<
            SolicitudCreacionOfertaLaboralDTO,
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
        solicitud: SolicitudCreacionOfertaLaboralDTO
    ): Promise<Resultado<OfertaLaboralEmpresaDTO>> {        
        //Llamamos al repositorio
        let NuevaOfertaLaboralOrError =
            await this.RepoOfertasLaborales.crearOfertaLaboral(
                solicitud
            );
        if (NuevaOfertaLaboralOrError.esFallido)
            return Resultado.falla<any>(NuevaOfertaLaboralOrError.error);

        //Convertimos a dominio
        let ofertaOrError = OfertasLaboralesMapeador.aDominio(
            NuevaOfertaLaboralOrError.getValue()
        );
        if (ofertaOrError.esFallido)
            return Resultado.falla<any>(ofertaOrError.error);

        //Respondo con un DTO
        let respuestaOrError = OfertasLaboralesMapeador.aDTO(
            ofertaOrError.getValue()
        );

        if (respuestaOrError.esFallido)
            return Resultado.falla<any>(respuestaOrError.error);

        return Resultado.ok<OfertaLaboralEmpresaDTO>(
            respuestaOrError.getValue()
        );
    }
}

