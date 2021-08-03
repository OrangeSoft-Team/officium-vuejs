import { CiudadDTO } from "../../aplicacion/dto.geografico/CiudadDTO";
import {
    IServicioCiudad,
    SolicitudCiudadUnicaDTO,
} from "../../aplicacion/IServicioCiudad";
import { SolicitudCiudadDTO } from "../../aplicacion/casosDeUso.geografico/ObtenerCiudades.cu";
import { Resultado } from "../../dominio/resultado";

import { OPERACION_FALLIDA } from "../../aplicacion/dto.respuestaOperaciones/OperacionFallida";
import axios from "axios";
import { NEST_URL_BASE } from "../../../main";

export class HTTPCiudadServicio implements IServicioCiudad {
    obtenerCiudad(
        solicitud: SolicitudCiudadUnicaDTO
    ): Promise<Resultado<CiudadDTO>> {
        return new Promise(async (resolve, reject) => {
            const respuestaCiudades: Resultado<CiudadDTO[]> =
                await this.obtenerCiudades({
                    idEstado: solicitud.idEstado,
                });
            if (respuestaCiudades.esFallido)
                resolve(Resultado.falla<any>(respuestaCiudades.error));

            for (let ciudad of respuestaCiudades.getValue()) {
                if (ciudad.uuidCiudad == solicitud.idCiudad) {
                    resolve(Resultado.ok<CiudadDTO>(ciudad));
                }
            }

            resolve(Resultado.falla<any>(OPERACION_FALLIDA));
        });
    }
    obtenerCiudades(id: SolicitudCiudadDTO): Promise<Resultado<CiudadDTO[]>> {
        //let DATOS_RESPUESTA: CiudadDTO[] = [];
        return new Promise((resolve, reject) => {
            axios
                .get(
                    NEST_URL_BASE +
                        "ubicacion/paises/1/estados" +
                        id.idEstado +
                        "/ciudades"
                )
                .then((res) => {
                    resolve(Resultado.ok<CiudadDTO[]>(res.data));
                })
                .catch((e) => {
                    resolve(Resultado.falla<any>(e));
                });
        });
    }
}
