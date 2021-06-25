import { Resultado } from "../../comun/dominio/resultado";
import { OfertaLaboralEmpresaDTO } from "../../ofertaLaboral/aplicacion/dto/OfertaLaboralEmpresaDTO";
import { JSONOfertaLaboralRepositorio } from "../../ofertaLaboral/infraestructura/JSON/JSONOfertaLaboral.repositorio";
import { ObtenerOfertasLaboralesActivas } from "../../ofertaLaboral/aplicacion/casoDeUso/ObtenerOfertasLaboralesActivas.cu";
import {
    OFERTAS_LABORALES_RESPUESTA_CON_ERROR_VACANTES,
    OFERTAS_LABORALES_RESPUESTA_VALIDA,
} from "../../ofertaLaboral/infraestructura/JSON/ofertasLaboralesRespuestas";
import { NUMERO_VACANTES_NO_VALIDA } from "../../ofertaLaboral/dominio/excepciones/numeroVacantesOferta.excepcion";

jest.mock(
    "../../ofertaLaboral/infraestructura/JSON/JSONOfertaLaboral.repositorio"
);

describe("Obtener Ofertas Laborales Activas", () => {
    let repoImplementacion: JSONOfertaLaboralRepositorio;

    beforeEach(() => {
        repoImplementacion = new JSONOfertaLaboralRepositorio();
    });

    it("Debe obtener un arreglo de ofertas laborales activas válidas de la empresa", () => {
        const DATOS_A_USAR = OFERTAS_LABORALES_RESPUESTA_VALIDA;
        JSONOfertaLaboralRepositorio.prototype.obtenerOfertasLaboralesActivas =
            jest.fn().mockImplementation(() => {
                return Resultado.ok<OfertaLaboralEmpresaDTO[]>(DATOS_A_USAR);
            });

        //Inicializamos Caso de Uso
        const CU = new ObtenerOfertasLaboralesActivas(repoImplementacion);
        const resultadoCU = CU.ejecutar({
            idEmpresa: "",
        });

        return resultadoCU.then((data) => {
            if (data.esFallido) {
                console.error("[TEST ERROR] ", data.error);
            }
            expect(data.esExitoso).toBeTruthy();
            expect(data.esFallido).toBeFalsy();
            expect(data.getValue()).toHaveLength(DATOS_A_USAR.length);
        });
    });

    it("Debe fallar para número de vacantes inválido", () => {
        const DATOS_A_USAR = OFERTAS_LABORALES_RESPUESTA_CON_ERROR_VACANTES;
        JSONOfertaLaboralRepositorio.prototype.obtenerOfertasLaboralesActivas =
            jest.fn().mockImplementation(() => {
                return Resultado.ok<OfertaLaboralEmpresaDTO[]>(DATOS_A_USAR);
            });

        //Inicializamos Caso de Uso
        const CU = new ObtenerOfertasLaboralesActivas(repoImplementacion);
        const resultadoCU = CU.ejecutar({
            idEmpresa: "",
        });

        return resultadoCU.then((data) => {
            if (data.esFallido) {
                console.log("[TEST ERROR] ", data.error);
            }
            expect(data.esFallido).toBeTruthy();
            expect(data.error).toBe(NUMERO_VACANTES_NO_VALIDA);
        });
    });
});
