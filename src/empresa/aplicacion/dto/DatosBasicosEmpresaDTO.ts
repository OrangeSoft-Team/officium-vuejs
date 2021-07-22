import { HabilidadDTO } from "@/comun/aplicacion/dtos/HabilidadDTO";
import { DireccionDTO } from "../../../comun/aplicacion/dtos/DireccionDTO";
import { Direccion } from "../../../comun/dominio/entidades/Direccion";
export interface DatosBasicosEmpresaDTO {
    uuidEmpresa?: string;
    nombreEmpresa: string;
    correoElectronico: string;
    requisitosEspeciales?: string;
    //direccion: Direccion;
    calleUno: string;
    calleDos?: string;
    codigoPostal: string;
    uuidPais: string;
    uuidEstado: string;
    uuidCiudad: string;
    //habilidad: HabilidadDTO[]
}
