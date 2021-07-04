import { CasoUso } from "../../../comun/aplicacion/casoUso";
import { Resultado } from "../../../comun/dominio/resultado";
import { IServicioAutentificacion } from "../IServicioAutentificacion";
import { RespuestaInicioSesionDTO } from "../../../ofertaLaboral/aplicacion/dto/RespuestaInicioSesionDTO";

export interface DatosInicioSesionDTO {
    correoElectronico: string;
    contraseña: string;
}

export class CasoUsoIniciarSesion
    implements
        CasoUso<DatosInicioSesionDTO, Resultado<RespuestaInicioSesionDTO>>
{
    //Autentificacion
    private Autentificacion: IServicioAutentificacion;

    constructor(AutentificacionImplementacion: IServicioAutentificacion) {
        this.Autentificacion = AutentificacionImplementacion;
    }

    public async ejecutar(
        solicitud: DatosInicioSesionDTO
    ): Promise<Resultado<RespuestaInicioSesionDTO>> {
        //Hacemos uso del servicio de autentificacion
        const iniciarSesionOrError = await this.Autentificacion.iniciarSesion(
            solicitud
        );
        if (iniciarSesionOrError.esFallido)
            return Resultado.falla<any>(iniciarSesionOrError.error);

        //Enviamos respuesta de la operacion
        return Resultado.ok<RespuestaInicioSesionDTO>(
            iniciarSesionOrError.getValue()
        );
    }
}
