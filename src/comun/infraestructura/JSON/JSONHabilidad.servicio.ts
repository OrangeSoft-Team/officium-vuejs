import { HabilidadDTO } from "../../aplicacion/dtos/HabilidadDTO";
import { IServicioHabilidades } from "../../aplicacion/IServicioHabilidades";
import { Resultado } from "../../dominio/resultado";
import { LISTADO_HABILIDADES } from "./respuestas/ListadoHabilidades";

export class JSONHabilidadServicio implements IServicioHabilidades {
    obtenerHabilidades(): Promise<Resultado<HabilidadDTO[]>> {
        return new Promise((resolve, reject) => {
            //Hacemos peticion a Backend

            //Respondemos
            return resolve(Resultado.ok<HabilidadDTO[]>(LISTADO_HABILIDADES));
        });
    }
}
