import { HabilidadDTO } from "../../aplicacion/dtos/HabilidadDTO";
import { IServicioHabilidades } from "../../aplicacion/IServicioHabilidades";
import { Resultado } from "../../dominio/resultado";
import { LISTADO_HABILIDADES } from "./respuestas/ListadoHabilidades";

export class JSONHabilidadServicio implements IServicioHabilidades {
    obtenerHabilidades(): Resultado<HabilidadDTO[]> {
        //Hacemos peticion a Backend

        //Respondemos
        return Resultado.ok<HabilidadDTO[]>(LISTADO_HABILIDADES);
    }
}
