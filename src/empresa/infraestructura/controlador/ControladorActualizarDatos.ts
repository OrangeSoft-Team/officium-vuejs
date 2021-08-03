import { JSONRepositorioDatosBasicos } from "../JSON/JSONRepositorioDatosBasicos";
import { Resultado } from "../../../comun/dominio/resultado";
import {
    ActualizarDatosBasicos,
    SolicitudActualizarDatosBasicosDTO,
} from "../../aplicacion/casoDeUso/ActualizarDatosBasicos.cu";
/*
import { CrearOfertaLaboralDTO } from "../../aplicacion/dto/CrearOfertaLaboralDTO";
*/
import { OperacionExitosaDTO } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { IEmpresaRepo } from "../../aplicacion/IEmpresa.repositorio";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import { HTTPRepositorioDatosBasicos } from "../HTTP/HTTPRepositorioDatosBasicos";

//Controlador de CU Obtener detalle de Oferta Laboral
export class ControladorActualizarDatosBasicos {
    private RepositorioEmpresa: IEmpresaRepo;
    //private CasoUsoObtenerOfertasLaborales: ObtenerOfertasLaboralesActivas;

    private constructor(repoAUsar: IEmpresaRepo) {
        this.RepositorioEmpresa = repoAUsar;
    }

    //Método estático para inicializar controlador
    public static inicializar(): ControladorActualizarDatosBasicos {
        return new ControladorActualizarDatosBasicos(
            new HTTPRepositorioDatosBasicos(new LocalStoragePersistencia())
        );
    }

    public async ejecutarCU(
        solicitud: SolicitudActualizarDatosBasicosDTO
    ): Promise<Resultado<OperacionExitosaDTO>> {
        const CasoUsoCrearOfertaLaboral = new ActualizarDatosBasicos(
            this.RepositorioEmpresa
        );

        const respuestaCU = await CasoUsoCrearOfertaLaboral.ejecutar(solicitud);

        if (respuestaCU.esExitoso) {
            return Resultado.ok<OperacionExitosaDTO>(respuestaCU.getValue());
        } else {
            return Resultado.falla<any>(respuestaCU.error);
        }
    }
}
