import { OperacionExitosaDTO } from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { Resultado } from "../../comun/dominio/resultado";
import { DatosInicioSesionDTO } from "./casoDeUso/IniciarSesionCorreoClave.cu";

export interface IServicioValidacionCredencial {
    validar(credencial: DatosInicioSesionDTO): Resultado<OperacionExitosaDTO>;
}
