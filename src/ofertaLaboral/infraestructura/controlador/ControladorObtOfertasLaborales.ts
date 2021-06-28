import { JSONOfertaLaboralRepositorio } from "../../infraestructura/JSON/JSONOfertaLaboral.repositorio";
import { Resultado } from "../../../comun/dominio/resultado";
import {
    ObtenerOfertasLaboralesActivas,
    SolicitudOfertasLaboralesActivasDTO,
} from "../../aplicacion/casoDeUso/ObtenerOfertasLaboralesActivas.cu";
import { OfertaLaboralEmpresaDTO } from "../../aplicacion/dto/OfertaLaboralEmpresaDTO";
import { IOfertasLaboralesRepo } from "../../aplicacion/IOfertaLaboral.repositorio";
import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import { LocalStoragePersistencia } from "../persistencia/LocalStorage.persistencia";
import { CLAVE_ID_EMPRESA } from "../../../comun/infraestructura/persistencia/ClavesLocalStorage";

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
        return new ControladorObtenerOfertasLaboralesActivas(
            new JSONOfertaLaboralRepositorio(),
            new LocalStoragePersistencia()
        );
    }

    public async ejecutarCU(): Promise<Resultado<OfertaLaboralEmpresaDTO[]>> {
        const CasoUsoObtenerOfertasLaborales =
            new ObtenerOfertasLaboralesActivas(
                this.RepositorioOfertasLaborales
            );

        //Obtenemos id empresa del empleador actual
        const idEmpresaEmpleadorOrError =
            this.ServicioPersistenciaLocal.obtener<SolicitudOfertasLaboralesActivasDTO>(
                CLAVE_ID_EMPRESA
            );
        if (idEmpresaEmpleadorOrError.esFallido)
            return Resultado.falla<any>(idEmpresaEmpleadorOrError.error);

        const respuestaCU = await CasoUsoObtenerOfertasLaborales.ejecutar(
            idEmpresaEmpleadorOrError.getValue()
        );

        if (respuestaCU.esExitoso) {
            return Resultado.ok<OfertaLaboralEmpresaDTO[]>(
                respuestaCU.getValue()
            );
        } else {
            return Resultado.falla<any>(respuestaCU.error);
        }
    }
}
