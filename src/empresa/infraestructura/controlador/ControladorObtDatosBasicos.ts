import { JSONRepositorioDatosBasicos } from "../../infraestructura/JSON/JSONRepositorioDatosBasicos";
import { Resultado } from "../../../comun/dominio/resultado";
import { obtenerDatosBasicos } from "../../aplicacion/casoDeUso/ObtenerDatosBasicos.cu";
import { DatosBasicosEmpresaDTO } from "../../aplicacion/dto/DatosBasicosEmpresaDTO";
import { IEmpresaRepo } from "../../aplicacion/IEmpresa.repositorio";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";
import { HTTPRepositorioDatosBasicos } from "../HTTP/HTTPRepositorioDatosBasicos";

//Controlador de CU Obtener detalle de Oferta Laboral
export class ControladorObtDatosBasicos {
    private RepositorioDatosBasicos: IEmpresaRepo;
    //private CasoUsoObtenerOfertasLaborales: ObtenerOfertasLaboralesActivas;

    private constructor(repoAUsar: IEmpresaRepo) {
        this.RepositorioDatosBasicos = repoAUsar;
    }

    //Método estático para inicializar controlador
    public static inicializar(): ControladorObtDatosBasicos {
        return new ControladorObtDatosBasicos(
            new HTTPRepositorioDatosBasicos(new LocalStoragePersistencia())
        );
    }

    public async ejecutarCU(): Promise<Resultado<DatosBasicosEmpresaDTO>> {
        const CasoUsoObtenerDatosBasicos = new obtenerDatosBasicos(
            this.RepositorioDatosBasicos
        );

        const respuestaCU = await CasoUsoObtenerDatosBasicos.ejecutar();

        if (respuestaCU.esExitoso) {
            return Resultado.ok<DatosBasicosEmpresaDTO>(respuestaCU.getValue());
        } else {
            return Resultado.falla<any>(respuestaCU.error);
        }
    }
}
