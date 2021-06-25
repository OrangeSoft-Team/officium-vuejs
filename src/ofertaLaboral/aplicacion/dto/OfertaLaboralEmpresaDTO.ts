export interface OfertaLaboralEmpresaDTO {
    idOfertaLaboral?: string;
    titulo: string;
    fechaPublicacion: string;
    cargo: string;
    sueldo: number;
    duracionEstimadaValor: number;
    duracionEstimadaEscala: string;
    turnoTrabajo: string;
    numeroVacantes: number;
    descripcion?: string;
    estado?: string;
}
