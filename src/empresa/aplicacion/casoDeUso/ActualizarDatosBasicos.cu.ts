import { IEmpresaRepo } from "../IEmpresa.repositorio";
import { CasoUso } from "../../../comun/aplicacion/casoUso";
import { Resultado } from "../../../comun/dominio/resultado";
import { DatosBasicosMapeador } from "../DatosBasicos.mapeador";
import { OperacionExitosaDTO } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";

export interface SolicitudActualizarDatosBasicosDTO {
    uuidEmpresa?: string;
    nombreEmpresa: string;
    correoElectronico: string;
    direccionCalle: string;
    codigoPostal: string;
    uuidPais: string;
    uuidEstado: string;
    uuidCiudad: string;
}

export class ActualizarDatosBasicos
    implements
        CasoUso<
            SolicitudActualizarDatosBasicosDTO,
            Resultado<OperacionExitosaDTO>
        >
{
    //Repositorio
    private RepoOfertasLaborales: IEmpresaRepo;

    constructor(RepoImplementacion: IEmpresaRepo) {
        this.RepoOfertasLaborales = RepoImplementacion;
    }

    //Query
    public async ejecutar(
        solicitud: SolicitudActualizarDatosBasicosDTO
    ): Promise<Resultado<OperacionExitosaDTO>> {
        //Convertimos a dominio
        let datosEmpresaOrError = DatosBasicosMapeador.aDominio(solicitud);
        if (datosEmpresaOrError.esFallido)
            return Resultado.falla<any>(datosEmpresaOrError.error);

        //Convertimos a DTO
        let DTOActualizarDatosOrError = DatosBasicosMapeador.aDTO(
            datosEmpresaOrError.getValue()
        );
        if (DTOActualizarDatosOrError.esFallido)
            return Resultado.falla<any>(DTOActualizarDatosOrError.error);

        //Llamamos al repositorio
        let NuevosDatosBasicosOrError =
            await this.RepoOfertasLaborales.actualizarDatosBasicos(
                DTOActualizarDatosOrError.getValue()
            );
        if (NuevosDatosBasicosOrError.esFallido)
            return Resultado.falla<any>(NuevosDatosBasicosOrError.error);

        return Resultado.ok<OperacionExitosaDTO>(
            NuevosDatosBasicosOrError.getValue()
        );
    }
}
