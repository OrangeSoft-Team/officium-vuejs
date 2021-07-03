import { Ciudad, CiudadProps } from "../../dominio/entidades/Ciudad";
import { Resultado } from "../../dominio/resultado";
import { Identificador } from "../../dominio/valueObjects/Identificador";
import { NombreCiudad } from "../../dominio/valueObjects/nombreCiudad";
import { CiudadDTO } from "../dto.geografico/CiudadDTO";

export class CiudadMapeador {
    public static aDominio(dto: CiudadDTO): Resultado<Ciudad> {
        let identificadorCiudadOrError = Identificador.crear(dto.uuidCiudad);
        if (identificadorCiudadOrError.esFallido)
            return Resultado.falla<any>(identificadorCiudadOrError.error);

        //Propiedades de la entidad
        let ciudadProps: CiudadProps = {
            idCiudad: identificadorCiudadOrError.getValue(),
        };

        //Opcional
        let nombreCiudadOrError: Resultado<NombreCiudad>;
        if (dto.hasOwnProperty("nombreCiudad") && dto.nombreCiudad != undefined) {
            nombreCiudadOrError = NombreCiudad.crear(dto.nombreCiudad);
            if (nombreCiudadOrError.esFallido)
                return Resultado.falla<any>(nombreCiudadOrError.error);

            //Agregamos al ser valido
            ciudadProps.nombreCiudad = nombreCiudadOrError.getValue();
        }

        //Devolvemos entidad
        return Resultado.ok<Ciudad>(Ciudad.crear(ciudadProps).getValue());
    }
    
    public static aDTO(entidad: Ciudad): Resultado<CiudadDTO> {
        //Extraemos valores de la entidad
        let propsDTO: CiudadDTO = {
            uuidCiudad: entidad.props.idCiudad.valor(),
        };

        //Opcionales
        if (entidad.props.hasOwnProperty("nombreCiudad") && entidad.props.nombreCiudad != undefined) {
            propsDTO.nombreCiudad = entidad.props.nombreCiudad.valor();
        }

        return Resultado.ok<CiudadDTO>(propsDTO);
    }
}
