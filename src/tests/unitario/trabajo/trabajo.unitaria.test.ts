import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import { ITrabajoRepo } from "../../../trabajo/aplicacion/ITrabajos.repositorio";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import { JSONTrabajosRepositorio } from "../../../trabajo/infraestructura/JSON/JSONTrabajos.repositorio";
import { TRABAJOS_EMPRESA_VALIDA } from "../../../trabajo/infraestructura/JSON/respuestas/ListadoTrabajos";
import { ObtenerTrabajos } from "../../../trabajo/aplicacion/casoDeUso/ObtenerTrabajos.cu";
import { LISTADO_TRABAJOS_DETALLE } from "../../../trabajo/infraestructura/JSON/respuestas/ListadoDetalleTrabajos";
import { ObtenerTrabajoDetalle } from "../../../trabajo/aplicacion/casoDeUso/ObtenerTrabajoDetalle.cu";
import { IServicioPais } from "../../../comun/aplicacion/IServicioPais";
import { IServicioEstado } from "../../../comun/aplicacion/IServicioEstado";
import { IServicioCiudad } from "../../../comun/aplicacion/IServicioCiudad";
import { JSONPaisServicio } from "../../../comun/infraestructura/JSON/JSONPais.servicio";
import { JSONEstadoServicio } from "../../../comun/infraestructura/JSON/JSONEstado.servicio";
import { JSONCiudadServicio } from "../../../comun/infraestructura/JSON/JSONCiudad.servicio";
import { CulminarTrabajo } from "../../../trabajo/aplicacion/casoDeUso/CulminarTrabajo.cu";
import { OPERACION_EXITOSA } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { CancelarTrabajo } from "../../../trabajo/aplicacion/casoDeUso/CancelarTrabajo.cu";

jest.mock("../../../trabajo/infraestructura/JSON/JSONTrabajos.repositorio");

let repoImplementacion: ITrabajoRepo;
let persistenciaImplemetnacion: IServicioPersistencia;
let paisImplementacion: IServicioPais;
let estadoImplementacion: IServicioEstado;
let ciudadImplementacion: IServicioCiudad;

beforeEach(() => {
    persistenciaImplemetnacion = new LocalStoragePersistencia();
    repoImplementacion = new JSONTrabajosRepositorio(
        persistenciaImplemetnacion
    );
});

describe("Obtener listado de trabajos de la empresa", () => {
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

describe("Obtener trabajo detallado", () => {
    const DATO_A_USAR = LISTADO_TRABAJOS_DETALLE[0];
    paisImplementacion = new JSONPaisServicio();
    estadoImplementacion = new JSONEstadoServicio();
    ciudadImplementacion = new JSONCiudadServicio();

    it("Debe obtener el detalle de un trabajo de la empresa", () => {
        //Inicializamos Caso de Uso
        const CU = new ObtenerTrabajoDetalle(
            repoImplementacion,
            paisImplementacion,
            estadoImplementacion,
            ciudadImplementacion
        );
        const resultadoCU = CU.ejecutar({
            uuid_trabajo: <string>DATO_A_USAR.uuid,
        });

        return resultadoCU.then((data) => {
            if (data.esFallido) {
                console.error("[TEST ERROR] ", data.error);
            }
            expect(data.esExitoso).toBeTruthy();
            expect(data.esFallido).toBeFalsy();
            expect(data.getValue().uuid).toBe(DATO_A_USAR.uuid);
        });
    });
});

describe("Culminar un trabajo de la empresa", () => {
    it("Se culmina exitosamente un trabajo", () => {
        const CU = new CulminarTrabajo(repoImplementacion);
        const resultadoCU = CU.ejecutar({
            uuid_trabajo: "00000-000000-0-0-0000",
        });

        return resultadoCU.then((data) => {
            if (data.esFallido) {
                console.error("[TEST ERROR] ", data.error);
            }
            expect(data.esExitoso).toBeTruthy();
            expect(data.esFallido).toBeFalsy();
            expect(data.getValue().mensaje).toBe(OPERACION_EXITOSA);
        });
    });
});

describe("Cancelar un trabajo de la empresa", () => {
    it("Se cancela exitosamente un trabajo", () => {
        const CU = new CancelarTrabajo(repoImplementacion);
        const resultadoCU = CU.ejecutar({
            uuid_trabajo: "00000-000000-0-0-0000",
        });

        return resultadoCU.then((data) => {
            if (data.esFallido) {
                console.error("[TEST ERROR] ", data.error);
            }
            expect(data.esExitoso).toBeTruthy();
            expect(data.esFallido).toBeFalsy();
            expect(data.getValue().mensaje).toBe(OPERACION_EXITOSA);
        });
    });
});
