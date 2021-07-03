import { PaisMapeador } from "../mapeador/Pais.mapeador";
import { CasoUso } from "../casoUso";
import { Resultado } from "../../dominio/resultado";
import { PaisDTO } from "../dto.geografico/PaisDTO";
import { IServicioPais } from "../IServicioPais";


export class ObtenerPais
    implements
        CasoUso<
            null,
            Resultado<PaisDTO[]>
        >
{
    //Repositorio
    private ServicioPais: IServicioPais;

    constructor(RepoImplementacion: IServicioPais) {
        this.ServicioPais = RepoImplementacion;
    }

    //Query
    public async ejecutar(): Promise<Resultado<PaisDTO[]>> {
        //Llamamos al repositorio
        let ofertasLaboralesActivasOrError =
            await this.ServicioPais.obtenerPaises();
        if (ofertasLaboralesActivasOrError.esFallido)
            return Resultado.falla<any>(ofertasLaboralesActivasOrError.error);

        //Convertimos a dominio array
        let conjutoOfertasOrError = PaisMapeador.aDominioConjunto(
            ofertasLaboralesActivasOrError.getValue()
        );
        if (conjutoOfertasOrError.esFallido)
            return Resultado.falla<any>(conjutoOfertasOrError.error);

        //Respondo con un arreglo segun estandar DTO
        let ConjuntoRespuestaOrError = PaisMapeador.aDTOConjunto(
            conjutoOfertasOrError.getValue()
        );

        if (ConjuntoRespuestaOrError.esFallido)
            return Resultado.falla<any>(ConjuntoRespuestaOrError.error);

        return Resultado.ok<PaisDTO[]>(
            ConjuntoRespuestaOrError.getValue()
        );
    }
}
