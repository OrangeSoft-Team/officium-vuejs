import { Identificador } from "../../comun/dominio/valueObjects/Identificador";
import { PrimerNombre } from "./valueObject/primerNombre";
import { SegundoNombre } from "./valueObject/segundoNombre";
import { PrimerApellido } from "./valueObject/primerApellido";
import { SegundoApellido } from "./valueObject/segundoApellido";
import { Direccion } from "../../comun/dominio/entidades/Direccion";
import { Correo } from "../../comun/dominio/valueObjects/correoElectronico";
import { Pais } from "../../comun/dominio/entidades/Pais";
import { Estado } from "../../comun/dominio/entidades/Estado";
import { Ciudad } from "../../comun/dominio/entidades/Ciudad";
import { NumeroTelef } from "../../comun/dominio/valueObjects/numeroTelefonico";
import { Entidad } from "../../comun/dominio/entidad";
import { Resultado } from "../../comun/dominio/resultado";

export interface EmpleadoProps {
    identificadorEmpleado?: Identificador;
    primerNombre: PrimerNombre;
    segundoNombre?: SegundoNombre;
    primerApellido: PrimerApellido;
    segundoApellido?: SegundoApellido;
    direccion?: Direccion;
    correoElectronico?: Correo;
    telefono?: NumeroTelef;
    pais?: Pais;
    estado?: Estado;
    ciudad?: Ciudad;
}

export class Empleado extends Entidad<EmpleadoProps> {
    public static crear(props: EmpleadoProps): Resultado<Empleado> {
        //Creamos la entidad
        return Resultado.ok<Empleado>(new Empleado(props));
    }
}
