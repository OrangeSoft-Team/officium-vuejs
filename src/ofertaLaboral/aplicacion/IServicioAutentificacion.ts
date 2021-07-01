import { Resultado } from "../../comun/dominio/resultado";
import {RespuestaInicioSesionDTO} from "./dto/RespuestaInicioSesionDTO";
import {DatosInicioSesionDTO} from "./casoDeUso/IniciarSesion.cu";



export interface IServicioAutentificacion {
    iniciarSesion(
        credencial: DatosInicioSesionDTO
    ): Resultado<RespuestaInicioSesionDTO>;

    cerrarSesion(    
    ): Resultado<any>;

    obtenerUsuario(
    ): Resultado<RespuestaInicioSesionDTO>;
}