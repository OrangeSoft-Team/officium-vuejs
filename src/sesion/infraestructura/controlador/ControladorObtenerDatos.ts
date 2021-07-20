import { OPERACION_FALLIDA } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionFallida";
import { Resultado } from "../../../comun/dominio/resultado";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import { RespuestaInicioSesionDTO } from "../../aplicacion/dto/RespuestaInicioSesionDTO";
import { IServicioSesion } from "../../aplicacion/IServicioSesion";
import { SesionBasicaJSON } from "../JSON/JSONSesionBasica";

export class ControladorObtenerDatos {
    private servicioSesion: IServicioSesion;

    private constructor(servicioAUsar: IServicioSesion) {
        this.servicioSesion = servicioAUsar;
    }

    //Método estático para inicializar controlador
    public static inicialiar(): ControladorObtenerDatos {
        return new ControladorObtenerDatos(
            new SesionBasicaJSON(new LocalStoragePersistencia())
        );
    }

    //Ejecutar caso de uso
    public ejecutarServicio(): Resultado<RespuestaInicioSesionDTO> {
        const datosOrError = this.servicioSesion.obtenerUsuario();
        if (datosOrError.esFallido) {
            return Resultado.falla<any>(OPERACION_FALLIDA);
        }

        return Resultado.ok<RespuestaInicioSesionDTO>(datosOrError.getValue());
    }
}
