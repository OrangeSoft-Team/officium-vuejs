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

//Controlador de CU Obtener Ofertas Laborales Activas
export class ControladorObtenerTrabajos {
    private RepositorioTrabajos: ITrabajoRepo;
    private ServicioPersistenciaLocal: IServicioPersistencia;
    //private CasoUsoObtenerOfertasLaborales: ObtenerOfertasLaboralesActivas;

    private constructor(
        repoAUsar: ITrabajoRepo,
        persistenciaAUsar: IServicioPersistencia
    ) {
        this.RepositorioTrabajos = repoAUsar;
        this.ServicioPersistenciaLocal = persistenciaAUsar;
    }

    //Método estático para inicializar controlador
    //Inyecciones de dependencias
    public static inicializar(): ControladorObtenerTrabajos {
        const AdaptadorPersistencia = new LocalStoragePersistencia();
        return new ControladorObtenerTrabajos(
            new JSONTrabajosRepositorio(AdaptadorPersistencia),
            AdaptadorPersistencia
        );
    }

    public async ejecutarCU(): Promise<Resultado<TrabajoEmpresaDTO[]>> {
        const CasoUsoObtenerTrabajos = new ObtenerTrabajos(
            this.RepositorioTrabajos
        );

        const respuestaCU = await CasoUsoObtenerTrabajos.ejecutar();

        if (respuestaCU.esExitoso) {
            return Resultado.ok<TrabajoEmpresaDTO[]>(respuestaCU.getValue());
        } else {
            return Resultado.falla<any>(respuestaCU.error);
        }
    }
}
