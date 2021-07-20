import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { Resultado } from "../../../../comun/dominio/resultado";
import { DatosInicioSesionDTO } from "../../../aplicacion/casoDeUso/IniciarSesionCorreoClave.cu";
import { IServicioAutentificacion } from "../../../aplicacion/IServicioAutentificacion";
import { RespuestaAutentifiacionDTO } from "../../../aplicacion/dto/RespuestaAutentificacionDTO";
import { AUTENTIFICACION_VALIDA_REALIZADA } from ".././respuestas/firebase.json";
import { IServicioPersistencia } from "../../../../comun/aplicacion/IServicioPersistencia";

export class AutentificacionCorreoClaveJSON
    implements IServicioAutentificacion
{
    private persistenciaAlterna: IServicioPersistencia;

    constructor(implPersistencia: IServicioPersistencia) {
        this.persistenciaAlterna = implPersistencia;
    }

    cerrarSesion(): Promise<Resultado<OperacionExitosaDTO>> {
        return new Promise((resolve) => {
            resolve(
                Resultado.ok<OperacionExitosaDTO>({
                    mensaje: OPERACION_EXITOSA,
                })
            );
        });
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
}
