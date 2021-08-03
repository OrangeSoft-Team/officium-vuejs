import { HTTPEstadoServicio } from "../HTTP/HTTPEstado.servicio";
import { Resultado } from "../../dominio/resultado";
import {
    ObtenerEstados,
    SolicitudEstadoDTO,
} from "../../aplicacion/casosDeUso.geografico/ObtenerEstados.cu";
import { EstadoDTO } from "../../aplicacion/dto.geografico/EstadoDTO";
import { IServicioEstado } from "../../aplicacion/IServicioEstado";

//Controlador de CU Obtener paises
export class ControladorObtenerEstados {
    private ServicioEstado: IServicioEstado;
    //private CasoUsoObtenerOfertasLaborales: ObtenerOfertasLaboralesActivas;

    private constructor(repoAUsar: IServicioEstado) {
        this.ServicioEstado = repoAUsar;
    }

    //Método estático para inicializar controlador
    public static inicializar(): ControladorObtenerEstados {
        return new ControladorObtenerEstados(new HTTPEstadoServicio());
    }

    public async ejecutarCU(
        solicitud: SolicitudEstadoDTO
    ): Promise<Resultado<EstadoDTO[]>> {
        const CasoUsoObtenerPaises = new ObtenerEstados(this.ServicioEstado);

        const respuestaCU = await CasoUsoObtenerPaises.ejecutar(solicitud);

        if (respuestaCU.esExitoso) {
            return Resultado.ok<EstadoDTO[]>(respuestaCU.getValue());
        } else {
            return Resultado.falla<any>(respuestaCU.error);
        }
    }
}
