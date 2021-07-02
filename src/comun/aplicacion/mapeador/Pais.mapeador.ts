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
        if (dto.hasOwnProperty("nombrePais")) {
            nombrePaisOrError = NombrePais.crear(dto.nombrePais);
            if (nombrePaisOrError.esFallido)
                return Resultado.falla<any>(nombrePaisOrError.error);

            //Agregamos al ser valido
            paisProps.nombrePais = nombrePaisOrError.getValue();
        }

        //Devolvemos entidad
        return Resultado.ok<Pais>(Pais.crear(paisProps).getValue());
    }
}
