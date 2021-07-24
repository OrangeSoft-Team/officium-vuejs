import { TrabajoEmpresaDTO } from "../../../aplicacion/dto/TrabajoEmpresaDTO";

export const TRABAJOS_EMPRESA_VALIDA: TrabajoEmpresaDTO[] = [
    {
        uuid: "000000-aaaaa-0a0000a0a0a0-a",
        titulo: "Trabajo de pruebas JSON",
        fechaInicioTrabajo: "24/01/2021",
        primerNombreEmpleado: "Pedro",
        primerApellidoEmpleado: "Perez",
        cargo: "Repartidor",
        estatus: "en progreso",
    },
    {
        uuid: "000000-aaaaa-2222222222",
        titulo: "Trabajo de pruebas JSON AAAA",
        fechaInicioTrabajo: "01/10/2021",
        primerNombreEmpleado: "Migeul",
        primerApellidoEmpleado: "Perez",
        cargo: "Limpiador",
        estatus: "en progreso",
    },
    {
        uuid: "000000-aaaaa-555555555555",
        titulo: "DOS Trabajo de pruebas JSON",
        fechaInicioTrabajo: "14/01/2021",
        primerNombreEmpleado: "Juan",
        primerApellidoEmpleado: "Perez",
        cargo: "Manager",
        estatus: "culminado",
    },
];
