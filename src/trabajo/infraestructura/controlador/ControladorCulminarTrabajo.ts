import { JSONTrabajosRepositorio } from "../JSON/JSONTrabajos.repositorio";
import { Resultado } from "../../../comun/dominio/resultado";
import { ObtenerTrabajos } from "../../aplicacion/casoDeUso/ObtenerTrabajos.cu";
import { TrabajoEmpresaDTO } from "../../aplicacion/dto/TrabajoEmpresaDTO";
import { ITrabajoRepo } from "../../aplicacion/ITrabajos.repositorio";
import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import {
    CLAVE_ID_EMPRESA,
    CLAVE_SESION_USUARIO,
} from "../../../comun/infraestructura/persistencia/ClavesLocalStorage";
import { RespuestaInicioSesionDTO } from "../../../sesion/aplicacion/dto/RespuestaInicioSesionDTO";
import { CulminarTrabajo } from "../../aplicacion/casoDeUso/CulminarTrabajo.cu";
import { SolicitudTrabajoDTO } from "../../aplicacion/casoDeUso/ObtenerTrabajoDetalle.cu";
import { OperacionExitosaDTO } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";

//Controlador de CU Obtener Ofertas Laborales Activas
export class ControladorCulminarTrabajo {
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
    public static inicializar(): ControladorCulminarTrabajo {
        const AdaptadorPersistencia = new LocalStoragePersistencia();
        return new ControladorCulminarTrabajo(
            new JSONTrabajosRepositorio(AdaptadorPersistencia),
            AdaptadorPersistencia
        );
    }

    public async ejecutarCU(
        identificador: SolicitudTrabajoDTO
    ): Promise<Resultado<OperacionExitosaDTO>> {
        const CasoUsoCulminarTrabajo = new CulminarTrabajo(
            this.RepositorioTrabajos
        );

        const respuestaCU = await CasoUsoCulminarTrabajo.ejecutar(
            identificador
        );

        if (respuestaCU.esExitoso) {
            return Resultado.ok<OperacionExitosaDTO>(respuestaCU.getValue());
        } else {
            return Resultado.falla<any>(respuestaCU.error);
        }
    }
}
