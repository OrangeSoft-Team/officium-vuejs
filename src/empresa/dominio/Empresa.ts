import { Entidad } from "../../comun/dominio/entidad";
import { Resultado } from "../../comun/dominio/resultado";
import { Identificador } from "../../comun/dominio/valueObjects/Identificador";
import { DireccionCalle } from "../../comun/dominio/valueObjects/direccionCalle";
import { Correo } from "../../comun/dominio/valueObjects/correoElectronico";
import { codigoPostal } from "../../comun/dominio/valueObjects/codigoPostal";
import { NombreEmpresa } from "./valueObjects/nombreEmpresa";

interface EmpresaProps {
    idEmpresa?: Identificador;
    nombre: NombreEmpresa;
    correoElectronico: Correo;
    direccionCalle: DireccionCalle;
    codigoPostal: codigoPostal;
}

export class Empresa extends Entidad<EmpresaProps> {
    public static crear(props: EmpresaProps): Resultado<Empresa> {
        if (props.idEmpresa) {
            let idOrError = Identificador.crear(props.idEmpresa.valor());

            if (idOrError.esFallido)
                return Resultado.falla<any>(idOrError.error);
        }

        let nombreOrError = NombreEmpresa.crear(props.nombre.valor());
        if (nombreOrError.esFallido)
            return Resultado.falla<any>(nombreOrError.error);

        let correoOrError = Correo.crear(props.correoElectronico.valor());
        if (correoOrError.esFallido)
            return Resultado.falla<any>(correoOrError.error);

        let direccionOrError = DireccionCalle.crear(props.direccionCalle.valor());
        if (direccionOrError.esFallido)
            return Resultado.falla<any>(direccionOrError.error);

        let codigoPostalOrError = codigoPostal.crear(
            props.codigoPostal.valor()
        );
        if (codigoPostalOrError.esFallido)
            return Resultado.falla<any>(codigoPostalOrError.esFallido);

        return Resultado.ok<Empresa>(new Empresa(props));
    }
}
