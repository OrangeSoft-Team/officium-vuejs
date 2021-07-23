import { HabilidadMapeador } from "../mapeador/Habilidad.mapeador";
import { CasoUso } from "../casoUso";
import { Resultado } from "../../dominio/resultado";
import { HabilidadDTO } from "../dtos/HabilidadDTO";
import { IServicioHabilidades } from "../IServicioHabilidades";

export class obtenerHabilidades
    implements CasoUso<null, Resultado<HabilidadDTO[]>>
{
    //Repositorio
    private ServicioHabilidad: IServicioHabilidades;

    constructor(RepoImplementacion: IServicioHabilidades) {
        this.ServicioHabilidad = RepoImplementacion;
    }

    //Query
    public async ejecutar(): Promise<Resultado<HabilidadDTO[]>> {
        //Llamamos al repositorio
        let habOrError = await this.ServicioHabilidad.obtenerHabilidades();
        if (habOrError.esFallido) return Resultado.falla<any>(habOrError.error);

        //Convertimos a dominio array
        let conjutoOfertasOrError = HabilidadMapeador.aDominioConjunto(
            habOrError.getValue()
        );
        if (conjutoOfertasOrError.esFallido)
            return Resultado.falla<any>(conjutoOfertasOrError.error);

        //Respondo con un arreglo segun estandar DTO
        let ConjuntoRespuestaOrError = HabilidadMapeador.aDTOConjunto(
            conjutoOfertasOrError.getValue()
        );

        if (ConjuntoRespuestaOrError.esFallido)
            return Resultado.falla<any>(ConjuntoRespuestaOrError.error);

        return Resultado.ok<HabilidadDTO[]>(
            ConjuntoRespuestaOrError.getValue()
        );
    }
}
