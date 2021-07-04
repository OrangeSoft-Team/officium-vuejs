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
        let ofertasLaboralesActivasOrError =
            await this.ServicioEstado.obtenerEstados(
                solicitud
            );
        if (ofertasLaboralesActivasOrError.esFallido)
            return Resultado.falla<any>(ofertasLaboralesActivasOrError.error);

        //Convertimos a dominio array
        let conjutoOfertasOrError = EstadoMapeador.aDominioConjunto(
            ofertasLaboralesActivasOrError.getValue()
        );
        if (conjutoOfertasOrError.esFallido)
            return Resultado.falla<any>(conjutoOfertasOrError.error);

        //Respondo con un arreglo segun estandar DTO
        let ConjuntoRespuestaOrError = EstadoMapeador.aDTOConjunto(
            conjutoOfertasOrError.getValue()
        );

        if (ConjuntoRespuestaOrError.esFallido)
            return Resultado.falla<any>(ConjuntoRespuestaOrError.error);

        return Resultado.ok<EstadoDTO[]>(ConjuntoRespuestaOrError.getValue());
    }
}
