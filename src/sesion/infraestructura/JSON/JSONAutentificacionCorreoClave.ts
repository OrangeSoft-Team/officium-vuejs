import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { Resultado } from "../../../comun/dominio/resultado";
import { DatosInicioSesionDTO } from "../../aplicacion/casoDeUso/IniciarSesionCorreoClave.cu";
import { IServicioAutentificacion } from "../../aplicacion/IServicioAutentificacion";
import { RespuestaAutentifiacionDTO } from "../../aplicacion/dto/RespuestaAutentificacionDTO";
import { AUTENTIFICACION_VALIDA_REALIZADA } from "./respuestas/firebase.json";
import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import { CLAVE_SESION_USUARIO } from "../../../comun/infraestructura/persistencia/ClavesLocalStorage";

export class AutentificacionCorreoClaveJSON
    implements IServicioAutentificacion
{
    private persistenciaAlterna: IServicioPersistencia;

    constructor(implPersistencia: IServicioPersistencia) {
        this.persistenciaAlterna = implPersistencia;
    }

    autentificar(
        credencial: DatosInicioSesionDTO
    ): Promise<Resultado<RespuestaAutentifiacionDTO>> {
        return new Promise((resolve, reject) => {
            //Llamos al proceso de firebase encargado

            //Esperamos respuesta
            //Negativa => Avisamos

            //Afirmativa => Enviamos datos
            const respuesta: RespuestaAutentifiacionDTO =
                AUTENTIFICACION_VALIDA_REALIZADA;

            resolve(Resultado.ok<RespuestaAutentifiacionDTO>(respuesta));
        });
    }
    async cerrarSesion(): Promise<Resultado<OperacionExitosaDTO>> {
        return new Promise((resolve, reject) => {
            //Llamamos a firebase

            //Afirmativo => Borramos
            const datosSesionOrError =
                this.persistenciaAlterna.remover(CLAVE_SESION_USUARIO);
            if (datosSesionOrError.esFallido)
                return Resultado.falla<any>(datosSesionOrError.error);

            resolve(
                Resultado.ok<OperacionExitosaDTO>({
                    mensaje: OPERACION_EXITOSA,
                })
            );
        });
    }
}
