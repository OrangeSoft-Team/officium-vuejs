import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import { ITrabajoRepo } from "../../../trabajo/aplicacion/ITrabajos.repositorio";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import { JSONTrabajosRepositorio } from "../../../trabajo/infraestructura/JSON/JSONTrabajos.repositorio";
import { TRABAJOS_EMPRESA_VALIDA } from "../../../trabajo/infraestructura/JSON/respuestas/ListadoTrabajos";
import { ObtenerTrabajos } from "../../../trabajo/aplicacion/casoDeUso/ObtenerTrabajos.cu";

jest.mock("../../../trabajo/infraestructura/JSON/JSONTrabajos.repositorio");

describe("Obtener listado de trabajos de la empresa", () => {
    let repoImplementacion: ITrabajoRepo;
    let persistenciaImplemetnacion: IServicioPersistencia;

    beforeEach(() => {
        persistenciaImplemetnacion = new LocalStoragePersistencia();
        repoImplementacion = new JSONTrabajosRepositorio(
            persistenciaImplemetnacion
        );
    });

    it("Obtiene listado de trabajos validos", () => {
        const DATOS_A_USAR = TRABAJOS_EMPRESA_VALIDA;

        //Inicializamos Caso de Uso
        const CU = new ObtenerTrabajos(repoImplementacion);
        const resultadoCU = CU.ejecutar();

        return resultadoCU.then((data) => {
            if (data.esFallido) {
                console.error("[TEST ERROR] ", data.error);
            }
            expect(data.esExitoso).toBeTruthy();
            expect(data.esFallido).toBeFalsy();
            expect(data.getValue()).toHaveLength(DATOS_A_USAR.length);
        });
    });
});
