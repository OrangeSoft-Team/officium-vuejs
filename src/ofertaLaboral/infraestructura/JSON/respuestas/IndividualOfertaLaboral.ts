import { SolicitudCreacionOfertaLaboralDTO } from "../../../aplicacion/casoDeUso/CrearOfertaLaboral.cu";
import { OfertaLaboralEmpresaDTO } from "../../../aplicacion/dto/OfertaLaboralEmpresaDTO";

export const OFERTA_LABORAL_RESPUESTA_VALIDA: OfertaLaboralEmpresaDTO = {
    uuid: "3",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    estado: "publicado",
    titulo: "Encargado de tienda",
    fechaPublicacion: "31/05/2021",
    cargo: "Encargado general de tienda IBM",
    sueldo: 65898,
    duracionEstimadaValor: 6,
    duracionEstimadaEscala: "mes",
    turnoTrabajo: "diurno",
    numeroVacantes: 4
};

export const OFERTAS_LABORALES_RESPUESTA_CON_ERROR_VACANTES: OfertaLaboralEmpresaDTO[] =
    [
        {
            titulo: "Encargado de tienda",
            descripcion:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            estado: "publicado",
            fechaPublicacion: "31/05/2021",
            cargo: "Encargado general de tienda IBM",
            sueldo: 65898,
            duracionEstimadaValor: 6,
            duracionEstimadaEscala: "mes",
            turnoTrabajo: "diurno",
            numeroVacantes: 564,
        },
    ];

export const CREAR_OFERTA_LABORAL_DATOS_INTERFAZ_VALIDA: SolicitudCreacionOfertaLaboralDTO =
    {
        titulo: "Encargado de tienda",
        cargo: "Encargado general de tienda IBM",
        sueldo: 65898,
        duracionEstimadaValor: 6,
        duracionEstimadaEscala: "mes",
        turnoTrabajo: "diurno",
        numeroVacantes: 4,
        descripcion: "Encargado general de tienda IBM Encargado de tienda",
        habilidades: [
            {
                uuid: "00000000-0000-0000-C000-000000000052",
                nombre: "Hab 1",
                categoria: "cat 1"
            }
        ]
    };
