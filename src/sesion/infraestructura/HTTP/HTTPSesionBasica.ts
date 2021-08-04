import { Resultado } from "../../../comun/dominio/resultado";
import { RespuestaInicioSesionDTO } from "../../aplicacion/dto/RespuestaInicioSesionDTO";
import { DatosInicioSesionDTO } from "../../aplicacion/casoDeUso/IniciarSesionCorreoClave.cu";
import {
    DatosInicioSesionEmpleadorDTO,
    IServicioSesion,
} from "../../aplicacion/IServicioSesion";
import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import {
    CLAVE_COOKIE,
    CLAVE_SESION_USUARIO,
} from "../../../comun/infraestructura/persistencia/ClavesLocalStorage";
import { NEST_URL_BASE } from "../../../main";
import axios from "axios";
import { OPERACION_FALLIDA } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionFallida";

export class SesionBasicaHTTP implements IServicioSesion {
    private persistenciaAlterna: IServicioPersistencia;

    constructor(implPersistencia: IServicioPersistencia) {
        this.persistenciaAlterna = implPersistencia;
    }

    iniciarSesion(
        credencial: DatosInicioSesionEmpleadorDTO
    ): Promise<Resultado<RespuestaInicioSesionDTO>> {
        return new Promise((resolve, reject) => {
            //Enviamos datos a back
            axios
                .post(NEST_URL_BASE + "empleador/auth", credencial, {
                    withCredentials: true,
                })
                //Esperamos respuesta
                .then((respuesta) => {
                    //Afirmativa => Guardamos
                    //console.log("[RESPUESTA] ", respuesta);
                    //console.log("[HEADERS] ", respuesta.headers);
                    console.log(
                        "[Authorization] ",
                        respuesta.headers.authorization
                    );

                    //Guardamos en persistencia local la cookie
                    this.persistenciaAlterna.guardar(
                        CLAVE_COOKIE,
                        respuesta.headers.authorization
                    );

                    //Guardamos en persistencia local
                    this.persistenciaAlterna.guardar(
                        CLAVE_SESION_USUARIO,
                        respuesta.data
                    );

                    //Avisamos
                    resolve(
                        Resultado.ok<RespuestaInicioSesionDTO>(respuesta.data)
                    );
                })
                .catch((e) => {
                    //Falla => Avisamos
                    resolve(Resultado.falla<any>(e.mensaje));
                });
        });
    }

    obtenerUsuario(): Resultado<RespuestaInicioSesionDTO> {
        //Obtenemos valor
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
