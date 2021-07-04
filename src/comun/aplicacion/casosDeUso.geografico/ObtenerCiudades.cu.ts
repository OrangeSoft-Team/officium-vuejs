import { CiudadMapeador } from "../mapeador/Ciudad.mapaeador";
import { CasoUso } from "../casoUso";
import { Resultado } from "../../dominio/resultado";
import { CiudadDTO } from "../dto.geografico/CiudadDTO";
import { IServicioCiudad } from "../IServicioCiudad";

export interface SolicitudCiudadDTO {
    idEstado: string;
}

export class ObtenerCiudades
    implements CasoUso<SolicitudCiudadDTO, Resultado<CiudadDTO[]>>
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
        let ciudadesOrError = await this.ServicioCiudad.obtenerCiudades(
            solicitud
        );
        if (ciudadesOrError.esFallido)
            return Resultado.falla<any>(ciudadesOrError.error);

        //Convertimos a dominio array
        let conjuntoCiudadesOrError = CiudadMapeador.aDominioConjunto(
            ciudadesOrError.getValue()
        );
        if (conjuntoCiudadesOrError.esFallido)
            return Resultado.falla<any>(conjuntoCiudadesOrError.error);

        //Respondo con un arreglo segun estandar DTO
        let ConjuntoRespuestaOrError = CiudadMapeador.aDTOConjunto(
            conjuntoCiudadesOrError.getValue()
        );

        if (ConjuntoRespuestaOrError.esFallido)
            return Resultado.falla<any>(ConjuntoRespuestaOrError.error);

        return Resultado.ok<CiudadDTO[]>(ConjuntoRespuestaOrError.getValue());
    }
}
