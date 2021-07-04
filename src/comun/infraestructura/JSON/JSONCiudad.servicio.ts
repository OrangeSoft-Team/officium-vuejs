import { CiudadDTO } from "../../aplicacion/dto.geografico/CiudadDTO";
import { IServicioCiudad } from "../../aplicacion/IServicioCiudad";
import { SolicitudCiudadDTO } from "../../aplicacion/casosDeUso.geografico/ObtenerCiudades.cu";
import { Resultado } from "../../dominio/resultado";
import { 
    LISTADO_CIUDADES_DISTRITO,
    LISTADO_CIUDADES_ZULIA
} from "./respuestas/ListadoCiudades";

export class JSONCiudadServicio implements IServicioCiudad {

    obtenerCiudades(
        id: SolicitudCiudadDTO
    ): Resultado<CiudadDTO[]> {
        //let DATOS_RESPUESTA: CiudadDTO[] = [];

        //Obtenemos de persitencia
        if(id.idCiudad == "00000000-0000-0000-C000-000000000047")
            return Resultado.ok<CiudadDTO[]>(LISTADO_CIUDADES_DISTRITO);
        else
            return Resultado.ok<CiudadDTO[]>(LISTADO_CIUDADES_ZULIA);
    }

}
