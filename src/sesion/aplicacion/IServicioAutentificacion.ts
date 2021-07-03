import { OperacionExitosaDTO } from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { Resultado } from "../../comun/dominio/resultado";
import { RespuestaInicioSesionDTO } from "../../ofertaLaboral/aplicacion/dto/RespuestaInicioSesionDTO";
import { DatosInicioSesionDTO } from "./casoDeUso/IniciarSesion.cu";

export interface IServicioAutentificacion {
    iniciarSesion(
        credencial: DatosInicioSesionDTO
    ): Promise<Resultado<RespuestaInicioSesionDTO>>;

    cerrarSesion(): Resultado<OperacionExitosaDTO>;

    obtenerUsuario(): Resultado<RespuestaInicioSesionDTO>;
}
