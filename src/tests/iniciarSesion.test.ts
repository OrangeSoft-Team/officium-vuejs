import { Resultado } from "../comun/dominio/resultado";
import { RESPUESTA_INICIO_SESION_VALIDO } from "../sesion/infraestructura/respuesta/InicioSesion.json";
import {AutentificacionBasica} from "../sesion/infraestructura/AutentificacionBasica";
import { IServicioPersistencia } from "../comun/aplicacion/IServicioPersistencia";
import { LocalStoragePersistencia } from "../ofertaLaboral/infraestructura/persistencia/LocalStorage.persistencia";
import { IniciarSesion } from "../sesion/aplicacion/casoDeUso/IniciarSesion.cu";
import { FORMATO_CONTRASENA_INVALIDA } from "../sesion/infraestructura/excepciones/contrasena.exepcion";
import { FORMATO_CORREO_ELECTRONICO_NO_VALIDO } from "../sesion/infraestructura/excepciones/correoElectronico.excepcion";



jest.mock(
    "../sesion/infraestructura/AutentificacionBasica"
);

describe("Autentificacion", () => {
    let Implementacion: AutentificacionBasica;
    let persistenciaImplementacion: IServicioPersistencia;

    beforeEach(() => {
        persistenciaImplementacion = new LocalStoragePersistencia();
        Implementacion = new AutentificacionBasica(
            persistenciaImplementacion
        );
    });

    it("Inicio de sesion con credenciales basicas", () => {
        const DATOS_A_USAR = RESPUESTA_INICIO_SESION_VALIDO;

        //Mockeamos metodo con datos de respuesta que queremos devolver
        AutentificacionBasica.prototype.iniciarSesion =
            jest.fn().mockImplementation(() => {
                return Resultado.ok<any>(DATOS_A_USAR);
            });

        //Inicializamos Caso de Uso
        const CU = new IniciarSesion(Implementacion);
        const resultadoCU = CU.ejecutar({
            correoElectronico: "",
            contraseña: "Guaicaipuro1"
        });

        return resultadoCU.then((data) => {
            if (data.esFallido) {
                console.error("[TEST ERROR] ", data.error);
            }
            expect(data.esExitoso).toBeTruthy();
            expect(data.esFallido).toBeFalsy();

            
        });
    });


});