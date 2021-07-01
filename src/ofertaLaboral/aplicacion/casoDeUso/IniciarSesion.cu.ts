import { CasoUso } from "../../../comun/aplicacion/casoUso";
import { Resultado } from "../../../comun/dominio/resultado";
import {IServicioAutentificacion} from "../IServicioAutentificacion";
import { OperacionExitosaDTO } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";


export interface DatosInicioSesionDTO {
    correoElectronico: string;
    contraseña: string;
}

export class IniciarSesion
implements
        CasoUso<
            DatosInicioSesionDTO,
            Resultado<OperacionExitosaDTO>
        >
{
    //Autentificacion
    private Autentificacion: IServicioAutentificacion; 

    constructor(AutentificacionImplementacion: IServicioAutentificacion) {
        this.Autentificacion = AutentificacionImplementacion;
    }

    ejecutar(solicitud?: DatosInicioSesionDTO): Resultado<OperacionExitosaDTO> | Promise<Resultado<OperacionExitosaDTO>> {
        throw new Error("Method not implemented.");
    }





}