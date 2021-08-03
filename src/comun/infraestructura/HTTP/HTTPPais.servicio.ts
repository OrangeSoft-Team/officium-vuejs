import axios from "axios";
import { PaisDTO } from "../../aplicacion/dto.geografico/PaisDTO";
import { OPERACION_FALLIDA } from "../../aplicacion/dto.respuestaOperaciones/OperacionFallida";
import {
    IServicioPais,
    SolicitudPaisDTO,
} from "../../aplicacion/IServicioPais";
import { Resultado } from "../../dominio/resultado";
import { NEST_URL_BASE } from "../../../main";

export class HTTPPaisServicio implements IServicioPais {
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
        //Hacemos peticion a Backend
        return new Promise((resolve, reject) => {
            axios
                .get(NEST_URL_BASE + "ubicacion/paises/", {
                    withCredentials: true,
                })
                .then((res) => {
                    resolve(Resultado.ok<PaisDTO[]>(res.data));
                })
                .catch((e) => {
                    resolve(Resultado.falla<any>(e));
                });
        });
    }
}
