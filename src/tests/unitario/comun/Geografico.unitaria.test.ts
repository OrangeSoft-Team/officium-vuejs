import { IServicioEstado } from "../../../comun/aplicacion/IServicioEstado";
import { IServicioPais } from "../../../comun/aplicacion/IServicioPais";
import { IServicioCiudad } from "../../../comun/aplicacion/IServicioCiudad";
import { JSONEstadoServicio } from "../../../comun/infraestructura/JSON/JSONEstado.servicio";
import { JSONPaisServicio } from "../../../comun/infraestructura/JSON/JSONPais.servicio";
import { JSONCiudadServicio } from "../../../comun/infraestructura/JSON/JSONCiudad.servicio";
import {
    ObtenerEstados,
    SolicitudEstadoDTO,
} from "../../../comun/aplicacion/casosDeUso.geografico/ObtenerEstados.cu";
import { ObtenerPais } from "../../../comun/aplicacion/casosDeUso.geografico/ObtenerPaises.cu";
import { LISTADO_PAISES } from "../../../comun/infraestructura/JSON/respuestas/ListadoPais";
import { LISTADO_ESTADO_VENEZUELA } from "../../../comun/infraestructura/JSON/respuestas/ListadoEstado";
import {
    ObtenerCiudades,
    SolicitudCiudadDTO,
} from "../../../comun/aplicacion/casosDeUso.geografico/ObtenerCiudades.cu";
import { LISTADO_CIUDADES_DISTRITO } from "../../../comun/infraestructura/JSON/respuestas/ListadoCiudades";

describe("[Unitaria] Obtener paises", () => {
    let servicioPais: IServicioPais;

    beforeEach(() => {
        //Inyectamos servicio
        servicioPais = new JSONPaisServicio();
    });

    it("Solicitamos lista de paises", () => {
        //Inicializamos Caso de Uso
        const CU = new ObtenerPais(servicioPais);

        const resultadoCUOrError = CU.ejecutar();

        return resultadoCUOrError.then((respuesta) => {
            if (respuesta.esFallido) {
                console.log("[TEST ERROR] ", respuesta.error);
            }

            expect(respuesta.esExitoso).toBeTruthy();
            expect(respuesta.esFallido).toBeFalsy();
            expect(respuesta.getValue()).toStrictEqual(LISTADO_PAISES);
        });
    });
});

describe("[Unitaria] Obtener estados dado un pais", () => {
    let servicioEstado: IServicioEstado;

    beforeEach(() => {
        //Inyectamos servicio
        servicioEstado = new JSONEstadoServicio();
    });

    it("Solicitamos lista de estados de Venezuela", () => {
        //Inicializamos Caso de Uso
        const CU = new ObtenerEstados(servicioEstado);

        const paisSolicitud: SolicitudEstadoDTO = {
            idPais: "00000000-0000-0000-C000-000000000050",
        };
        const resultadoCUOrError = CU.ejecutar(paisSolicitud);

        return resultadoCUOrError.then((respuesta) => {
            if (respuesta.esFallido) {
                console.log("[TEST ERROR] ", respuesta.error);
            }

            expect(respuesta.esExitoso).toBeTruthy();
            expect(respuesta.esFallido).toBeFalsy();
            expect(respuesta.getValue()).toStrictEqual(
                LISTADO_ESTADO_VENEZUELA
            );
        });
    });
});

describe("[Unitaria] Obtener ciudades dado un estado", () => {
    let servicioCiudad: IServicioCiudad;

    beforeEach(() => {
        //Inyectamos servicio
        servicioCiudad = new JSONCiudadServicio();
    });

    it("Solicitamos lista de ciudades del estado Distrito Capital", () => {
        //Inicializamos Caso de Uso
        const CU = new ObtenerCiudades(servicioCiudad);

        const estadoSolicitud: SolicitudCiudadDTO = {
            idEstado: "00000000-0000-0000-C000-000000000051",
        };
        const resultadoCUOrError = CU.ejecutar(estadoSolicitud);

        return resultadoCUOrError.then((respuesta) => {
            if (respuesta.esFallido) {
                console.log("[TEST ERROR] ", respuesta.error);
            }

            expect(respuesta.esExitoso).toBeTruthy();
            expect(respuesta.esFallido).toBeFalsy();
            expect(respuesta.getValue()).toStrictEqual(
                LISTADO_CIUDADES_DISTRITO
            );
        });
    });
});
