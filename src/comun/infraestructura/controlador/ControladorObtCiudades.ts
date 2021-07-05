import { JSONCiudadServicio } from "../JSON/JSONCiudad.servicio";
import { Resultado } from "../../dominio/resultado";
import {
    ObtenerCiudades,
    SolicitudCiudadDTO
} from "../../aplicacion/casosDeUso.geografico/ObtenerCiudades.cu";
import { CiudadDTO } from "../../aplicacion/dto.geografico/CiudadDTO";
import { IServicioCiudad } from "../../aplicacion/IServicioCiudad";

//Controlador de CU Obtener paises
export class ControladorObtenerCiudades {
    private ServicioCiudad: IServicioCiudad;
    //private CasoUsoObtenerOfertasLaborales: ObtenerOfertasLaboralesActivas;

    private constructor(repoAUsar: IServicioCiudad) {
        this.ServicioCiudad = repoAUsar;
    }

    //Método estático para inicializar controlador
    public static inicializar(): ControladorObtenerCiudades {
        return new ControladorObtenerCiudades(
            new JSONCiudadServicio()
        );
    }

    public async ejecutarCU(
        solicitud: SolicitudCiudadDTO
    ): Promise<Resultado<CiudadDTO[]>> {
        const CasoUsoObtenerPaises = new ObtenerCiudades(
            this.ServicioCiudad
        );

        const respuestaCU = await CasoUsoObtenerPaises.ejecutar(
            solicitud
        );

        if (respuestaCU.esExitoso) {
            return Resultado.ok<CiudadDTO[]>(
                respuestaCU.getValue()
            );
        } else {
            return Resultado.falla<any>(respuestaCU.error);
        }
    }
}
