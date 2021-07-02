import { JSONOfertaLaboralRepositorio } from "../../infraestructura/JSON/JSONOfertaLaboral.repositorio";
import { Resultado } from "../../../comun/dominio/resultado";
import {
    ObtenerOfertaLaboral,
    SolicitudOfertaLaboralDTO,
} from "../../aplicacion/casoDeUso/ObtenerOfertaLaboralDetalle.cu";
import { OfertaLaboralEmpresaDTO } from "../../aplicacion/dto/OfertaLaboralEmpresaDTO";
import { IOfertasLaboralesRepo } from "../../aplicacion/IOfertaLaboral.repositorio";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";

//Controlador de CU Obtener detalle de Oferta Laboral
export class ControladorDetalleOfertaLaboral {
    private RepositorioOfertasLaborales: IOfertasLaboralesRepo;
    //private CasoUsoObtenerOfertasLaborales: ObtenerOfertasLaboralesActivas;

    private constructor(repoAUsar: IOfertasLaboralesRepo) {
        this.RepositorioOfertasLaborales = repoAUsar;
    }

    //Método estático para inicializar controlador
    public static inicializar(): ControladorDetalleOfertaLaboral {
        return new ControladorDetalleOfertaLaboral(
            new JSONOfertaLaboralRepositorio(new LocalStoragePersistencia())
        );
    }

    public async ejecutarCU(
        solicitud: SolicitudOfertaLaboralDTO
    ): Promise<Resultado<OfertaLaboralEmpresaDTO>> {
        const CasoUsoObtenerOfertaLaboral = new ObtenerOfertaLaboral(
            this.RepositorioOfertasLaborales
        );

        const respuestaCU = await CasoUsoObtenerOfertaLaboral.ejecutar(
            solicitud
        );

        if (respuestaCU.esExitoso) {
            return Resultado.ok<OfertaLaboralEmpresaDTO>(
                respuestaCU.getValue()
            );
        } else {
            return Resultado.falla<any>(respuestaCU.error);
        }
    }
}
