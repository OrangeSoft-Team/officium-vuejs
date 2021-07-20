import { Resultado } from "../../comun/dominio/resultado";
import { RespuestaInicioSesionDTO } from "./dto/RespuestaInicioSesionDTO";
import { DatosInicioSesionDTO } from "./casoDeUso/IniciarSesionCorreoClave.cu";

export interface IServicioSesion {
    iniciarSesion(
        credencial: DatosInicioSesionDTO
    ): Promise<Resultado<RespuestaInicioSesionDTO>>;

    obtenerUsuario(): Resultado<RespuestaInicioSesionDTO>;
}
