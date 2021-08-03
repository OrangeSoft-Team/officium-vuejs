import axios from "axios";
import { HabilidadDTO } from "../../aplicacion/dtos/HabilidadDTO";
import { IServicioHabilidades } from "../../aplicacion/IServicioHabilidades";
import { Resultado } from "../../dominio/resultado";
import { NEST_URL_BASE } from "../../../main";

export class HTTPHabilidadServicio implements IServicioHabilidades {
    obtenerHabilidades(): Promise<Resultado<HabilidadDTO[]>> {
        return new Promise((resolve, reject) => {
            //Hacemos peticion a Backend
            axios
                .get(NEST_URL_BASE + "habilidades", { withCredentials: true })
                .then((res) => {
                    //Respondemos
                    resolve(Resultado.ok<HabilidadDTO[]>(res.data));
                })
                .catch((e) => {
                    resolve(Resultado.falla<any>(e));
                });
        });
    }
}
