import { PaisDTO } from "../../aplicacion/dto.geografico/PaisDTO";
import { IServicioPais } from "../../aplicacion/IServicioPais";
import { Resultado } from "../../dominio/resultado";
import { LISTADO_PAISES } from "./respuestas/ListadoPais";

export class JSONPaisServicio implements IServicioPais {
    obtenerPaises(): Resultado<PaisDTO[]> {
        //Hacemos peticion a Backend

        //Respondemos
        return Resultado.ok<PaisDTO[]>(LISTADO_PAISES);
    }
}
