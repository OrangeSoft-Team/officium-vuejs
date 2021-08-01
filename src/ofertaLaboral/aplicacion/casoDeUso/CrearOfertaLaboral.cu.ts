import { OfertasLaboralesMapeador } from "../OfertaLaboral.mapeador";
import { IOfertasLaboralesRepo } from "../IOfertaLaboral.repositorio";
import { CasoUso } from "../../../comun/aplicacion/casoUso";
import { Resultado } from "../../../comun/dominio/resultado";
import { OfertaLaboralEmpresaDTO } from "../dto/OfertaLaboralEmpresaDTO";
import { CrearOfertaLaboralMapeador } from "../CrearOfertaLaboral.mapeador";
import { OperacionExitosaDTO } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { HabilidadDTO } from "../../../comun/aplicacion/dtos/HabilidadDTO";


export interface SolicitudCreacionOfertaLaboralDTO {
    uuidempresa?: string;
    titulo: string;
    cargo: string;
    sueldo: number;
    duracionEstimadaValor: number;
    duracionEstimadaEscala: string;
    turnoTrabajo: string;
    numeroVacantes: number;
    requisitosEspeciales?: string;
    descripcion: string;
    uuidHabilidades: HabilidadDTO[];
}

export class CrearOfertaLaboral
    implements
        CasoUso<
            SolicitudCreacionOfertaLaboralDTO,
            Resultado<OperacionExitosaDTO>
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
    ): Promise<Resultado<OperacionExitosaDTO>> {
        //Convertimos a dominio
        let ofertaOrError = OfertasLaboralesMapeador.aDominio(solicitud);
        if (ofertaOrError.esFallido)
            return Resultado.falla<any>(ofertaOrError.error);

        //Convertimos a DTO
        let DTOCrearOfertaOrError = CrearOfertaLaboralMapeador.aDTO(
            ofertaOrError.getValue()
        );
        if (DTOCrearOfertaOrError.esFallido)
            return Resultado.falla<any>(DTOCrearOfertaOrError.error);

        //Llamamos al repositorio
        let NuevaOfertaLaboralOrError =
            await this.RepoOfertasLaborales.crearOfertaLaboral(
                DTOCrearOfertaOrError.getValue()
            );
        if (NuevaOfertaLaboralOrError.esFallido)
            return Resultado.falla<any>(NuevaOfertaLaboralOrError.error);

        return Resultado.ok<OperacionExitosaDTO>(
            NuevaOfertaLaboralOrError.getValue()
        );
    }
}
