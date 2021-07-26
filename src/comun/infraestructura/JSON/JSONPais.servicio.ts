import { PaisDTO } from "../../aplicacion/dto.geografico/PaisDTO";
import { OPERACION_FALLIDA } from "../../aplicacion/dto.respuestaOperaciones/OperacionFallida";
import {
    IServicioPais,
    SolicitudPaisDTO,
} from "../../aplicacion/IServicioPais";
import { Resultado } from "../../dominio/resultado";
import { LISTADO_PAISES } from "./respuestas/ListadoPais";

export class JSONPaisServicio implements IServicioPais {
    obtenerPais(solicitud: SolicitudPaisDTO): Resultado<PaisDTO> {
        const respuestaPaises: Resultado<PaisDTO[]> = this.obtenerPaises();
        if (respuestaPaises.esFallido)
            return Resultado.falla<any>(respuestaPaises.error);

        for (let pais of respuestaPaises.getValue()) {
            if (pais.uuidPais == solicitud.uuidPais) {
                return Resultado.ok<PaisDTO>(pais);
            }
        }

        return Resultado.falla<any>(OPERACION_FALLIDA);
    }
    obtenerPaises(): Resultado<PaisDTO[]> {
        //Hacemos peticion a Backend

        //Respondemos
        return Resultado.ok<PaisDTO[]>(LISTADO_PAISES);
    }
}
