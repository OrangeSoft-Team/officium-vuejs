/**
 * @jest-environment jsdom
 */

import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";

describe("Adaptador Persistencia Alterna: Local Storage", () => {
    let adaptadorLocalStorage: LocalStoragePersistencia;

    const fakeLocalStorage = (function () {
        let store: { [key: string]: string } = {};

        return {
            getItem: function (key: string) {
                return store[key] || null;
            },
            setItem: function (key: string, value: any) {
                store[key] = value.toString();
            },
            removeItem: function (key: string) {
                delete store[key];
            },
            clear: function () {
                store = {};
            },
        };
    })();

    //Claves de test
    const CLAVE_TEST_ID_EMPRESA = "Test_id_empresa";

    //Valores de prueba
    const VALOR_TEST_ID_EMPRESA = "55sd5as-ds5ads6";

    beforeAll(() => {
        adaptadorLocalStorage = new LocalStoragePersistencia();

        Object.defineProperty(window, "localStorage", {
            value: fakeLocalStorage,
        });
    });

    beforeEach(() => {
        //Limpiamos
        fakeLocalStorage.clear();
    });

    it("Guardamos y recuperamos un dato en persistencia", () => {
        //Guardamos el valor
        const respuestaGuardarOrError = adaptadorLocalStorage.guardar(
            CLAVE_TEST_ID_EMPRESA,
            VALOR_TEST_ID_EMPRESA
        );
        expect(respuestaGuardarOrError.esFallido).toBeFalsy();
        expect(respuestaGuardarOrError.esExitoso).toBeTruthy();

        //Recuperamos
        const respuestaObtenerOrError = adaptadorLocalStorage.obtener(
            CLAVE_TEST_ID_EMPRESA
        );
        expect(respuestaObtenerOrError.esExitoso).toBeTruthy();
        expect(respuestaObtenerOrError.esFallido).toBeFalsy();

        //Comparamos
        expect(respuestaObtenerOrError.getValue()).toBe(VALOR_TEST_ID_EMPRESA);
    });

    it("Guardamos y borramos un dato en persistencia", () => {
        //Guardamos el valor
        const respuestaGuardarOrError = adaptadorLocalStorage.guardar(
            CLAVE_TEST_ID_EMPRESA,
            VALOR_TEST_ID_EMPRESA
        );
        expect(respuestaGuardarOrError.esFallido).toBeFalsy();
        expect(respuestaGuardarOrError.esExitoso).toBeTruthy();

        //Boramos
        const respuestaBorradoOrError = adaptadorLocalStorage.remover(
            CLAVE_TEST_ID_EMPRESA
        );
        expect(respuestaBorradoOrError.esFallido).toBeFalsy();
        expect(respuestaBorradoOrError.esExitoso).toBeTruthy();

        //Verificamos que no exista
        const respuestaObtenerOrError = adaptadorLocalStorage.obtener(
            CLAVE_TEST_ID_EMPRESA
        );
        expect(respuestaObtenerOrError.esExitoso).toBeFalsy();
        expect(respuestaObtenerOrError.esFallido).toBeTruthy();
    });
});
