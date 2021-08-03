import { Resultado } from "../../dominio/resultado";
import { ObtenerPais } from "../../aplicacion/casosDeUso.geografico/ObtenerPaises.cu";
import { PaisDTO } from "../../aplicacion/dto.geografico/PaisDTO";
import { IServicioPais } from "../../aplicacion/IServicioPais";
import { HTTPPaisServicio } from "../HTTP/HTTPPais.servicio";

//Controlador de CU Obtener paises
export class ControladorObtenerPaises {
    private ServicioPais: IServicioPais;
    //private CasoUsoObtenerOfertasLaborales: ObtenerOfertasLaboralesActivas;

    private constructor(repoAUsar: IServicioPais) {
        this.ServicioPais = repoAUsar;
    }

    //Método estático para inicializar controlador
    public static inicializar(): ControladorObtenerPaises {
        return new ControladorObtenerPaises(new HTTPPaisServicio());
    }

    public async ejecutarCU(): Promise<Resultado<PaisDTO[]>> {
        const CasoUsoObtenerPaises = new ObtenerPais(this.ServicioPais);

        const respuestaCU = await CasoUsoObtenerPaises.ejecutar();

        if (respuestaCU.esExitoso) {
            return Resultado.ok<PaisDTO[]>(respuestaCU.getValue());
        } else {
            return Resultado.falla<any>(respuestaCU.error);
        }
    }
}
