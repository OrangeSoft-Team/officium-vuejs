export interface TrabajoEmpresaDTO {
    uuid?: string;
    titulo: string;
    fechaInicioTrabajo: string;
    primerNombreEmpleado: string;
    segundoNombreEmpleado?: string;
    primerApellidoEmpleado: string;
    segundoApellidoEmpleado?: string;
    cargo: string;
    estatus: string;
    //Para detalle:
    uuidEmpleado?: string;
    calleUnoEmpleado?: string;
    calleDosEmpleado?: string;
    codigoPostalEmpleado?: string;
    uuidPais?: string;
    uuidEstado?: string;
    uuidCiudad?: string;
    numeroTelefonicoEmpleadoEmpleado?: string;
    correoElectronicoEmpleado?: string;
    descripcion?: string;
    valorDuracion?: number;
    escalaDuracion?: string;
    turnoTrabajo?: string;
    fechaCulminacionTrabajo?: string;
}
