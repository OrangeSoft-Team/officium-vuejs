import { HabilidadDTO } from "@/comun/aplicacion/dtos/HabilidadDTO";

export interface DatosBasicosEmpresaDTO {
    uuidEmpresa?: string;
    nombreEmpresa: string;
    correoElectronico?: string;
    requisitosEspeciales?: string;
    //direccion: Direccion;
    calleUno: string;
    calleDos?: string;
    codigoPostal: string;
    uuidPais: string;
    uuidEstado: string;
    uuidCiudad: string;
    habilidades: HabilidadDTO[];
}

export interface ActualizarDatosBasicosEmpresaDTO {
    nombreEmpresa: string;
    requisitosEspeciales?: string;
    calleUno: string;
    calleDos?: string;
    codigoPostal: string;
    uuidPais: string;
    uuidEstado: string;
    uuidCiudad: string;
    uuidHabilidades: string[];
}
