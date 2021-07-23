import { Direccion, DireccionProps } from "../../dominio/entidades/Direccion";
import { Resultado } from "../../dominio/resultado";
import { Identificador } from "../../dominio/valueObjects/Identificador";
import { DireccionCalle } from "../../dominio/valueObjects/direccionCalle";
import { codigoPostal } from "../../dominio/valueObjects/codigoPostal";
import { DireccionDTO } from "../dtos/DireccionDTO";

export class DireccionMapeador {
    public static aDominio(dto: DireccionDTO): Resultado<Direccion> {
        let calleUnoOrError = DireccionCalle.crear(dto.calleUno);
        if (calleUnoOrError.esFallido)
            return Resultado.falla<any>(calleUnoOrError.error);
        let codigoPostalOrError = codigoPostal.crear(dto.codigoPostal);
        if (codigoPostalOrError.esFallido)
            return Resultado.falla<any>(codigoPostalOrError.error);

        //Propiedades de la entidad
        let direccionProps: DireccionProps = {
            calleUno: calleUnoOrError.getValue(),
            codigoPostal: codigoPostalOrError.getValue(),
        };

        //Opcional
        let calleDosOrError: Resultado<DireccionCalle>;
        if (dto.hasOwnProperty("calleDos") && dto.calleDos != undefined) {
            calleDosOrError = DireccionCalle.crear(dto.calleDos);
            if (calleDosOrError.esFallido)
                return Resultado.falla<any>(calleDosOrError.error);

            //Agregamos al ser valido
            direccionProps.calleDos = calleDosOrError.getValue();
        }
        let idDireccionOrError: Resultado<Identificador>;
        if (dto.hasOwnProperty("id") && dto.id != undefined) {
            idDireccionOrError = Identificador.crear(dto.id);
            if (idDireccionOrError.esFallido)
                return Resultado.falla<any>(idDireccionOrError.error);

            //Agregamos al ser valido
            direccionProps.id = idDireccionOrError.getValue();
        }

        //Devolvemos entidad
        return Resultado.ok<Direccion>(Direccion.crear(direccionProps).getValue());
    }
    
    public static aDTO(entidad: Direccion): Resultado<DireccionDTO> {
        //Extraemos valores de la entidad
        let propsDTO: DireccionDTO = {
            calleUno: entidad.props.calleUno.valor(),
            codigoPostal: entidad.props.codigoPostal.valor(),
        };

        //Opcionales
        if (entidad.props.hasOwnProperty("calleDos") && entidad.props.calleDos != undefined) {
            propsDTO.calleDos = entidad.props.calleDos.valor();
        }
        if (entidad.props.hasOwnProperty("id") && entidad.props.id != undefined) {
            propsDTO.id = entidad.props.id.valor();
        }

        return Resultado.ok<DireccionDTO>(propsDTO);
    }
}
