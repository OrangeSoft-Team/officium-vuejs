import firebase from "firebase/app";
import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { OPERACION_FALLIDA } from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionFallida";
import { IServicioPersistencia } from "../../comun/aplicacion/IServicioPersistencia";
import { Resultado } from "../../comun/dominio/resultado";
import { CLAVE_SESION_USUARIO } from "../../comun/infraestructura/persistencia/ClavesLocalStorage";
import { DatosInicioSesionDTO } from "../aplicacion/casoDeUso/IniciarSesionCorreoClave.cu";
import { RespuestaAutentifiacionDTO } from "../aplicacion/dto/RespuestaAutentificacionDTO";
import { IServicioAutentificacion } from "../aplicacion/IServicioAutentificacion";
import {
    COMBINACION_INCORRECTA,
    USUARIO_NO_EXISTE,
} from "./excepciones/firebase.excepcion";

export class AutentificacionFirebaseCorreoClave
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
            firebase
                .auth()
                .signInWithEmailAndPassword(
                    credencial.correoElectronico,
                    credencial.contraseña
                )
                .then((userCredential) => {
                    // Autentificado!
                    var user = userCredential.user;
                    //console.log("INICIO", user);
                    const respuesta: RespuestaAutentifiacionDTO = {
                        uid: user ? <string>user.uid : "",
                        email: user ? <string>user.email : "",
                    };

                    resolve(
                        Resultado.ok<RespuestaAutentifiacionDTO>(respuesta)
                    );
                })
                .catch((error) => {
                    console.log("[ERROR FB]", error);

                    if (error.code == "auth/user-not-found")
                        resolve(Resultado.falla<any>(USUARIO_NO_EXISTE));

                    if (error.code == "auth/wrong-password")
                        resolve(Resultado.falla<any>(COMBINACION_INCORRECTA));
                });
        });
    }
    cerrarSesion(): Promise<Resultado<OperacionExitosaDTO>> {
        return new Promise((resolve, reject) => {
            //Llamamos a firebase
            firebase
                .auth()
                .signOut()
                .then(() => {
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
                })
                .catch((error) => {
                    console.log("[ERROR FB]", error);
                    resolve(Resultado.falla<any>(OPERACION_FALLIDA));
                });
        });
    }
}