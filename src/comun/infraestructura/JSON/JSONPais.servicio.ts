import { PaisDTO } from "../../aplicacion/dto.geografico/PaisDTO";
import { OPERACION_FALLIDA } from "../../aplicacion/dto.respuestaOperaciones/OperacionFallida";
import {
    IServicioPais,
    SolicitudPaisDTO,
} from "../../aplicacion/IServicioPais";
import { Resultado } from "../../dominio/resultado";
import { LISTADO_PAISES } from "./respuestas/ListadoPais";

export class JSONPaisServicio implements IServicioPais {
    obtenerPais(solicitud: SolicitudPaisDTO): Promise<Resultado<PaisDTO>> {
        return new Promise(async (resolve, reject) => {
            const respuestaPaises: Resultado<PaisDTO[]> =
                await this.obtenerPaises();
            if (respuestaPaises.esFallido)
                return resolve(Resultado.falla<any>(respuestaPaises.error));

            for (let pais of respuestaPaises.getValue()) {
                if (pais.uuidPais == solicitud.uuidPais) {
                    resolve(Resultado.ok<PaisDTO>(pais));
                }
            }

            resolve(Resultado.falla<any>(OPERACION_FALLIDA));
        });
    }
    obtenerPaises(): Promise<Resultado<PaisDTO[]>> {
        return new Promise((resolve, reject) => {
            //Hacemos peticion a Backend

            //Respondemos
            resolve(Resultado.ok<PaisDTO[]>(LISTADO_PAISES));
        });
    }
}
