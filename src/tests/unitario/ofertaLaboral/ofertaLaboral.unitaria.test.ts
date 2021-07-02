import { Resultado } from "../../../comun/dominio/resultado";
import { OfertaLaboralEmpresaDTO } from "../../../ofertaLaboral/aplicacion/dto/OfertaLaboralEmpresaDTO";
import { JSONOfertaLaboralRepositorio } from "../../../ofertaLaboral/infraestructura/JSON/JSONOfertaLaboral.repositorio";
import { ObtenerOfertaLaboral } from "../../../ofertaLaboral/aplicacion/casoDeUso/ObtenerOfertaLaboralDetalle.cu";
import { ObtenerOfertasLaboralesActivas } from "../../../ofertaLaboral/aplicacion/casoDeUso/ObtenerOfertasLaboralesActivas.cu";
import { CrearOfertaLaboral } from "../../../ofertaLaboral/aplicacion/casoDeUso/CrearOfertaLaboral.cu";
import { NUMERO_VACANTES_NO_VALIDA } from "../../../ofertaLaboral/dominio/excepciones/numeroVacantesOferta.excepcion";
import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import {
    CREAR_OFERTA_LABORAL_DATOS_INTERFAZ_VALIDA,
    OFERTAS_LABORALES_RESPUESTA_CON_ERROR_VACANTES,
    OFERTA_LABORAL_RESPUESTA_VALIDA,
} from "../../../ofertaLaboral/infraestructura/JSON/respuestas/IndividualOfertaLaboral";
import { OFERTAS_LABORALES_RESPUESTA_VALIDA } from "../../../ofertaLaboral/infraestructura/JSON/respuestas/ListadoOfertasLaborales";

jest.mock(
    "../../../ofertaLaboral/infraestructura/JSON/JSONOfertaLaboral.repositorio"
);

describe("Obtener Ofertas Laborales Activas", () => {
    let repoImplementacion: JSONOfertaLaboralRepositorio;
    let persistenciaImplemetnacion: IServicioPersistencia;

    beforeEach(() => {
        persistenciaImplemetnacion = new LocalStoragePersistencia();
        repoImplementacion = new JSONOfertaLaboralRepositorio(
            persistenciaImplemetnacion
        );
    });

    it("Debe obtener un arreglo de ofertas laborales activas válidas de la empresa", () => {
        const DATOS_A_USAR = OFERTAS_LABORALES_RESPUESTA_VALIDA;

        //Mockeamos metodo con datos de respuesta que queremos devolver
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

        //Mockeamos metodo con datos de respuesta que queremos devolver
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
    let persistenciaImplemetnacion: IServicioPersistencia;

    beforeEach(() => {
        persistenciaImplemetnacion = new LocalStoragePersistencia();
        repoImplementacion = new JSONOfertaLaboralRepositorio(
            persistenciaImplemetnacion
        );
    });

    it("Debe obtener el detalle de una oferta laboral activa", () => {
        const DATOS_A_USAR = OFERTA_LABORAL_RESPUESTA_VALIDA;

        //Mockeamos metodo con datos de respuesta que queremos devolver
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
    let persistenciaImplemetnacion: IServicioPersistencia;

    beforeEach(() => {
        persistenciaImplemetnacion = new LocalStoragePersistencia();
        repoImplementacion = new JSONOfertaLaboralRepositorio(
            persistenciaImplemetnacion
        );
    });

    it("Debe crear una nueva oferta laboral y obtener el respuesta exitosa ", () => {
        const DATOS_A_USAR = CREAR_OFERTA_LABORAL_DATOS_INTERFAZ_VALIDA;

        //Mockeamos metodo con datos de respuesta que queremos devolver
        JSONOfertaLaboralRepositorio.prototype.crearOfertaLaboral = jest
            .fn()
            .mockImplementation(() => {
                return Resultado.ok<OperacionExitosaDTO>({
                    mensaje: OPERACION_EXITOSA,
                });
            });

        //Inicializamos Caso de Uso
        const CU = new CrearOfertaLaboral(repoImplementacion);
        const resultadoCU = CU.ejecutar(DATOS_A_USAR);

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
