import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import { CasoUsoIniciarSesionCorreoClave } from "../../../sesion/aplicacion/casoDeUso/IniciarSesionCorreoClave.cu";
import { FORMATO_CONTRASENA_INVALIDA } from "../../../sesion/infraestructura/excepciones/contrasena.exepcion";
import { AutentificacionFirebaseCorreoClaveJSON } from "../../../sesion/infraestructura/JSON/JSONAutentificacionFirebaseCorreoClave";
import { IServicioAutentificacion } from "../../../sesion/aplicacion/IServicioAutentificacion";
import { IServicioValidacionCredencial } from "../../../sesion/aplicacion/IServicioValidacionCredencial";
import { IServicioSesion } from "../../../sesion/aplicacion/IServicioSesion";
import { ValidacionCredencial } from "../../../sesion/infraestructura/validarCredenciales/ValidacionCredencial";
import { SesionBasicaJSON } from "../../../sesion/infraestructura/JSON/JSONSesionBasica";

jest.mock(
    "../../../sesion/infraestructura/JSON/JSONAutentificacionFirebaseCorreoClave"
);
jest.mock("../../../sesion/infraestructura/JSON/JSONSesionBasica");

describe("Autentificación con credenciales básicas", () => {
    let autentificacionImpl: IServicioAutentificacion;
    let validadorImpl: IServicioValidacionCredencial;
    let sesionImpl: IServicioSesion;
    let persistenciaImplementacion: IServicioPersistencia;

    beforeEach(() => {
        persistenciaImplementacion = new LocalStoragePersistencia();
        autentificacionImpl = new AutentificacionFirebaseCorreoClaveJSON(
            persistenciaImplementacion
        );
        validadorImpl = new ValidacionCredencial();
        sesionImpl = new SesionBasicaJSON(persistenciaImplementacion);
    });

    it("Inicia de sesión con credenciales básicas válidas", () => {
        //Inicializamos Caso de Uso
        const CU = new CasoUsoIniciarSesionCorreoClave(
            autentificacionImpl,
            validadorImpl,
            sesionImpl
        );
        const resultadoCU = CU.ejecutar({
            correoElectronico: "test@test.com",
            contraseña: "Guaicaipuro1",
        });

        return resultadoCU.then((data) => {
            if (data.esFallido) {
                console.error("[TEST ERROR] ", data.error);
            }
            expect(data.esExitoso).toBeTruthy();
            expect(data.esFallido).toBeFalsy();
            expect(data.getValue()).not.toBeUndefined();
        });
    });

    it("Intenta iniciar de sesión con credenciales básicas y clave inválida", () => {
        //Inicializamos Caso de Uso
        const CU = new CasoUsoIniciarSesionCorreoClave(
            autentificacionImpl,
            validadorImpl,
            sesionImpl
        );
        const resultadoCU = CU.ejecutar({
            correoElectronico: "test@test.com",
            contraseña: "guaicaipuro",
        });

        return resultadoCU.then((data) => {
            if (data.esFallido) {
                console.log("[TEST ERROR] ", data.error);
            }
            expect(data.esExitoso).toBeFalsy();
            expect(data.esFallido).toBeTruthy();
            expect(data.error).toBe(FORMATO_CONTRASENA_INVALIDA);
        });
    });
});
