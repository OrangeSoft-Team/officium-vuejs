import { OfertasLaboralesMapeador } from "../OfertaLaboral.mapeador";
import { IOfertasLaboralesRepo } from "../IOfertaLaboral.repositorio";
import { CasoUso } from "../../../comun/aplicacion/casoUso";
import { Resultado } from "../../../comun/dominio/resultado";
import { OfertaLaboralEmpresaDTO } from "../dto/OfertaLaboralEmpresaDTO";
import { CrearOfertaLaboralMapeador } from "../CrearOfertaLaboral.mapeador";
import { OperacionExitosaDTO } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { HabilidadDTO } from "../../../comun/aplicacion/dtos/HabilidadDTO";
import { ModificarOfertaLaboralMapeador } from "../ModificarOfertaLaboral.mapeador";

export interface SolicitudModificacionOfertaLaboralDTO {
    uuidOfertaLaboral: string;
    titulo: string;
    cargo: string;
    sueldo: number;
    duracionEstimadaValor: number;
    duracionEstimadaEscala: string;
    turnoTrabajo: string;
    numeroVacantes: number;
    requisitosEspeciales?: string;
    descripcion: string;
    habilidades: HabilidadDTO[];
}

export class ModificarOfertaLaboral
    implements
        CasoUso<
            SolicitudModificacionOfertaLaboralDTO,
            Resultado<OperacionExitosaDTO>
        >
{
    //Repositorio
    private RepoOfertasLaborales: IOfertasLaboralesRepo;

    constructor(RepoImplementacion: IOfertasLaboralesRepo) {
        this.RepoOfertasLaborales = RepoImplementacion;
    }

    ejecutar(
        solicitud: SolicitudModificacionOfertaLaboralDTO
    ): Promise<Resultado<OperacionExitosaDTO>> {
        //Convertimos a dominio
        return new Promise((resolve, reject) => {
            let ofertaOrError = OfertasLaboralesMapeador.aDominio(solicitud);
            if (ofertaOrError.esFallido)
                resolve(Resultado.falla<any>(ofertaOrError.error));

            //Convertimos a DTO
            let DTOCrearOfertaOrError = ModificarOfertaLaboralMapeador.aDTO(
                ofertaOrError.getValue()
            );
            if (DTOCrearOfertaOrError.esFallido)
                resolve(Resultado.falla<any>(DTOCrearOfertaOrError.error));

            //Llamamos al repositorio
            let NuevaOfertaLaboralOrError =
                this.RepoOfertasLaborales.modificarOfertaLaboral(
                    DTOCrearOfertaOrError.getValue(),
                    { uuid: solicitud.uuidOfertaLaboral }
                );
            if (NuevaOfertaLaboralOrError.esFallido)
                resolve(Resultado.falla<any>(NuevaOfertaLaboralOrError.error));

            resolve(
                Resultado.ok<OperacionExitosaDTO>(
                    NuevaOfertaLaboralOrError.getValue()
                )
            );
        });
    }
}
