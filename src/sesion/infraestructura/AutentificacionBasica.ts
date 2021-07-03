import { IServicioAutentificacion } from "../aplicacion/IServicioAutentificacion";
import { Resultado } from "../../comun/dominio/resultado";
import { IServicioPersistencia } from "../../comun/aplicacion/IServicioPersistencia";
import { DatosInicioSesionDTO } from "../aplicacion/casoDeUso/IniciarSesion.cu";
import { RespuestaInicioSesionDTO } from "../../ofertaLaboral/aplicacion/dto/RespuestaInicioSesionDTO";
import { FORMATO_CORREO_ELECTRONICO_NO_VALIDO } from "./excepciones/correoElectronico.excepcion";
import { FORMATO_CONTRASENA_INVALIDA } from "./excepciones/contrasena.exepcion";
import { RESPUESTA_INICIO_SESION_VALIDO } from "./respuesta/InicioSesion.json";
import { CLAVE_SESION_USUARIO } from "../../comun/infraestructura/persistencia/ClavesLocalStorage";
import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";

export class AutentificacionBasica implements IServicioAutentificacion {
    private persistenciaAlterna: IServicioPersistencia;

    constructor(implPersistencia: IServicioPersistencia) {
        this.persistenciaAlterna = implPersistencia;
    }

    public async iniciarSesion(
        credencial: DatosInicioSesionDTO
    ): Promise<Resultado<RespuestaInicioSesionDTO>> {
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
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(
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

        //Aqui hariamos petición
        //Respuesta fake
        const respuesta: RespuestaInicioSesionDTO =
            RESPUESTA_INICIO_SESION_VALIDO;

        //Guardamos en persistencia local
        this.persistenciaAlterna.guardar(CLAVE_SESION_USUARIO, respuesta);

        return Resultado.ok<RespuestaInicioSesionDTO>(respuesta);
    }

    cerrarSesion(): Resultado<OperacionExitosaDTO> {
        //Borramos de persistencia local datos usuario
        const datosSesionOrError =
            this.persistenciaAlterna.remover(CLAVE_SESION_USUARIO);
        if (datosSesionOrError.esFallido)
            return Resultado.falla<any>(datosSesionOrError.error);

        //En caso de respuesta exitosa
        return Resultado.ok<OperacionExitosaDTO>({
            mensaje: OPERACION_EXITOSA,
        });
    }

    obtenerUsuario(): Resultado<RespuestaInicioSesionDTO> {
        //Obtenemos valores de persistencia
        const datosSesionOrError =
            this.persistenciaAlterna.obtener<RespuestaInicioSesionDTO>(
                CLAVE_SESION_USUARIO
            );
        if (datosSesionOrError.esFallido)
            return Resultado.falla<any>(datosSesionOrError.error);

        //Respondemos
        return Resultado.ok<RespuestaInicioSesionDTO>(
            datosSesionOrError.getValue()
        );
    }
}
