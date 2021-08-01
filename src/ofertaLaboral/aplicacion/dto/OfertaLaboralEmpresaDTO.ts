import { HabilidadDTO } from "../../../comun/aplicacion/dtos/HabilidadDTO";

export interface OfertaLaboralEmpresaDTO {
    uuid?: string;
    titulo: string;
    fechaPublicacion?: string;
    fechaModificacion?: string;
    cargo: string;
    sueldo: number;
    descripcion?: string;
    duracionEstimadaValor: number;
    duracionEstimadaEscala: string;
    turnoTrabajo: string;
    numeroVacantes: number;
    estado?: string;
    requisitosEspeciales?: string;
    habilidades?: HabilidadDTO[];
}

export interface OfertaLaboralTrabajoDTO {
    titulo: string;
    cargo: string;
    duracionEstimadaValor?: number;
    duracionEstimadaEscala?: string;
    turnoTrabajo?: string;
    descripcion?: string;
}
