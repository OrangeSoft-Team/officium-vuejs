import {IServicioAutentificacion} from "../aplicacion/IServicioAutentificacion";
import { Resultado } from "../../comun/dominio/resultado";
import { OPERACION_FALLIDA } from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionFallida";
import { IServicioPersistencia } from "../../comun/aplicacion/IServicioPersistencia";
import { DatosInicioSesionDTO } from "../aplicacion/casoDeUso/IniciarSesion.cu";
import { RespuestaInicioSesionDTO } from "../aplicacion/dto/RespuestaInicioSesionDTO";


export class AutentificacionBasica implements IServicioAutentificacion{
    private persistenciaAlterna: IServicioPersistencia;

    constructor(implPersistencia: IServicioPersistencia) {
        this.persistenciaAlterna = implPersistencia;
    }

   public async iniciarSesion(
        credencial: DatosInicioSesionDTO
        ): Promise<Resultado<RespuestaInicioSesionDTO>> {
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
        
        //Valida que el reg exp del correo
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(credencial.correoElectronico))
            return Resultado.falla<any>(OPERACION_FALLIDA);

        //Valida que el correo sea mayor o igual a 3 caracteres
        if (credencial.correoElectronico.length<3)
            return Resultado.falla<any>(OPERACION_FALLIDA);

        //Valida que el correo sea menor a 320 caracteres
        if (credencial.correoElectronico.length>320)
            return Resultado.falla<any>(OPERACION_FALLIDA);
        
        
        let value: RespuestaInicioSesionDTO = {
            nombreEmpresa: "IBM",
            tokenSesion: "Token",
            uuidEmpresa: " 560a8451-a29c-41d4-a716-544676554400",
        }
        
        return Resultado.ok<RespuestaInicioSesionDTO>(value);
    }

    cerrarSesion(
    ): Resultado<any> {
        throw new Error("Method not implemented.");
    }

    obtenerUsuario(
    ): Resultado<RespuestaInicioSesionDTO> {
        let dto: RespuestaInicioSesionDTO = {
            nombreEmpresa: "IBM",
            tokenSesion: "Token",
            uuidEmpresa: " 560a8451-a29c-41d4-a716-544676554400",
        }
        return Resultado.ok<RespuestaInicioSesionDTO>(dto);
    }
}