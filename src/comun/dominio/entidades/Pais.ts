import { Entidad } from "..//entidad";
import { Resultado } from "..//resultado";
import { Identificador } from "../valueObjects/Identificador";
import { NombrePais } from "../valueObjects/nombrePais";

interface PaisProps {
    idPais: Identificador;
    nombrePais?: NombrePais;
}

export class Pais extends Entidad<PaisProps> {
    public static crear(props: PaisProps): Resultado<Pais> {
        if (
            props.hasOwnProperty("nombrePais") &&
            props.nombrePais != undefined
        ) {
            let nombreOrError = NombrePais.crear(props.nombrePais.valor());
            if (nombreOrError.esFallido)
                return Resultado.falla<any>(nombreOrError.error);
        }
            
        let idOrError = Identificador.crear(props.idPais.valor());
        if (idOrError.esFallido)
            return Resultado.falla<any>(idOrError.error);

        return Resultado.ok<Pais>(new Pais(props));
    }
}
