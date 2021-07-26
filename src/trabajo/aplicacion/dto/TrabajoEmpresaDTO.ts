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
    nombrePais?: string;
    nombreEstado?: string;
    nombreCiudad?: string;
    numeroTelefonicoEmpleadoEmpleado?: string;
    correoElectronicoEmpleado?: string;
    descripcion?: string;
    valorDuracion?: number;
    escalaDuracion?: string;
    turnoTrabajo?: string;
    fechaCulminacionTrabajo?: string;
}

export interface TrabajoEmpresaResumidoDTO {
    uuid?: string;
    titulo: string;
    fechaInicioTrabajo: string;
    nombreCompletoEmpleado: string;
    cargo: string;
    estatus: string;
    //Para detalle:
    uuidEmpleado?: string;
    direccionEmpleado?: string;
    nombrePais?: string;
    nombreEstado?: string;
    nombreCiudad?: string;
    numeroTelefonicoEmpleadoEmpleado?: string;
    correoElectronicoEmpleado?: string;
    descripcion?: string;
    valorDuracion?: number;
    escalaDuracion?: string;
    turnoTrabajo?: string;
    fechaCulminacionTrabajo?: string;
}
