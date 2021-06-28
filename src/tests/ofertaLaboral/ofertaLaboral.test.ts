import { Resultado } from "../../comun/dominio/resultado";
import { OfertaLaboralEmpresaDTO } from "../../ofertaLaboral/aplicacion/dto/OfertaLaboralEmpresaDTO";
import { JSONOfertaLaboralRepositorio } from "../../ofertaLaboral/infraestructura/JSON/JSONOfertaLaboral.repositorio";
import { ObtenerOfertaLaboral } from "../../ofertaLaboral/aplicacion/casoDeUso/ObtenerOfertaLaboralDetalle.cu";
import { ObtenerOfertasLaboralesActivas } from "../../ofertaLaboral/aplicacion/casoDeUso/ObtenerOfertasLaboralesActivas.cu";
import { CrearOfertaLaboral } from "../../ofertaLaboral/aplicacion/casoDeUso/CrearOfertaLaboral.cu";
import {
    OFERTAS_LABORALES_RESPUESTA_CON_ERROR_VACANTES,
    OFERTAS_LABORALES_RESPUESTA_VALIDA,
    OFERTA_LABORAL_RESPUESTA_VALIDA,
} from "../../ofertaLaboral/infraestructura/JSON/ofertasLaboralesRespuestas";
import { NUMERO_VACANTES_NO_VALIDA } from "../../ofertaLaboral/dominio/excepciones/numeroVacantesOferta.excepcion";
import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";

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

describe("Obtener Detalle de Oferta Laboral", () => {
    let repoImplementacion: JSONOfertaLaboralRepositorio;

    beforeEach(() => {
        repoImplementacion = new JSONOfertaLaboralRepositorio();
    });

    it("Debe obtener el detalle de una oferta laboral activa", () => {
        const DATOS_A_USAR = OFERTA_LABORAL_RESPUESTA_VALIDA;
        JSONOfertaLaboralRepositorio.prototype.obtenerOfertaLaboralDetalle =
            jest.fn().mockImplementation(() => {
                return Resultado.ok<OfertaLaboralEmpresaDTO>(DATOS_A_USAR);
            });

        //Inicializamos Caso de Uso
        const CU = new ObtenerOfertaLaboral(repoImplementacion);
        const resultadoCU = CU.ejecutar({
            idOfertaLaboral: "",
        });

        return resultadoCU.then((data) => {
            if (data.esFallido) {
                console.error("[TEST ERROR] ", data.error);
            }
            expect(data.esExitoso).toBeTruthy();
            expect(data.esFallido).toBeFalsy();
            expect(data.getValue().idOfertaLaboral).toBe(
                DATOS_A_USAR.idOfertaLaboral
            );
        });
    });
});

describe("Crear Nueva Oferta Laboral", () => {
    let repoImplementacion: JSONOfertaLaboralRepositorio;

    beforeEach(() => {
        repoImplementacion = new JSONOfertaLaboralRepositorio();
    });

    it("Debe crear una nueva oferta laboral y obtener el respuesta exitosa ", () => {
        const DATOS_A_USAR = OFERTA_LABORAL_RESPUESTA_VALIDA;
        JSONOfertaLaboralRepositorio.prototype.crearOfertaLaboral = jest
            .fn()
            .mockImplementation(() => {
                return Resultado.ok<OperacionExitosaDTO>({
                    mensaje: OPERACION_EXITOSA,
                });
            });

        //Inicializamos Caso de Uso
        const CU = new CrearOfertaLaboral(repoImplementacion);
        const resultadoCU = CU.ejecutar({
            titulo: "Encargado de tienda",
            cargo: "Encargado general de tienda IBM",
            sueldo: 65898,
            duracionEstimadaValor: 6,
            duracionEstimadaEscala: "mes",
            turnoTrabajo: "diurno",
            numeroVacantes: 4,
            descripcion: "Encargado general de tienda IBM Encargado de tienda",
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
