import { Resultado } from "../../comun/dominio/resultado";
import { RespuestaInicioSesionDTO } from "./dto/RespuestaInicioSesionDTO";
import { DatosInicioSesionDTO } from "./casoDeUso/IniciarSesionCorreoClave.cu";

export interface DatosInicioSesionEmpleadorDTO {
    correoElectronico: string;
    token: string;
}

export interface IServicioSesion {
    iniciarSesion(
        credencial: DatosInicioSesionEmpleadorDTO
    ): Promise<Resultado<RespuestaInicioSesionDTO>>;

    obtenerUsuario(): Resultado<RespuestaInicioSesionDTO>;
}
