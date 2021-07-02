import { CasoUso } from "../../../comun/aplicacion/casoUso";
import { Resultado } from "../../../comun/dominio/resultado";
import {IServicioAutentificacion} from "../IServicioAutentificacion";
import { RespuestaInicioSesionDTO } from "..//../aplicacion/dto/RespuestaInicioSesionDTO";


export interface DatosInicioSesionDTO {
    correoElectronico: string;
    contraseña: string;
}

export class IniciarSesion
implements
        CasoUso<
            DatosInicioSesionDTO,
            Resultado<RespuestaInicioSesionDTO>
        >
{
    //Autentificacion
    private Autentificacion: IServicioAutentificacion; 

    constructor(AutentificacionImplementacion: IServicioAutentificacion) {
        this.Autentificacion = AutentificacionImplementacion;
    }

    public async ejecutar(solicitud: DatosInicioSesionDTO): Promise<Resultado<RespuestaInicioSesionDTO>> {    
        let dto: RespuestaInicioSesionDTO = {
            nombreEmpresa: "IBM",
            tokenSesion: "Token",
            uuidEmpresa: " 560a8451-a29c-41d4-a716-544676554400",
        }
        return Resultado.ok<RespuestaInicioSesionDTO>(dto);
    }





}