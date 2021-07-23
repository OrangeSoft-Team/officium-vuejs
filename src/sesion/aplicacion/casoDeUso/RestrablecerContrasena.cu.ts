import { CasoUso } from "../../../comun/aplicacion/casoUso";
import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { Resultado } from "../../../comun/dominio/resultado";
import { RestablecerContrasenaDTO } from "../dto/RestablecerContrasenaDTO";
import { IServicioAutentificacion } from "../IServicioAutentificacion";
import { IServicioValidacionCredencial } from "../IServicioValidacionCredencial";

export class CasoUsoRestablecerContrasena
    implements
        CasoUso<
            RestablecerContrasenaDTO,
            Promise<Resultado<OperacionExitosaDTO>>
        >
{
    private autentificacionImplementacion: IServicioAutentificacion;
    private validadorImplementacion: IServicioValidacionCredencial;

    constructor(
        authImpl: IServicioAutentificacion,
        validadorImpl: IServicioValidacionCredencial
    ) {
        this.autentificacionImplementacion = authImpl;
        this.validadorImplementacion = validadorImpl;
    }

    ejecutar(
        solicitud: RestablecerContrasenaDTO
    ): Promise<Resultado<OperacionExitosaDTO>> {
        return new Promise((resolve, reject) => {
            //validmos
            const validoOrError =
                this.validadorImplementacion.validarCredencialPrincipal(
                    solicitud
                );
            if (validoOrError.esFallido)
                resolve(Resultado.falla<any>(validoOrError.error));

            //Llama funcion de auth
            const respuestaOrError =
                this.autentificacionImplementacion.restablecerContrasena(
                    solicitud
                );

            //Espera
            respuestaOrError
                .then((resultado) => {
                    if (resultado.esFallido)
                        resolve(Resultado.falla<any>(resultado.error));

                    resolve(
                        Resultado.ok<OperacionExitosaDTO>({
                            mensaje: OPERACION_EXITOSA,
                        })
                    );
                })
                .catch((e) => {
                    //Todo mal
                    reject(e);
                });
        });
    }
}
