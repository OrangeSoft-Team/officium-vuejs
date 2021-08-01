import { CasoUso } from "../../../comun/aplicacion/casoUso";
import { Resultado } from "../../../comun/dominio/resultado";
import { IServicioAutentificacion } from "../IServicioAutentificacion";
import { RespuestaInicioSesionDTO } from "../dto/RespuestaInicioSesionDTO";
import { IServicioValidacionCredencial } from "../IServicioValidacionCredencial";
import { IServicioSesion } from "../IServicioSesion";

export interface DatosInicioSesionDTO {
    correoElectronico: string;
    contraseña: string;
}

export class CasoUsoIniciarSesionCorreoClave
    implements
        CasoUso<DatosInicioSesionDTO, Resultado<RespuestaInicioSesionDTO>>
{
    //Autentificacion
    private Autentificacion: IServicioAutentificacion;
    //Validador
    private ValidadorCredencial: IServicioValidacionCredencial;
    //Inicio Sesion
    private SesionBasica: IServicioSesion;

    constructor(
        AutentificacionImplementacion: IServicioAutentificacion,
        ValidadorImplementacion: IServicioValidacionCredencial,
        SesionImplementacion: IServicioSesion
    ) {
        this.Autentificacion = AutentificacionImplementacion;
        this.ValidadorCredencial = ValidadorImplementacion;
        this.SesionBasica = SesionImplementacion;
    }

    public async ejecutar(
        solicitud: DatosInicioSesionDTO
    ): Promise<Resultado<RespuestaInicioSesionDTO>> {
        //Validamos credenciales
        const credencialesValidasOrError =
            this.ValidadorCredencial.validar(solicitud);
        if (credencialesValidasOrError.esFallido)
            return Resultado.falla<any>(credencialesValidasOrError.error);

        //Hacemos uso del servicio de autentificacion
        const autentificarOrError = await this.Autentificacion.autentificar(
            solicitud
        );
        if (autentificarOrError.esFallido)
            return Resultado.falla<any>(autentificarOrError.error);

        //Iniciamos sesion
        const iniciarSesionOrError = await this.SesionBasica.iniciarSesion({
            correoElectronico: autentificarOrError.getValue().email,
            token: autentificarOrError.getValue().uid,
        });
        if (iniciarSesionOrError.esFallido)
            return Resultado.falla<any>(iniciarSesionOrError.error);

        //Enviamos respuesta de la operacion
        return Resultado.ok<RespuestaInicioSesionDTO>(
            iniciarSesionOrError.getValue()
        );
    }
}
