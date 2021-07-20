import { IServicioAutentificacion } from "../../aplicacion/IServicioAutentificacion";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import {
    CasoUsoIniciarSesionCorreoClave,
    DatosInicioSesionDTO,
} from "../../aplicacion/casoDeUso/IniciarSesionCorreoClave.cu";
import { Resultado } from "../../../comun/dominio/resultado";
import { RespuestaInicioSesionDTO } from "../../aplicacion/dto/RespuestaInicioSesionDTO";
import { AutentificacionFirebaseCorreoClaveJSON } from "../JSON/JSONAutentificacionFirebaseCorreoClave";
import { IServicioValidacionCredencial } from "../../aplicacion/IServicioValidacionCredencial";
import { IServicioSesion } from "../../aplicacion/IServicioSesion";
import { ValidacionCredencial } from "../validarCredenciales/ValidacionCredencial";
import { SesionBasicaJSON } from "../JSON/JSONSesionBasica";

export class ControladorIniciarSesion {
    private servicioAutentificacion: IServicioAutentificacion;
    private servicioValidacion: IServicioValidacionCredencial;
    private servicioSesion: IServicioSesion;

    private constructor(
        servicioAUsar: IServicioAutentificacion,
        validadorAUsar: IServicioValidacionCredencial,
        sesionAUsar: IServicioSesion
    ) {
        this.servicioAutentificacion = servicioAUsar;
        this.servicioValidacion = validadorAUsar;
        this.servicioSesion = sesionAUsar;
    }

    //Método estático para inicializar controlador
    public static inicialiar(): ControladorIniciarSesion {
        const persistenciaImpl = new LocalStoragePersistencia();
        return new ControladorIniciarSesion(
            new AutentificacionFirebaseCorreoClaveJSON(persistenciaImpl),
            new ValidacionCredencial(),
            new SesionBasicaJSON(persistenciaImpl)
        );
    }

    //Ejecutar caso de uso
    public async ejecutarCU(
        solicitud: DatosInicioSesionDTO
    ): Promise<Resultado<RespuestaInicioSesionDTO>> {
        const CasoUsoInicarSesion = new CasoUsoIniciarSesionCorreoClave(
            this.servicioAutentificacion,
            this.servicioValidacion,
            this.servicioSesion
        );

        const respuestaCU = await CasoUsoInicarSesion.ejecutar(solicitud);

        if (respuestaCU.esExitoso) {
            return Resultado.ok<RespuestaInicioSesionDTO>(
                respuestaCU.getValue()
            );
        }

        return Resultado.falla<any>(respuestaCU.error);
    }
}
