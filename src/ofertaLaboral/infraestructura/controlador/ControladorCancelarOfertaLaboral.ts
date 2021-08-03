import { Resultado } from "../../../comun/dominio/resultado";
import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import { OperacionExitosaDTO } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { JSONOfertaLaboralRepositorio } from "../JSON/JSONOfertaLaboral.repositorio";
import { SolicitudOfertaLaboralDTO } from "../../aplicacion/casoDeUso/ObtenerOfertaLaboralDetalle.cu";
import { IOfertasLaboralesRepo } from "../../aplicacion/IOfertaLaboral.repositorio";
import { CancelarOfertaLaboral } from "../../aplicacion/casoDeUso/CancelarOfertaLaboral.cu";

//Controlador de CU Obtener Ofertas Laborales Activas
export class ControladorCancelarOfertaLaboral {
    private RepositorioOfertasLaborales: IOfertasLaboralesRepo;
    private ServicioPersistenciaLocal: IServicioPersistencia;

    private constructor(
        repoAUsar: IOfertasLaboralesRepo,
        persistenciaAUsar: IServicioPersistencia
    ) {
        this.RepositorioOfertasLaborales = repoAUsar;
        this.ServicioPersistenciaLocal = persistenciaAUsar;
    }

    //Método estático para inicializar controlador
    //Inyecciones de dependencias
    public static inicializar(): ControladorCancelarOfertaLaboral {
        const AdaptadorPersistencia = new LocalStoragePersistencia();
        return new ControladorCancelarOfertaLaboral(
            new JSONOfertaLaboralRepositorio(AdaptadorPersistencia),
            AdaptadorPersistencia
        );
    }

    public async ejecutarCU(
        identificador: SolicitudOfertaLaboralDTO
    ): Promise<Resultado<OperacionExitosaDTO>> {
        const CasoUsoCancelarOfertaLaboral = new CancelarOfertaLaboral(
            this.RepositorioOfertasLaborales
        );

        const respuestaCU = await CasoUsoCancelarOfertaLaboral.ejecutar(
            identificador
        );

        if (respuestaCU.esExitoso) {
            return Resultado.ok<OperacionExitosaDTO>(respuestaCU.getValue());
        } else {
            return Resultado.falla<any>(respuestaCU.error);
        }
    }
}
