import { EstadoMapeador } from "../mapeador/Estado.mapeador";
import { CasoUso } from "../casoUso";
import { Resultado } from "../../dominio/resultado";
import { EstadoDTO } from "../dto.geografico/EstadoDTO";
import { IServicioEstado } from "../IServicioEstado";

export interface SolicitudEstadoDTO {
    idEstado: string;
}


export class ObtenerEstados
    implements
        CasoUso<SolicitudEstadoDTO, 
        Resultado<EstadoDTO[]>>
{
    //Repositorio
    private ServicioEstado: IServicioEstado;

    constructor(RepoImplementacion: IServicioEstado) {
        this.ServicioEstado = RepoImplementacion;
    }

    //Query
    public async ejecutar(
        solicitud: SolicitudEstadoDTO
    ): Promise<Resultado<EstadoDTO[]>> {
        //Llamamos al repositorio
        let estadosOrError =
            await this.ServicioEstado.obtenerEstados(
                solicitud
            );
        if (estadosOrError.esFallido)
            return Resultado.falla<any>(estadosOrError.error);

        //Convertimos a dominio array
        let conjuntoEstadosOrError = EstadoMapeador.aDominioConjunto(
            estadosOrError.getValue()
        );
        if (conjuntoEstadosOrError.esFallido)
            return Resultado.falla<any>(conjuntoEstadosOrError.error);

        //Respondo con un arreglo segun estandar DTO
        let ConjuntoRespuestaOrError = EstadoMapeador.aDTOConjunto(
            conjuntoEstadosOrError.getValue()
        );

        if (ConjuntoRespuestaOrError.esFallido)
            return Resultado.falla<any>(ConjuntoRespuestaOrError.error);

        return Resultado.ok<EstadoDTO[]>(ConjuntoRespuestaOrError.getValue());
    }
}
