import { CiudadDTO } from "../../aplicacion/dto.geografico/CiudadDTO";
import {
    IServicioCiudad,
    SolicitudCiudadUnicaDTO,
} from "../../aplicacion/IServicioCiudad";
import { SolicitudCiudadDTO } from "../../aplicacion/casosDeUso.geografico/ObtenerCiudades.cu";
import { Resultado } from "../../dominio/resultado";
import {
    LISTADO_CIUDADES_ANTIOQUIA,
    LISTADO_CIUDADES_ARAUCA,
    LISTADO_CIUDADES_DISTRITO,
    LISTADO_CIUDADES_FLORIDA,
    LISTADO_CIUDADES_GEORGIA,
    LISTADO_CIUDADES_ZULIA,
} from "./respuestas/ListadoCiudades";
import { OPERACION_FALLIDA } from "../../aplicacion/dto.respuestaOperaciones/OperacionFallida";

export class JSONCiudadServicio implements IServicioCiudad {
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
            //Obtenemos de persitencia
            if (id.idEstado == "00000000-0000-0000-C000-000000000051")
                resolve(Resultado.ok<CiudadDTO[]>(LISTADO_CIUDADES_DISTRITO));
            if (id.idEstado == "00000000-0000-0000-C000-000000000052")
                resolve(Resultado.ok<CiudadDTO[]>(LISTADO_CIUDADES_ZULIA));

            if (id.idEstado == "00000000-0000-0000-C000-000000000041")
                resolve(Resultado.ok<CiudadDTO[]>(LISTADO_CIUDADES_GEORGIA));

            if (id.idEstado == "00000000-0000-0000-C000-000000000042")
                resolve(Resultado.ok<CiudadDTO[]>(LISTADO_CIUDADES_FLORIDA));

            if (id.idEstado == "00000000-0000-0000-C000-000000000031")
                resolve(Resultado.ok<CiudadDTO[]>(LISTADO_CIUDADES_ARAUCA));

            if (id.idEstado == "00000000-0000-0000-C000-000000000032")
                resolve(Resultado.ok<CiudadDTO[]>(LISTADO_CIUDADES_ANTIOQUIA));
            resolve(Resultado.falla<any>(OPERACION_FALLIDA));
        });
    }
}
