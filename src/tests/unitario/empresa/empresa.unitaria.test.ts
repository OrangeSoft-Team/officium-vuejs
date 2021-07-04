import { IEmpresaRepo } from "../../../empresa/aplicacion/IEmpresa.repositorio";
import { JSONRepositorioDatosBasicos } from "../../../empresa/infraestructura/JSON/JSONRepositorioDatosBasicos";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import { ObtenerOfertaLaboral } from "../../../empresa/aplicacion/casoDeUso/ObtenerDatosBasicos.cu";
import { DATOS_BASICOS_EMPRESA_VALIDOS } from "../../../empresa/infraestructura/JSON/RespuestasDatosBasicos";
import { ActualizarDatosBasicos } from "../../../empresa/aplicacion/casoDeUso/ActualizarDatosBasicos.cu";
import { OperacionExitosaDTO } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { OPERACION_EXITOSA } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";

jest.mock("../../../empresa/infraestructura/JSON/JSONRepositorioDatosBasicos");

describe("Obtener datos básicos de una Empresa", () => {
    let respositorioEmpresa: IEmpresaRepo;

    beforeEach(() => {
        respositorioEmpresa = new JSONRepositorioDatosBasicos(
            new LocalStoragePersistencia()
        );
    });

    it("Solicitamos datos básicos de una empresa", () => {
        const CU = new ObtenerOfertaLaboral(respositorioEmpresa);

        const resultadoCU = CU.ejecutar({
            idEmpresa: "",
        });

        return resultadoCU.then((respuesta) => {
            if (respuesta.esFallido) {
                console.log("[ERROR TEST] ", respuesta.error);
            }

            expect(respuesta.esExitoso).toBeTruthy();
            expect(respuesta.esFallido).toBeFalsy();
            expect(respuesta.getValue()).toStrictEqual(
                DATOS_BASICOS_EMPRESA_VALIDOS
            );
        });
    });
});

describe("Actualizar datos básicos de una Empresa", () => {
    let respositorioEmpresa: IEmpresaRepo;

    beforeEach(() => {
        respositorioEmpresa = new JSONRepositorioDatosBasicos(
            new LocalStoragePersistencia()
        );
    });

    it("Actualizamos datos básicos de una empresa con información válida", () => {
        const CU = new ActualizarDatosBasicos(respositorioEmpresa);

        const resultadoCU = CU.ejecutar(DATOS_BASICOS_EMPRESA_VALIDOS);

        return resultadoCU.then((respuesta) => {
            if (respuesta.esFallido) {
                console.log("[ERROR TEST] ", respuesta.error);
            }

            expect(respuesta.esExitoso).toBeTruthy();
            expect(respuesta.esFallido).toBeFalsy();
            expect(respuesta.getValue()).toStrictEqual({
                mensaje: OPERACION_EXITOSA,
            } as OperacionExitosaDTO);
        });
    });
});
