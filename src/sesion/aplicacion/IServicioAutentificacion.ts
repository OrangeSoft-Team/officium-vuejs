import { OperacionExitosaDTO } from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { Resultado } from "../../comun/dominio/resultado";
import { DatosInicioSesionDTO } from "./casoDeUso/IniciarSesionCorreoClave.cu";
import { RespuestaAutentifiacionDTO } from "./dto/RespuestaAutentificacionDTO";

export interface IServicioAutentificacion {
    autentificar(
        credencial: DatosInicioSesionDTO
    ): Promise<Resultado<RespuestaAutentifiacionDTO>>;

    cerrarSesion(): Promise<Resultado<OperacionExitosaDTO>>;
}
