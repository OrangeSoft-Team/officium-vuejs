import { JSONOfertaLaboralRepositorio } from "../../infraestructura/JSON/JSONOfertaLaboral.repositorio";
import { Resultado } from "../../../comun/dominio/resultado";
import {
    ObtenerOfertasLaboralesActivas,
    SolicitudOfertasLaboralesActivasDTO,
} from "../../aplicacion/casoDeUso/ObtenerOfertasLaboralesActivas.cu";
import { OfertaLaboralEmpresaDTO } from "../../aplicacion/dto/OfertaLaboralEmpresaDTO";
import { IOfertasLaboralesRepo } from "../../aplicacion/IOfertaLaboral.repositorio";
import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import {
    CLAVE_ID_EMPRESA,
    CLAVE_SESION_USUARIO,
} from "../../../comun/infraestructura/persistencia/ClavesLocalStorage";
import { RespuestaInicioSesionDTO } from "../../aplicacion/dto/RespuestaInicioSesionDTO";

//Controlador de CU Obtener Ofertas Laborales Activas
export class ControladorObtenerOfertasLaboralesActivas {
    private RepositorioOfertasLaborales: IOfertasLaboralesRepo;
    private ServicioPersistenciaLocal: IServicioPersistencia;
    //private CasoUsoObtenerOfertasLaborales: ObtenerOfertasLaboralesActivas;

    private constructor(
        repoAUsar: IOfertasLaboralesRepo,
        persistenciaAUsar: IServicioPersistencia
    ) {
        this.RepositorioOfertasLaborales = repoAUsar;
        this.ServicioPersistenciaLocal = persistenciaAUsar;
    }

    //Método estático para inicializar controlador
    //Inyecciones de dependencias
    public static inicializar(): ControladorObtenerOfertasLaboralesActivas {
        const AdaptadorPersistencia = new LocalStoragePersistencia();
        return new ControladorObtenerOfertasLaboralesActivas(
            new JSONOfertaLaboralRepositorio(AdaptadorPersistencia),
            AdaptadorPersistencia
        );
    }

    public async ejecutarCU(): Promise<Resultado<OfertaLaboralEmpresaDTO[]>> {
        const CasoUsoObtenerOfertasLaborales =
            new ObtenerOfertasLaboralesActivas(
                this.RepositorioOfertasLaborales
            );

        //Obtenemos id empresa del empleador actual
        const datosEmpleadorOrError =
            this.ServicioPersistenciaLocal.obtener<RespuestaInicioSesionDTO>(
                CLAVE_SESION_USUARIO
            );

        if (datosEmpleadorOrError.esFallido)
            return Resultado.falla<any>(datosEmpleadorOrError.error);

        const respuestaCU = await CasoUsoObtenerOfertasLaborales.ejecutar({
            idEmpresa: datosEmpleadorOrError.getValue().uuidEmpresa,
        });

        if (respuestaCU.esExitoso) {
            return Resultado.ok<OfertaLaboralEmpresaDTO[]>(
                respuestaCU.getValue()
            );
        } else {
            return Resultado.falla<any>(respuestaCU.error);
        }
    }
}
