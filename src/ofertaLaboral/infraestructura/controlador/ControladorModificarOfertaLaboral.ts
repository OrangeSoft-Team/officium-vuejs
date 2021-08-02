import { JSONOfertaLaboralRepositorio } from "../../infraestructura/JSON/JSONOfertaLaboral.repositorio";
import { Resultado } from "../../../comun/dominio/resultado";
import {
    ModificarOfertaLaboral,
    SolicitudModificacionOfertaLaboralDTO,
} from "../../aplicacion/casoDeUso/ModificarOfertaLaboral.cu";
import { OperacionExitosaDTO } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { IOfertasLaboralesRepo } from "../../aplicacion/IOfertaLaboral.repositorio";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";

//Controlador de CU Obtener detalle de Oferta Laboral
export class ControladorModificarOfertaLaboral {
    private RepositorioOfertasLaborales: IOfertasLaboralesRepo;
    //private CasoUsoObtenerOfertasLaborales: ObtenerOfertasLaboralesActivas;

    private constructor(repoAUsar: IOfertasLaboralesRepo) {
        this.RepositorioOfertasLaborales = repoAUsar;
    }

    //Método estático para inicializar controlador
    public static inicializar(): ControladorModificarOfertaLaboral {
        return new ControladorModificarOfertaLaboral(
            new JSONOfertaLaboralRepositorio(new LocalStoragePersistencia())
        );
    }

    public async ejecutarCU(
        solicitud: SolicitudModificacionOfertaLaboralDTO
    ): Promise<Resultado<OperacionExitosaDTO>> {
        const CasoUsoModificarOfertaLaboral = new ModificarOfertaLaboral(
            this.RepositorioOfertasLaborales
        );

        const respuestaCU = await CasoUsoModificarOfertaLaboral.ejecutar(
            solicitud
        );

        if (respuestaCU.esExitoso) {
            return Resultado.ok<OperacionExitosaDTO>(respuestaCU.getValue());
        } else {
            return Resultado.falla<any>(respuestaCU.error);
        }
    }
}
