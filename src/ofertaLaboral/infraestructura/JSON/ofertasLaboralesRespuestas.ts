import { OfertaLaboralEmpresaDTO } from "../../aplicacion/dto/OfertaLaboralEmpresaDTO";

export const OFERTAS_LABORALES_RESPUESTA_VALIDA: OfertaLaboralEmpresaDTO[] = [
    {
        titulo: "Desarrollador web para aplicación Officium",
        fechaPublicacion: "24/06/2021",
        cargo: "Dev frontend",
        sueldo: 5000,
        duracionEstimadaValor: 6,
        duracionEstimadaEscala: "semana",
        turnoTrabajo: "diurno",
        numeroVacantes: 1,
    },
    {
        titulo: "Arquitecto de Software para aplicación Officium",
        fechaPublicacion: "10/06/2021",
        cargo: "Arq. Software",
        sueldo: 69051.9,
        duracionEstimadaValor: 6,
        duracionEstimadaEscala: "día",
        turnoTrabajo: "diurno",
        numeroVacantes: 15,
    },
    {
        titulo: "Encargado de tienda",
        fechaPublicacion: "31/05/2021",
        cargo: "Encargado general de tienda IBM",
        sueldo: 65898,
        duracionEstimadaValor: 6,
        duracionEstimadaEscala: "mes",
        turnoTrabajo: "diurno",
        numeroVacantes: 4,
    },
];

export const OFERTAS_LABORALES_RESPUESTA_CON_ERROR_VACANTES: OfertaLaboralEmpresaDTO[] =
    [
        {
            titulo: "Encargado de tienda",
            fechaPublicacion: "31/05/2021",
            cargo: "Encargado general de tienda IBM",
            sueldo: 65898,
            duracionEstimadaValor: 6,
            duracionEstimadaEscala: "mes",
            turnoTrabajo: "diurno",
            numeroVacantes: 564,
        },
    ];
