import { HabilidadDTO } from "../../../comun/aplicacion/dtos/HabilidadDTO";
export interface ModificarOfertaLaboralDTO {
    titulo: string;
    cargo: string;
    sueldo: number;
    duracionEstimadaValor: number;
    duracionEstimadaEscala: string;
    turnoTrabajo: string;
    numeroVacantes: number;
    descripcion: string;
    requisitosEspeciales?: string;
    habilidades: string[];
}
