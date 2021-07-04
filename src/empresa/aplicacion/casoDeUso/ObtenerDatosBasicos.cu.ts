import { DatosBasicosMapeador } from "../DatosBasicos.mapeador";
import { IEmpresaRepo } from "../IEmpresa.repositorio";
import { CasoUso } from "../../../comun/aplicacion/casoUso";
import { Resultado } from "../../../comun/dominio/resultado";
import { DatosBasicosEmpresaDTO } from "../dto/DatosBasicosEmpresaDTO";

export interface SolicitudDatosBasicosDTO {
    idEmpresa: string;
}

export class ObtenerOfertaLaboral
    implements
        CasoUso<SolicitudDatosBasicosDTO, Resultado<DatosBasicosEmpresaDTO>>
{
    //Repositorio
    private RepoEmpresa: IEmpresaRepo;

    constructor(RepoImplementacion: IEmpresaRepo) {
        this.RepoEmpresa = RepoImplementacion;
    }

    //Query
    public async ejecutar(
        solicitud: SolicitudDatosBasicosDTO
    ): Promise<Resultado<DatosBasicosEmpresaDTO>> {
        //Llamamos al repositorio
        let datosBasicosOrError = await this.RepoEmpresa.obtenerDatosBasicos(
            solicitud
        );
        if (datosBasicosOrError.esFallido)
            return Resultado.falla<any>(datosBasicosOrError.error);

        //Convertimos a dominio
        let datosEmpresaOrError = DatosBasicosMapeador.aDominio(
            datosBasicosOrError.getValue()
        );
        if (datosEmpresaOrError.esFallido)
            return Resultado.falla<any>(datosEmpresaOrError.error);

        //Respondo con un DTO
        let respuestaOrError = DatosBasicosMapeador.aDTO(
            datosEmpresaOrError.getValue()
        );

        if (respuestaOrError.esFallido)
            return Resultado.falla<any>(respuestaOrError.error);

        return Resultado.ok<DatosBasicosEmpresaDTO>(
            respuestaOrError.getValue()
        );
    }
}
