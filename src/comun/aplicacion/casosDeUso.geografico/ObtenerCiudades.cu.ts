import { CiudadMapeador } from "../mapeador/Ciudad.mapaeador";
import { CasoUso } from "../casoUso";
import { Resultado } from "../../dominio/resultado";
import { CiudadDTO } from "../dto.geografico/CiudadDTO";
import { IServicioCiudad } from "../IServicioCiudad";

export interface SolicitudCiudadDTO {
    idCiudad: string;
}


export class ObtenerOfertaLaboral
    implements
        CasoUso<SolicitudCiudadDTO, 
        Resultado<CiudadDTO[]>>
{
    //Repositorio
    private ServicioCiudad: IServicioCiudad;

    constructor(RepoImplementacion: IServicioCiudad) {
        this.ServicioCiudad = RepoImplementacion;
    }

    //Query
    public async ejecutar(
        solicitud: SolicitudCiudadDTO
    ): Promise<Resultado<CiudadDTO[]>> {
        //Llamamos al repositorio
        let ofertasLaboralesActivasOrError =
            await this.ServicioCiudad.obtenerCiudades(
                solicitud
            );
        if (ofertasLaboralesActivasOrError.esFallido)
            return Resultado.falla<any>(ofertasLaboralesActivasOrError.error);

        //Convertimos a dominio array
        let conjutoOfertasOrError = CiudadMapeador.aDominioConjunto(
            ofertasLaboralesActivasOrError.getValue()
        );
        if (conjutoOfertasOrError.esFallido)
            return Resultado.falla<any>(conjutoOfertasOrError.error);

        //Respondo con un arreglo segun estandar DTO
        let ConjuntoRespuestaOrError = CiudadMapeador.aDTOConjunto(
            conjutoOfertasOrError.getValue()
        );

        if (ConjuntoRespuestaOrError.esFallido)
            return Resultado.falla<any>(ConjuntoRespuestaOrError.error);

        return Resultado.ok<CiudadDTO[]>(ConjuntoRespuestaOrError.getValue());
    }
}
