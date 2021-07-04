import { Pais, PaisProps } from "../../dominio/entidades/Pais";
import { Resultado } from "../../dominio/resultado";
import { Identificador } from "../../dominio/valueObjects/Identificador";
import { NombrePais } from "../../dominio/valueObjects/nombrePais";
import { PaisDTO } from "../dto.geografico/PaisDTO";

export class PaisMapeador {
    public static aDominio(dto: PaisDTO): Resultado<Pais> {
        let identificadorPaisOrError = Identificador.crear(dto.uuidPais);
        if (identificadorPaisOrError.esFallido)
            return Resultado.falla<any>(identificadorPaisOrError.error);

        //Propiedades de la entidad
        let paisProps: PaisProps = {
            idPais: identificadorPaisOrError.getValue(),
        };

        //Opcional
        let nombrePaisOrError: Resultado<NombrePais>;
        if (dto.hasOwnProperty("nombrePais") && dto.nombrePais != undefined) {
            nombrePaisOrError = NombrePais.crear(dto.nombrePais);
            if (nombrePaisOrError.esFallido)
                return Resultado.falla<any>(nombrePaisOrError.error);

            //Agregamos al ser valido
            paisProps.nombrePais = nombrePaisOrError.getValue();
        }

        //Devolvemos entidad
        return Resultado.ok<Pais>(Pais.crear(paisProps).getValue());
    }
    
    public static aDTO(entidad: Pais): Resultado<PaisDTO> {
        //Extraemos valores de la entidad
        let propsDTO: PaisDTO = {
            uuidPais: entidad.props.idPais.valor(),
        };

        //Opcionales
        if (entidad.props.hasOwnProperty("nombrePais") && entidad.props.nombrePais != undefined) {
            propsDTO.nombrePais = entidad.props.nombrePais.valor();
        }

        return Resultado.ok<PaisDTO>(propsDTO);
    }

    
    public static aDominioConjunto(
        dtos: PaisDTO[]
    ): Resultado<Pais[]> {
        //Convertimos a dominio array
        let arrayPaises: Pais[] = [];

        for (let oferta of dtos) {
            let paisOrError =
            PaisMapeador.aDominio(oferta);
            //En caso de fallo
            if (paisOrError.esFallido) {
                return Resultado.falla<any>(paisOrError.error);
            }

            //En caso de ser valido
            arrayPaises.push(paisOrError.getValue());
        }

        return Resultado.ok<Pais[]>(arrayPaises);
    }

    public static aDTOConjunto(
        entidades: Pais[]
    ): Resultado<PaisDTO[]> {
        //Array auxiliar
        let arrayPaises: PaisDTO[] = [];

        for (let oferta of entidades) {
            let ofertaDTOOrError = PaisMapeador.aDTO(oferta);

            if (ofertaDTOOrError.esFallido)
                return Resultado.falla<any>(ofertaDTOOrError.error);

                arrayPaises.push(ofertaDTOOrError.getValue());
        }

        return Resultado.ok<PaisDTO[]>(
            arrayPaises
        );
    }

}
