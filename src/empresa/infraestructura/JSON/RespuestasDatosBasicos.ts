import { SolicitudActualizarDatosBasicosDTO } from "../../aplicacion/casoDeUso/ActualizarDatosBasicos.cu";
import { DatosBasicosEmpresaDTO } from "../../aplicacion/dto/DatosBasicosEmpresaDTO";

export const DATOS_BASICOS_EMPRESA_VALIDOS: DatosBasicosEmpresaDTO = {
    nombreEmpresa: "IBM VE",
    correoElectronico: "ibm.servicios@ibm.com",
    /*
    direccion: {
        calleUno: "Av. Principal Libertador",
        codigoPostal: "1020"
    },
    */
    uuidPais: "00000000-0000-0000-C000-000000000050",
    uuidEstado: "00000000-0000-0000-C000-000000000051",
    uuidCiudad: "00000000-0000-0000-C000-000000000152",
    calleUno: "Calle principal de Caracas",
    codigoPostal: "1020",
    habilidades: [
        {
            uuid: "sa5d45s4d5sa",
            nombre: "Hace nudos",
            categoria: "manual",
        },
        {
            uuid: "otrouuid",
            nombre: "Nado sincronizado",
            categoria: "deporte?",
        },
    ],
};

export const DATOS_BASICOS_EMPRESA_VALIDOS_ACTUALIZAR: SolicitudActualizarDatosBasicosDTO =
    {
        nombreEmpresa: "IBM VE",
        /*
    direccion: {
        calleUno: "Av. Principal Libertador",
        codigoPostal: "1020"
    },
    */
        uuidPais: "00000000-0000-0000-C000-000000000050",
        uuidEstado: "00000000-0000-0000-C000-000000000051",
        uuidCiudad: "00000000-0000-0000-C000-000000000152",
        calleUno: "Calle principal de Caracas",
        codigoPostal: "1020",
        habilidades: [
            {
                uuid: "sa5d45s4d5sa",
                nombre: "Hace nudos",
                categoria: "manual",
            },
            {
                uuid: "otrouuid",
                nombre: "Nado sincronizado",
                categoria: "deporte?",
            },
        ],
    };
