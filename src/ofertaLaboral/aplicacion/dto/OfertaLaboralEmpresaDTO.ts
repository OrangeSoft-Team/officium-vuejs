export interface OfertaLaboralEmpresaDTO {
    idOfertaLaboral?: string;
    titulo: string;
    fechaPublicacion?: string;
    cargo: string;
    sueldo: number;
    duracionEstimadaValor: number;
    duracionEstimadaEscala: string;
    turnoTrabajo: string;
    numeroVacantes: number;
    descripcion?: string;
    estado?: string;
}

export interface OfertaLaboralTrabajoDTO {
    titulo: string;
    cargo: string;
    duracionEstimadaValor?: number;
    duracionEstimadaEscala?: string;
    turnoTrabajo?: string;
    descripcion?: string;
}
