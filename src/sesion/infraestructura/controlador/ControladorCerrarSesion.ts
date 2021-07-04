import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { OPERACION_FALLIDA } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionFallida";
import { Resultado } from "../../../comun/dominio/resultado";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import { IServicioAutentificacion } from "../../aplicacion/IServicioAutentificacion";
import { AutentificacionBasica } from "../AutentificacionBasica";

export class ControladorCerrarSesion {
    private servicioAutentificacion: IServicioAutentificacion;

    private constructor(servicioAUsar: IServicioAutentificacion) {
        this.servicioAutentificacion = servicioAUsar;
    }

    //Método estático para inicializar controlador
    public static inicialiar(): ControladorCerrarSesion {
        return new ControladorCerrarSesion(
            new AutentificacionBasica(new LocalStoragePersistencia())
        );
    }

    //Ejecutar caso de uso
    public ejecutarServicio(): Resultado<OperacionExitosaDTO> {
        const datosOrError = this.servicioAutentificacion.cerrarSesion();
        if (datosOrError.esFallido) {
            return Resultado.falla<any>(OPERACION_FALLIDA);
        }

        return Resultado.ok<OperacionExitosaDTO>({
            mensaje: OPERACION_EXITOSA,
        });
    }
}
