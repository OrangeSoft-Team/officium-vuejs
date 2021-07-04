import { AutentificacionBasica } from "../../../sesion/infraestructura/AutentificacionBasica";
import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import { CasoUsoIniciarSesion } from "../../../sesion/aplicacion/casoDeUso/IniciarSesion.cu";
import { FORMATO_CONTRASENA_INVALIDA } from "../../../sesion/infraestructura/excepciones/contrasena.exepcion";

jest.mock("../../../sesion/infraestructura/AutentificacionBasica");

describe("Autentificación con credenciales básicas", () => {
    let Implementacion: AutentificacionBasica;
    let persistenciaImplementacion: IServicioPersistencia;

    beforeEach(() => {
        persistenciaImplementacion = new LocalStoragePersistencia();
        Implementacion = new AutentificacionBasica(persistenciaImplementacion);
    });

    it("Inicia de sesión con credenciales básicas válidas", () => {
        //Inicializamos Caso de Uso
        const CU = new CasoUsoIniciarSesion(Implementacion);
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
        const CU = new CasoUsoIniciarSesion(Implementacion);
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
