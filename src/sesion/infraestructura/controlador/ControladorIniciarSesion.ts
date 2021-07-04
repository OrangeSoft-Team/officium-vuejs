import { IServicioAutentificacion } from "../../aplicacion/IServicioAutentificacion";
import { AutentificacionBasica } from "../AutentificacionBasica";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import {
    CasoUsoIniciarSesion,
    DatosInicioSesionDTO,
} from "../../aplicacion/casoDeUso/IniciarSesion.cu";
import { Resultado } from "../../../comun/dominio/resultado";
import { RespuestaInicioSesionDTO } from "../../../ofertaLaboral/aplicacion/dto/RespuestaInicioSesionDTO";

export class ControladorIniciarSesion {
    private servicioAutentificacion: IServicioAutentificacion;

    private constructor(servicioAUsar: IServicioAutentificacion) {
        this.servicioAutentificacion = servicioAUsar;
    }

    //Método estático para inicializar controlador
    public static inicialiar(): ControladorIniciarSesion {
        return new ControladorIniciarSesion(
            new AutentificacionBasica(new LocalStoragePersistencia())
        );
    }

    //Ejecutar caso de uso
    public async ejecutarCU(
        solicitud: DatosInicioSesionDTO
    ): Promise<Resultado<RespuestaInicioSesionDTO>> {
        const CasoUsoInicarSesion = new CasoUsoIniciarSesion(
            this.servicioAutentificacion
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
