import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { Resultado } from "../../../comun/dominio/resultado";
import { IServicioAutentificacion } from "../../aplicacion/IServicioAutentificacion";
import { AutentificacionFirebaseCorreoClave } from "../AutentificacionFirebaseCorreoClave";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import { RestablecerContrasenaDTO } from "../../aplicacion/dto/RestablecerContrasenaDTO";
import { CasoUsoRestablecerContrasena } from "../../aplicacion/casoDeUso/RestrablecerContrasena.cu";
import { ValidacionCredencial } from "../validarCredenciales/ValidacionCredencial";
import { IServicioValidacionCredencial } from "../../aplicacion/IServicioValidacionCredencial";

export class ControladorRestablecerContrasena {
    private servicioAutentificacion: IServicioAutentificacion;
    private validadorImplementacion: IServicioValidacionCredencial;

    constructor(
        authImpl: IServicioAutentificacion,
        validadorImpl: IServicioValidacionCredencial
    ) {
        this.servicioAutentificacion = authImpl;
        this.validadorImplementacion = validadorImpl;
    }

    //Método estático para inicializar controlador
    public static inicialiar(): ControladorRestablecerContrasena {
        return new ControladorRestablecerContrasena(
            new AutentificacionFirebaseCorreoClave(
                new LocalStoragePersistencia()
            ),
            new ValidacionCredencial()
        );
    }

    //Ejecutar caso de uso
    public async ejecutarServicio(
        data: RestablecerContrasenaDTO
    ): Promise<Resultado<OperacionExitosaDTO>> {
        const CasoUsoRestablecer = new CasoUsoRestablecerContrasena(
            this.servicioAutentificacion,
            this.validadorImplementacion
        );

        const restablecerOrError = await CasoUsoRestablecer.ejecutar(data);

        if (restablecerOrError.esFallido)
            return Resultado.falla<any>(restablecerOrError.error);

        return Resultado.ok<OperacionExitosaDTO>({
            mensaje: OPERACION_EXITOSA,
        });
    }
}
