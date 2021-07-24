import { Resultado } from "../../../../comun/dominio/resultado";
import { TrabajoEmpresaDTO } from "../../../aplicacion/dto/TrabajoEmpresaDTO";
import { ITrabajoRepo } from "../../../aplicacion/ITrabajos.repositorio";
import { IServicioPersistencia } from "../../../../comun/aplicacion/IServicioPersistencia";
import { CLAVE_TRABAJOS_EMPRESA } from "../../../../comun/infraestructura/persistencia/ClavesLocalStorage";
import { TRABAJOS_EMPRESA_VALIDA } from ".././respuestas/ListadoTrabajos";

export class JSONTrabajosRepositorio implements ITrabajoRepo {
    obtenerTrabajos(): Resultado<TrabajoEmpresaDTO[]> {
        //Respondemos a la solicitud
        return Resultado.ok<TrabajoEmpresaDTO[]>(TRABAJOS_EMPRESA_VALIDA);
    }
}
