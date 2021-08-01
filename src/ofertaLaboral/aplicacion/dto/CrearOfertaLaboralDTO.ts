import { HabilidadDTO } from "../../../comun/aplicacion/dtos/HabilidadDTO";
export interface CrearOfertaLaboralDTO {
    titulo: string;
    cargo: string;
    sueldo: number;
    duracionEstimadaValor: number;
    duracionEstimadaEscala: string;
    turnoTrabajo: string;
    numeroVacantes: number;
    descripcion: string;
    requisitosEspeciales?: string;
    uuidHabilidades: string[];
}
