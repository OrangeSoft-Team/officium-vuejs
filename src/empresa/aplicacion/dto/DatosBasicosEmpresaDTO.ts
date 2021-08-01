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
    habilidad: HabilidadDTO[];
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
    habilidad: string[];
}
