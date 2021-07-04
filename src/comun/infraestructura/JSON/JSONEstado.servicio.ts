import { EstadoDTO } from "../../aplicacion/dto.geografico/EstadoDTO";
import { IServicioEstado } from "../../aplicacion/IServicioEstado";
import { SolicitudEstadoDTO } from "../../aplicacion/casosDeUso.geografico/ObtenerEstados.cu";
import { Resultado } from "../../dominio/resultado";
import { 
    LISTADO_ESTADO_VENEZUELA,
    LISTADO_ESTADO_COLOMBIA,
    LISTADO_ESTADO_USA
} from "./respuestas/ListadoEstado";

export class JSONEstadoServicio implements IServicioEstado {

    obtenerEstados(
        id: SolicitudEstadoDTO
    ): Resultado<EstadoDTO[]> {
        //let DATOS_RESPUESTA: EstadoDTO[] = [];

        //Obtenemos de persitencia
        if(id.idEstado == "00000000-0000-0000-C000-000000000046")
            return Resultado.ok<EstadoDTO[]>(LISTADO_ESTADO_VENEZUELA);
        else if (id.idEstado == "00000000-0000-0000-C000-000000000040")
            return Resultado.ok<EstadoDTO[]>(LISTADO_ESTADO_USA);
        else
            return Resultado.ok<EstadoDTO[]>(LISTADO_ESTADO_COLOMBIA);
    }

}
