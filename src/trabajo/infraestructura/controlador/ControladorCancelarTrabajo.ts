import { JSONTrabajosRepositorio } from "../JSON/JSONTrabajos.repositorio";
import { Resultado } from "../../../comun/dominio/resultado";
import { ITrabajoRepo } from "../../aplicacion/ITrabajos.repositorio";
import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import { CancelarTrabajo } from "../../aplicacion/casoDeUso/CancelarTrabajo.cu";
import { SolicitudTrabajoDTO } from "../../aplicacion/casoDeUso/ObtenerTrabajoDetalle.cu";
import { OperacionExitosaDTO } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";

//Controlador de CU Obtener Ofertas Laborales Activas
export class ControladorCancelarTrabajo {
    private RepositorioTrabajos: ITrabajoRepo;
    private ServicioPersistenciaLocal: IServicioPersistencia;

    private constructor(
        repoAUsar: ITrabajoRepo,
        persistenciaAUsar: IServicioPersistencia
    ) {
        this.RepositorioTrabajos = repoAUsar;
        this.ServicioPersistenciaLocal = persistenciaAUsar;
    }

    //Método estático para inicializar controlador
    //Inyecciones de dependencias
    public static inicializar(): ControladorCancelarTrabajo {
        const AdaptadorPersistencia = new LocalStoragePersistencia();
        return new ControladorCancelarTrabajo(
            new JSONTrabajosRepositorio(AdaptadorPersistencia),
            AdaptadorPersistencia
        );
    }

    public async ejecutarCU(
        identificador: SolicitudTrabajoDTO
    ): Promise<Resultado<OperacionExitosaDTO>> {
        const CasoUsoCancelarTrabajo = new CancelarTrabajo(
            this.RepositorioTrabajos
        );

        const respuestaCU = await CasoUsoCancelarTrabajo.ejecutar(
            identificador
        );

        if (respuestaCU.esExitoso) {
            return Resultado.ok<OperacionExitosaDTO>(respuestaCU.getValue());
        } else {
            return Resultado.falla<any>(respuestaCU.error);
        }
    }
}
