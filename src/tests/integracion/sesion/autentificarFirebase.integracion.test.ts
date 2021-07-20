import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import { CasoUsoIniciarSesionCorreoClave } from "../../../sesion/aplicacion/casoDeUso/IniciarSesionCorreoClave.cu";
import { AutentificacionFirebaseCorreoClave } from "../../../sesion/infraestructura/AutentificacionFirebaseCorreoClave";
import { IServicioAutentificacion } from "../../../sesion/aplicacion/IServicioAutentificacion";
import { IServicioValidacionCredencial } from "../../../sesion/aplicacion/IServicioValidacionCredencial";
import { IServicioSesion } from "../../../sesion/aplicacion/IServicioSesion";
import { ValidacionCredencial } from "../../../sesion/infraestructura/validarCredenciales/ValidacionCredencial";
import { SesionBasicaJSON } from "../../../sesion/infraestructura/JSON/JSONSesionBasica";
import firebase from "firebase/app";
import "firebase/auth";

describe("Autentificar con correo y clave en firebase", () => {
    let persistenciaImplementacion: IServicioPersistencia;

    var firebaseConfig = {
        apiKey: "AIzaSyAlpmRnWovaKQHDx57oW62H5veuv-xCbvk",
        authDomain: "autentificacion-officium.firebaseapp.com",
        projectId: "autentificacion-officium",
        appId: "1:636839173634:web:9cd204bab1fd95db65511b",
    };
    firebase.initializeApp(firebaseConfig);

    it("Autentificar con credenciales básicas válidas", () => {
        //Inicializamos Caso de Uso
        const servicio = new AutentificacionFirebaseCorreoClave(
            persistenciaImplementacion
        );
        const resultadoServicio = servicio.autentificar({
            correoElectronico: "test@test.com",
            contraseña: "123456QAZwsx",
        });

        return resultadoServicio.then((data) => {
            if (data.esFallido) {
                console.error("[TEST ERROR] ", data.error);
            }
            expect(data.esExitoso).toBeTruthy();
            expect(data.esFallido).toBeFalsy();
            expect(data.getValue()).not.toBeUndefined();
        });
    });
});
