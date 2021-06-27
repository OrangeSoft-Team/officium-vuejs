import { JSONOfertaLaboralRepositorio } from "../../infraestructura/JSON/JSONOfertaLaboral.repositorio";
import { Resultado } from "../../../comun/dominio/resultado";
import {
    ObtenerOfertasLaboralesActivas,
    SolicitudOfertasLaboralesActivasDTO,
} from "../../aplicacion/casoDeUso/ObtenerOfertasLaboralesActivas.cu";
import { OfertaLaboralEmpresaDTO } from "../../aplicacion/dto/OfertaLaboralEmpresaDTO";
import { IOfertasLaboralesRepo } from "../../aplicacion/IOfertaLaboral.repositorio";

//Controlador de CU Obtener Ofertas Laborales Activas
export class ControladorObtenerOfertasLaboralesActivas {
    private RepositorioOfertasLaborales: IOfertasLaboralesRepo;
    //private CasoUsoObtenerOfertasLaborales: ObtenerOfertasLaboralesActivas;

    private constructor(repoAUsar: IOfertasLaboralesRepo) {
        this.RepositorioOfertasLaborales = repoAUsar;
    }

    //Método estático para inicializar controlador
    public static inicializar(): ControladorObtenerOfertasLaboralesActivas {
        return new ControladorObtenerOfertasLaboralesActivas(
            new JSONOfertaLaboralRepositorio()
        );
    }

    public async ejecutarCU(
        solicitud: SolicitudOfertasLaboralesActivasDTO
    ): Promise<Resultado<OfertaLaboralEmpresaDTO[]>> {
        const CasoUsoObtenerOfertasLaborales =
            new ObtenerOfertasLaboralesActivas(
                this.RepositorioOfertasLaborales
            );

        const respuestaCU = await CasoUsoObtenerOfertasLaborales.ejecutar(
            solicitud
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
