import { JSONHabilidadServicio } from "../JSON/JSONHabilidad.servicio";
import { Resultado } from "../../dominio/resultado";
import {
    obtenerHabilidades
} from "../../aplicacion/casosDeUso/ObtenerHabilidades.cu";
import { HabilidadDTO } from "../../aplicacion/dtos/HabilidadDTO";
import { IServicioHabilidades } from "../../aplicacion/IServicioHabilidades";

//Controlador de CU Obtener paises
export class ControladorObtenerHabilidades {
    private ServicioHabilidades: IServicioHabilidades;
    //private CasoUsoObtenerOfertasLaborales: ObtenerOfertasLaboralesActivas;

    private constructor(repoAUsar: IServicioHabilidades) {
        this.ServicioHabilidades = repoAUsar;
    }

    //Método estático para inicializar controlador
    public static inicializar(): ControladorObtenerHabilidades {
        return new ControladorObtenerHabilidades(
            new JSONHabilidadServicio()
        );
    }

    public async ejecutarCU(): Promise<Resultado<HabilidadDTO[]>> {
        const CasoUsoObtenerPaises = new obtenerHabilidades(
            this.ServicioHabilidades
        );

        const respuestaCU = await CasoUsoObtenerPaises.ejecutar();

        if (respuestaCU.esExitoso) {
            return Resultado.ok<HabilidadDTO[]>(
                respuestaCU.getValue()
            );
        } else {
            return Resultado.falla<any>(respuestaCU.error);
        }
    }
}
