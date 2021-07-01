import {IServicioAutentificacion} from "../aplicacion/IServicioAutentificacion";
import { Resultado } from "../../comun/dominio/resultado";
import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { OPERACION_FALLIDA } from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionFallida";
import { IServicioPersistencia } from "../../comun/aplicacion/IServicioPersistencia";
import { DatosInicioSesionDTO } from "../aplicacion/casoDeUso/IniciarSesion.cu";
import { RespuestaInicioSesionDTO } from "../aplicacion/dto/RespuestaInicioSesionDTO";


export class AutentificacionBasica implements IServicioAutentificacion{
    private persistenciaAlterna: IServicioPersistencia;

    constructor(implPersistencia: IServicioPersistencia) {
        this.persistenciaAlterna = implPersistencia;
    }

    iniciarSesion(credencial: DatosInicioSesionDTO): Resultado<RespuestaInicioSesionDTO> {

        //Valida que el correo sea mayor a 10 caracteres
        if (credencial.contraseña.length<10)
            return Resultado.falla<any>(OPERACION_FALLIDA);

        //Valida que la contraseña sea menor a 64 caracteres
        if (credencial.contraseña.length>64)
            return Resultado.falla<any>(OPERACION_FALLIDA);
        
        //Valida que la contraseña tenga mayuscula
        if (!/[A-Z]/.test(credencial.contraseña))
            return Resultado.falla<any>(OPERACION_FALLIDA);
    
        //Valida que la contraseña tenga minuscula
        if (!/[a-z]/.test(credencial.contraseña))
            return Resultado.falla<any>(OPERACION_FALLIDA);
        
        //Valida que la contraseña tenga caracter numerico
        if (!/[0-9]/.test(credencial.contraseña))
            return Resultado.falla<any>(OPERACION_FALLIDA);
        
        //Valida que el correo sea mayor a 10 caracteres
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(credencial.correoElectronico))
            return Resultado.falla<any>(OPERACION_FALLIDA);

        //Valida que el correo sea mayor a 10 caracteres
        if (credencial.correoElectronico.length<3)
            return Resultado.falla<any>(OPERACION_FALLIDA);

        //Valida que el correo sea mayor a 10 caracteres
        if (credencial.correoElectronico.length>320)
            return Resultado.falla<any>(OPERACION_FALLIDA);
        
    }

    cerrarSesion(): Resultado<any> {
        throw new Error("Method not implemented.");
    }

    obtenerUsuario(): Resultado<RespuestaInicioSesionDTO> {
        throw new Error("Method not implemented.");
    }
}