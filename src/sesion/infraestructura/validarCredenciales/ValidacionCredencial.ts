import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { Resultado } from "../../../comun/dominio/resultado";
import { DatosInicioSesionDTO } from "../../aplicacion/casoDeUso/IniciarSesionCorreoClave.cu";
import { IServicioValidacionCredencial } from "../../aplicacion/IServicioValidacionCredencial";
import { FORMATO_CONTRASENA_INVALIDA } from "../excepciones/contrasena.exepcion";
import { FORMATO_CORREO_ELECTRONICO_NO_VALIDO } from "../excepciones/correoElectronico.excepcion";

export class ValidacionCredencial implements IServicioValidacionCredencial {
    public validar(
        credencial: DatosInicioSesionDTO
    ): Resultado<OperacionExitosaDTO> {
        //Valida que la contraseña sea mayor a 10 caracteres
        if (credencial.contraseña.length < 10)
            return Resultado.falla<any>(FORMATO_CONTRASENA_INVALIDA);

        //Valida que la contraseña sea menor a 64 caracteres
        if (credencial.contraseña.length > 64)
            return Resultado.falla<any>(FORMATO_CONTRASENA_INVALIDA);

        //Valida que la contraseña tenga mayuscula
        if (!/[A-Z]/.test(credencial.contraseña))
            return Resultado.falla<any>(FORMATO_CONTRASENA_INVALIDA);

        //Valida que la contraseña tenga minuscula
        if (!/[a-z]/.test(credencial.contraseña))
            return Resultado.falla<any>(FORMATO_CONTRASENA_INVALIDA);

        //Valida que la contraseña tenga caracter numerico
        if (!/[0-9]/.test(credencial.contraseña))
            return Resultado.falla<any>(FORMATO_CONTRASENA_INVALIDA);

        //Valida que el reg exp del correo
        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                credencial.correoElectronico
            )
        )
            return Resultado.falla<any>(FORMATO_CORREO_ELECTRONICO_NO_VALIDO);

        //Valida que el correo sea mayor o igual a 3 caracteres
        if (credencial.correoElectronico.length < 3)
            return Resultado.falla<any>(FORMATO_CORREO_ELECTRONICO_NO_VALIDO);

        //Valida que el correo sea menor a 320 caracteres
        if (credencial.correoElectronico.length > 320)
            return Resultado.falla<any>(FORMATO_CORREO_ELECTRONICO_NO_VALIDO);

        //Todo bien
        return Resultado.ok<OperacionExitosaDTO>({
            mensaje: OPERACION_EXITOSA,
        });
    }
}
