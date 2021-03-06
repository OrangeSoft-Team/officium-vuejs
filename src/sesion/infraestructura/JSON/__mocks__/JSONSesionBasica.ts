import { Resultado } from "../../../../comun/dominio/resultado";
import { RespuestaInicioSesionDTO } from "../../../aplicacion/dto/RespuestaInicioSesionDTO";
import { DatosInicioSesionDTO } from "../../../aplicacion/casoDeUso/IniciarSesionCorreoClave.cu";
import {
    DatosInicioSesionEmpleadorDTO,
    IServicioSesion,
} from "../../../aplicacion/IServicioSesion";
import { IServicioPersistencia } from "../../../../comun/aplicacion/IServicioPersistencia";
import { CLAVE_SESION_USUARIO } from "../../../../comun/infraestructura/persistencia/ClavesLocalStorage";
import { RESPUESTA_INICIO_SESION_VALIDO } from ".././respuestas/InicioSesion.json";

export class SesionBasicaJSON implements IServicioSesion {
    private persistenciaAlterna: IServicioPersistencia;

    constructor(implPersistencia: IServicioPersistencia) {
        this.persistenciaAlterna = implPersistencia;
    }

    iniciarSesion(
        credencial: DatosInicioSesionEmpleadorDTO
    ): Promise<Resultado<RespuestaInicioSesionDTO>> {
        return new Promise((resolve, reject) => {
            //Enviamos datos a back

            //Esperamos respuesta
            //Falla => Avisamos

            //Afirmativa => Guardamos
            //Respuesta fake
            const respuesta: RespuestaInicioSesionDTO =
                RESPUESTA_INICIO_SESION_VALIDO;

            //Guardamos en persistencia local
            //this.persistenciaAlterna.guardar(CLAVE_SESION_USUARIO, respuesta);
            //Avisamos

            resolve(Resultado.ok<RespuestaInicioSesionDTO>(respuesta));
        });
    }

    obtenerUsuario(): Resultado<RespuestaInicioSesionDTO> {
        //Obtenemos valor

        //Respondemos
        return Resultado.ok<RespuestaInicioSesionDTO>(
            RESPUESTA_INICIO_SESION_VALIDO
        );
    }
}
