import { Entidad } from "../entidad";
import { Resultado } from "../resultado";
import { Identificador } from "../valueObjects/Identificador";
import { NombreMunicipio } from "../valueObjects/nombreMunicipio";

interface MunicipioProps {
    idPais: Identificador;
    nombreMunicipio?: NombreMunicipio;
}

export class Municipio extends Entidad<MunicipioProps> {
    public static crear(props: MunicipioProps): Resultado<Municipio> {
        if (
            props.hasOwnProperty("nombreMunicipio") &&
            props.nombreMunicipio != undefined
        ) {
            let nombreOrError = NombreMunicipio.crear(props.nombreMunicipio.valor());
            if (nombreOrError.esFallido)
                return Resultado.falla<any>(nombreOrError.error);
        }
            
        let idOrError = Identificador.crear(props.idPais.valor());
        if (idOrError.esFallido)
            return Resultado.falla<any>(idOrError.error);

        return Resultado.ok<Municipio>(new Municipio(props));
    }
}
