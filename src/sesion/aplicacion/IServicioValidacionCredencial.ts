import { OperacionExitosaDTO } from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { Resultado } from "../../comun/dominio/resultado";
import { DatosInicioSesionDTO } from "./casoDeUso/IniciarSesionCorreoClave.cu";
import { RestablecerContrasenaDTO } from "../aplicacion/dto/RestablecerContrasenaDTO";

export interface IServicioValidacionCredencial {
    validar(credencial: DatosInicioSesionDTO): Resultado<OperacionExitosaDTO>;

    validarCredencialPrincipal(
        credencial: RestablecerContrasenaDTO
    ): Resultado<OperacionExitosaDTO>;
}
