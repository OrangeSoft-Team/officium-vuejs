import { JSONOfertaLaboralRepositorio } from "../../infraestructura/JSON/JSONOfertaLaboral.repositorio";
import { Resultado } from "../../../comun/dominio/resultado";
import {
    CrearOfertaLaboral,
    SolicitudCreacionOfertaLaboralDTO,
} from "../../aplicacion/casoDeUso/CrearOfertaLaboral.cu";
/*
import { CrearOfertaLaboralDTO } from "../../aplicacion/dto/CrearOfertaLaboralDTO";
*/
import { OperacionExitosaDTO } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { IOfertasLaboralesRepo } from "../../aplicacion/IOfertaLaboral.repositorio";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";

//Controlador de CU Obtener detalle de Oferta Laboral
export class ControladorCrearOfertaLaboral {
    private RepositorioOfertasLaborales: IOfertasLaboralesRepo;
    //private CasoUsoObtenerOfertasLaborales: ObtenerOfertasLaboralesActivas;

    private constructor(repoAUsar: IOfertasLaboralesRepo) {
        this.RepositorioOfertasLaborales = repoAUsar;
    }

    //Método estático para inicializar controlador
    public static inicializar(): ControladorCrearOfertaLaboral {
        return new ControladorCrearOfertaLaboral(
            new JSONOfertaLaboralRepositorio(new LocalStoragePersistencia())
        );
    }

    public async ejecutarCU(
        solicitud: SolicitudCreacionOfertaLaboralDTO
    ): Promise<Resultado<OperacionExitosaDTO>> {
        const CasoUsoCrearOfertaLaboral = new CrearOfertaLaboral(
            this.RepositorioOfertasLaborales
        );

        const respuestaCU = await CasoUsoCrearOfertaLaboral.ejecutar(solicitud);

        if (respuestaCU.esExitoso) {
            return Resultado.ok<OperacionExitosaDTO>(respuestaCU.getValue());
        } else {
            return Resultado.falla<any>(respuestaCU.error);
        }
    }
}
