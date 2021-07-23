import { IServicioHabilidades } from "../../../comun/aplicacion/IServicioHabilidades";
import { JSONHabilidadServicio } from "../../../comun/infraestructura/JSON/JSONHabilidad.servicio";
import { obtenerHabilidades } from "../../../comun/aplicacion/casosDeUso/ObtenerHabilidades.cu";
import { LISTADO_HABILIDADES } from "../../../comun/infraestructura/JSON/respuestas/ListadoHabilidades";

describe("[Unitaria] Habilidades", () => {
    let habilidadesServico: IServicioHabilidades;

    beforeEach(() => {
        //Inyectamos servicio
        habilidadesServico = new JSONHabilidadServicio();
    });

    it("Obtener listado de habilidades posibles", () => {
        //Inicializamos caso de uso
        const CU = new obtenerHabilidades(habilidadesServico);

        const resultadoCUOrError = CU.ejecutar();

        return resultadoCUOrError.then((respuesta) => {
            if (respuesta.esFallido) {
                console.log("[TEST ERROR] ", respuesta.error);
            }

            //Validamos
            expect(respuesta.esExitoso).toBeTruthy();
            expect(respuesta.esFallido).toBeFalsy();
            expect(respuesta.getValue()).toStrictEqual(LISTADO_HABILIDADES);
        });
    });
});
