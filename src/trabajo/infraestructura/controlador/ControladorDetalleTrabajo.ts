import { JSONTrabajosRepositorio } from "../../infraestructura/JSON/JSONTrabajos.repositorio";
import { JSONPaisServicio } from "../../../comun/infraestructura/JSON/JSONPais.servicio";
import { JSONEstadoServicio } from "../../../comun/infraestructura/JSON/JSONEstado.servicio";
import { JSONCiudadServicio } from "../../../comun/infraestructura/JSON/JSONCiudad.servicio";
import { Resultado } from "../../../comun/dominio/resultado";
import {
    ObtenerTrabajoDetalle,
    SolicitudTrabajoDTO,
} from "../../aplicacion/casoDeUso/ObtenerTrabajoDetalle.cu";
import { TrabajoEmpresaResumidoDTO } from "../../aplicacion/dto/TrabajoEmpresaDTO";
import { ITrabajoRepo } from "../../aplicacion/ITrabajos.repositorio";
import { IServicioPais } from "../../../comun/aplicacion/IServicioPais";
import { IServicioEstado } from "../../../comun/aplicacion/IServicioEstado";
import { IServicioCiudad } from "../../../comun/aplicacion/IServicioCiudad";
import { LocalStoragePersistencia } from "../../../comun/infraestructura/persistencia/LocalStorage.persistencia";

//Controlador de CU Obtener detalle de Oferta Laboral
export class ControladorDetalleTrabajo {
    //Repositorio
    private RepositorioTrabajos: ITrabajoRepo;
    //Servicios geograficos
    private servicioPais: IServicioPais;
    private servicioEstado: IServicioEstado;
    private servicioCiudad: IServicioCiudad;

    private constructor(repoAUsar: ITrabajoRepo, servPais: IServicioPais, servEstado: IServicioEstado, servCiudad: IServicioCiudad) {
        this.RepositorioTrabajos = repoAUsar;
        this.servicioPais = servPais;
        this.servicioEstado = servEstado;
        this.servicioCiudad = servCiudad;
    }

    //Método estático para inicializar controlador
    public static inicializar(): ControladorDetalleTrabajo {
        return new ControladorDetalleTrabajo(
            new JSONTrabajosRepositorio(new LocalStoragePersistencia()),
            new JSONPaisServicio(),
            new JSONEstadoServicio(),
            new JSONCiudadServicio(),
        );
    }

    public async ejecutarCU(
        solicitud: SolicitudTrabajoDTO
    ): Promise<Resultado<TrabajoEmpresaResumidoDTO>> {
        const CasoUsoObtenerTrabajo = new ObtenerTrabajoDetalle(
            this.RepositorioTrabajos,
            this.servicioPais,
            this.servicioEstado,
            this.servicioCiudad
        );

        const respuestaCU = await CasoUsoObtenerTrabajo.ejecutar(
            solicitud
        );

        if (respuestaCU.esExitoso) {
            return Resultado.ok<TrabajoEmpresaResumidoDTO>(
                respuestaCU.getValue()
            );
        } else {
            return Resultado.falla<any>(respuestaCU.error);
        }
    }
}
