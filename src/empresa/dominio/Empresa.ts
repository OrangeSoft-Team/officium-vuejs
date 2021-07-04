import { Entidad } from "../../comun/dominio/entidad";
import { Resultado } from "../../comun/dominio/resultado";
import { Identificador } from "../../comun/dominio/valueObjects/Identificador";
import { DireccionCalle } from "../../comun/dominio/valueObjects/direccionCalle";
import { Correo } from "../../comun/dominio/valueObjects/correoElectronico";
import { codigoPostal } from "../../comun/dominio/valueObjects/codigoPostal";
import { NombreEmpresa } from "./valueObjects/nombreEmpresa";
import { Pais } from "../../comun/dominio/entidades/Pais";
import { Estado } from "../../comun/dominio/entidades/Estado";
import { Ciudad } from "../../comun/dominio/entidades/Ciudad";

export interface EmpresaProps {
    idEmpresa?: Identificador;
    nombre: NombreEmpresa;
    correoElectronico: Correo;
    direccionCalle: DireccionCalle;
    codigoPostal: codigoPostal;
    pais: Pais;
    estado: Estado;
    ciudad: Ciudad;
}

export class Empresa extends Entidad<EmpresaProps> {
    public static crear(props: EmpresaProps): Resultado<Empresa> {
        return Resultado.ok<Empresa>(new Empresa(props));
    }
}
