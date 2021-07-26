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
    obtenerCiudad(solicitud: SolicitudCiudadUnicaDTO): Resultado<CiudadDTO> {
        const respuestaCiudades: Resultado<CiudadDTO[]> = this.obtenerCiudades({
            idEstado: solicitud.idEstado,
        });
        if (respuestaCiudades.esFallido)
            return Resultado.falla<any>(respuestaCiudades.error);

        for (let ciudad of respuestaCiudades.getValue()) {
            if (ciudad.uuidCiudad == solicitud.idCiudad) {
                return Resultado.ok<CiudadDTO>(ciudad);
            }
        }

        return Resultado.falla<any>(OPERACION_FALLIDA);
    }
    obtenerCiudades(id: SolicitudCiudadDTO): Resultado<CiudadDTO[]> {
        //let DATOS_RESPUESTA: CiudadDTO[] = [];

        //Obtenemos de persitencia
        if (id.idEstado == "00000000-0000-0000-C000-000000000051")
            return Resultado.ok<CiudadDTO[]>(LISTADO_CIUDADES_DISTRITO);

        if (id.idEstado == "00000000-0000-0000-C000-000000000052")
            return Resultado.ok<CiudadDTO[]>(LISTADO_CIUDADES_ZULIA);

        if (id.idEstado == "00000000-0000-0000-C000-000000000041")
            return Resultado.ok<CiudadDTO[]>(LISTADO_CIUDADES_GEORGIA);

        if (id.idEstado == "00000000-0000-0000-C000-000000000042")
            return Resultado.ok<CiudadDTO[]>(LISTADO_CIUDADES_FLORIDA);

        if (id.idEstado == "00000000-0000-0000-C000-000000000031")
            return Resultado.ok<CiudadDTO[]>(LISTADO_CIUDADES_ARAUCA);

        if (id.idEstado == "00000000-0000-0000-C000-000000000032")
            return Resultado.ok<CiudadDTO[]>(LISTADO_CIUDADES_ANTIOQUIA);

        return Resultado.falla<any>(OPERACION_FALLIDA);
    }
}
