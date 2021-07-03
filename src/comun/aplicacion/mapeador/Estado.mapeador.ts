import { Estado, EstadoProps } from "../../dominio/entidades/Estado";
import { Resultado } from "../../dominio/resultado";
import { Identificador } from "../../dominio/valueObjects/Identificador";
import { NombreEstado } from "../../dominio/valueObjects/nombreEstado";
import { EstadoDTO } from "../dto.geografico/EstadoDTO";

export class EstadoMapeador {
    public static aDominio(dto: EstadoDTO): Resultado<Estado> {
        let identificadorEstadoOrError = Identificador.crear(dto.uuidEstado);
        if (identificadorEstadoOrError.esFallido)
            return Resultado.falla<any>(identificadorEstadoOrError.error);

        //Propiedades de la entidad
        let estadoProps: EstadoProps = {
            idEstado: identificadorEstadoOrError.getValue(),
        };

        //Opcional
        let nombreEstadoOrError: Resultado<NombreEstado>;
        if (dto.hasOwnProperty("nombreEstado") && dto.nombreEstado != undefined) {
            nombreEstadoOrError = NombreEstado.crear(dto.nombreEstado);
            if (nombreEstadoOrError.esFallido)
                return Resultado.falla<any>(nombreEstadoOrError.error);

            //Agregamos al ser valido
            estadoProps.nombreEstado = nombreEstadoOrError.getValue();
        }

        //Devolvemos entidad
        return Resultado.ok<Estado>(Estado.crear(estadoProps).getValue());
    }
}
