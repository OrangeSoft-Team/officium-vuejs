import { OperacionExitosaDTO } from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { Resultado } from "../../comun/dominio/resultado";
import { DatosInicioSesionDTO } from "./casoDeUso/IniciarSesionCorreoClave.cu";
import { RespuestaAutentifiacionDTO } from "./dto/RespuestaAutentificacionDTO";
import { RestablecerContrasenaDTO } from "./dto/RestablecerContrasenaDTO";

export interface IServicioAutentificacion {
    autentificar(
        credencial: DatosInicioSesionDTO
    ): Promise<Resultado<RespuestaAutentifiacionDTO>>;

    cerrarSesion(): Promise<Resultado<OperacionExitosaDTO>>;

    restablecerContrasena(
        credencialPrincipal: RestablecerContrasenaDTO
    ): Promise<Resultado<OperacionExitosaDTO>>;
}
