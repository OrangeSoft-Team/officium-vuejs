import { CasoUso } from "../../../comun/aplicacion/casoUso";
import { CiudadDTO } from "../../../comun/aplicacion/dto.geografico/CiudadDTO";
import { EstadoDTO } from "../../../comun/aplicacion/dto.geografico/EstadoDTO";
import { PaisDTO } from "../../../comun/aplicacion/dto.geografico/PaisDTO";
import {
    IServicioCiudad,
    SolicitudCiudadUnicaDTO,
} from "../../../comun/aplicacion/IServicioCiudad";
import {
    IServicioEstado,
    SolicitudEstadoUnicoDTO,
} from "../../../comun/aplicacion/IServicioEstado";
import {
    IServicioPais,
    SolicitudPaisDTO,
} from "../../../comun/aplicacion/IServicioPais";
import { Resultado } from "../../../comun/dominio/resultado";
import {
    TrabajoEmpresaDTO,
    TrabajoEmpresaResumidoDTO,
} from "../dto/TrabajoEmpresaDTO";
import { ITrabajoRepo } from "../ITrabajos.repositorio";
import { TrabajoEmpresaMapeador } from "../Trabajo.mapeador";

export interface SolicitudTrabajoDTO {
    uuid_trabajo: string;
}

export class ObtenerTrabajoDetalle
    implements
        CasoUso<SolicitudTrabajoDTO, Resultado<TrabajoEmpresaResumidoDTO>>
{
    //Repositorio
    private RepoTrabajo: ITrabajoRepo;
    //Servicios geograficos
    private servicioPais: IServicioPais;
    private servicioEstado: IServicioEstado;
    private servicioCiudad: IServicioCiudad;

    constructor(
        repoImplementacion: ITrabajoRepo,
        paisImplementacion: IServicioPais,
        estadoImplementacion: IServicioEstado,
        ciudadImplementacion: IServicioCiudad
    ) {
        this.RepoTrabajo = repoImplementacion;
        this.servicioPais = paisImplementacion;
        this.servicioEstado = estadoImplementacion;
        this.servicioCiudad = ciudadImplementacion;
    }

    //Query
    public async ejecutar(
        identificador: SolicitudTrabajoDTO
    ): Promise<Resultado<TrabajoEmpresaResumidoDTO>> {
        //Llamamos al repositorio
        const trabajosEmpresaOrError =
            await this.RepoTrabajo.obtenerDetalleTrabajo(identificador);
        if (trabajosEmpresaOrError.esFallido)
            return Resultado.falla<any>(trabajosEmpresaOrError.error);

        let trabajoDTO = trabajosEmpresaOrError.getValue();

        //Obtener nombre pais
        if (
            trabajoDTO.hasOwnProperty("uuidPais") &&
            trabajoDTO.uuidPais != undefined
        ) {
            const respuestaServicio = await this.obtenerPaisNombre({
                uuidPais: trabajoDTO.uuidPais,
            });
            if (respuestaServicio.esFallido)
                return Resultado.falla<any>(respuestaServicio.error);
            trabajoDTO.nombrePais = respuestaServicio.getValue().nombrePais;
        }

        //Obtener nombre estado
        if (
            trabajoDTO.hasOwnProperty("uuidEstado") &&
            trabajoDTO.uuidEstado != undefined
        ) {
            const respuestaServicio = await this.obtenerEstadoNombre({
                idPais: <string>trabajoDTO.uuidPais,
                idEstado: trabajoDTO.uuidEstado,
            });
            if (respuestaServicio.esFallido)
                return Resultado.falla<any>(respuestaServicio.error);
            trabajoDTO.nombreEstado = respuestaServicio.getValue().nombreEstado;
        }

        //Obtener nombre ciudad
        if (
            trabajoDTO.hasOwnProperty("uuidCiudad") &&
            trabajoDTO.uuidCiudad != undefined
        ) {
            const respuestaServicio = await this.obtenerCiudadNombre({
                idEstado: <string>trabajoDTO.uuidEstado,
                idCiudad: trabajoDTO.uuidCiudad,
            });
            if (respuestaServicio.esFallido)
                return Resultado.falla<any>(respuestaServicio.error);
            trabajoDTO.nombreCiudad = respuestaServicio.getValue().nombreCiudad;
        }

        //Convertimos a dominio
        const trabajoDetalleOrError = TrabajoEmpresaMapeador.aDominio(
            trabajosEmpresaOrError.getValue()
        );
        if (trabajoDetalleOrError.esFallido)
            return Resultado.falla<any>(trabajoDetalleOrError.error);

        //Respondo segun estandar DTO
        const respuestaOrError = TrabajoEmpresaMapeador.aDTOResumido(
            trabajoDetalleOrError.getValue()
        );

        if (respuestaOrError.esFallido)
            return Resultado.falla<any>(respuestaOrError.error);

        return Resultado.ok<TrabajoEmpresaResumidoDTO>(
            respuestaOrError.getValue()
        );
    }

    private async obtenerPaisNombre(
        dto: SolicitudPaisDTO
    ): Promise<Resultado<PaisDTO>> {
        const respuestaDTO = await this.servicioPais.obtenerPais(dto);
        if (respuestaDTO.esFallido)
            return Resultado.falla<any>(respuestaDTO.error);

        return Resultado.ok<PaisDTO>(respuestaDTO.getValue());
    }

    private async obtenerEstadoNombre(
        dto: SolicitudEstadoUnicoDTO
    ): Promise<Resultado<EstadoDTO>> {
        const respuestaDTO = await this.servicioEstado.obtenerEstado(dto);
        if (respuestaDTO.esFallido)
            return Resultado.falla<any>(respuestaDTO.error);

        return Resultado.ok<EstadoDTO>(respuestaDTO.getValue());
    }

    private async obtenerCiudadNombre(
        dto: SolicitudCiudadUnicaDTO
    ): Promise<Resultado<CiudadDTO>> {
        const respuestaDTO = await this.servicioCiudad.obtenerCiudad(dto);
        if (respuestaDTO.esFallido)
            return Resultado.falla<any>(respuestaDTO.error);

        return Resultado.ok<CiudadDTO>(respuestaDTO.getValue());
    }
}
