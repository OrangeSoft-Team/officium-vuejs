import { Resultado } from "../comun/dominio/resultado";
import { RESPUESTA_INICIO_SESION_VALIDO } from "../sesion/infraestructura/respuesta/InicioSesion.json";
import { AutentificacionBasica } from "../sesion/infraestructura/AutentificacionBasica";
import { IServicioPersistencia } from "../comun/aplicacion/IServicioPersistencia";
import { LocalStoragePersistencia } from "../ofertaLaboral/infraestructura/persistencia/LocalStorage.persistencia";
import { IniciarSesion } from "../sesion/aplicacion/casoDeUso/IniciarSesion.cu";
import { FORMATO_CONTRASENA_INVALIDA } from "../sesion/infraestructura/excepciones/contrasena.exepcion";
import { FORMATO_CORREO_ELECTRONICO_NO_VALIDO } from "../sesion/infraestructura/excepciones/correoElectronico.excepcion";

jest.mock("../sesion/infraestructura/AutentificacionBasica");

describe("Autentificación con credenciales básicas", () => {
    let Implementacion: AutentificacionBasica;
    let persistenciaImplementacion: IServicioPersistencia;

    beforeEach(() => {
        persistenciaImplementacion = new LocalStoragePersistencia();
        Implementacion = new AutentificacionBasica(persistenciaImplementacion);
    });

    it("Inicia de sesión con credenciales básicas válidas", () => {
        //Inicializamos Caso de Uso
        const CU = new IniciarSesion(Implementacion);
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
        const CU = new IniciarSesion(Implementacion);
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
