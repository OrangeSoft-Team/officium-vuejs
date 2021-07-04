import { OPERACION_FALLIDA } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionFallida";
import { Resultado } from "../../../comun/dominio/resultado";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import { RespuestaInicioSesionDTO } from "../../../ofertaLaboral/aplicacion/dto/RespuestaInicioSesionDTO";
import { IServicioAutentificacion } from "../../aplicacion/IServicioAutentificacion";
import { AutentificacionBasica } from "../AutentificacionBasica";

export class ControladorObtenerDatos {
    private servicioAutentificacion: IServicioAutentificacion;

    private constructor(servicioAUsar: IServicioAutentificacion) {
        this.servicioAutentificacion = servicioAUsar;
    }

    //Método estático para inicializar controlador
    public static inicialiar(): ControladorObtenerDatos {
        return new ControladorObtenerDatos(
            new AutentificacionBasica(new LocalStoragePersistencia())
        );
    }

    //Ejecutar caso de uso
    public ejecutarServicio(): Resultado<RespuestaInicioSesionDTO> {
        const datosOrError = this.servicioAutentificacion.obtenerUsuario();
        if (datosOrError.esFallido) {
            return Resultado.falla<any>(OPERACION_FALLIDA);
        }

        return Resultado.ok<RespuestaInicioSesionDTO>(datosOrError.getValue());
    }
}
