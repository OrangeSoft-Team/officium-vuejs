import { Resultado } from "../../../comun/dominio/resultado";
import { TrabajoEmpresaDTO } from "../../aplicacion/dto/TrabajoEmpresaDTO";
import { ITrabajoRepo } from "../../aplicacion/ITrabajos.repositorio";
import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import { CLAVE_TRABAJOS_EMPRESA } from "../../../comun/infraestructura/persistencia/ClavesLocalStorage";
import { TRABAJOS_EMPRESA_VALIDA } from "./respuestas/ListadoTrabajos";

export class JSONTrabajosRepositorio implements ITrabajoRepo {
    private persistenciaAlterna: IServicioPersistencia;

    constructor(implPersistencia: IServicioPersistencia) {
        this.persistenciaAlterna = implPersistencia;
    }

    obtenerTrabajos(): Resultado<TrabajoEmpresaDTO[]> {
        let DATOS_RESPUESTA: TrabajoEmpresaDTO[] = [];

        //Obtenemos de persitencia
        const listadoOrError = this.persistenciaAlterna.obtener(
            CLAVE_TRABAJOS_EMPRESA
        );
        if (listadoOrError.esFallido) {
            //Almacenamos en persitencia en respuesta exitosa
            const A_RESPONDER_DEFAULT = TRABAJOS_EMPRESA_VALIDA;
            this.persistenciaAlterna.guardar(
                CLAVE_TRABAJOS_EMPRESA,
                A_RESPONDER_DEFAULT
            );
            DATOS_RESPUESTA = A_RESPONDER_DEFAULT;
        } else {
            //Obtenemos almacenado
            DATOS_RESPUESTA = <TrabajoEmpresaDTO[]>listadoOrError.getValue();
        }

        //Respondemos a la solicitud
        return Resultado.ok<TrabajoEmpresaDTO[]>(DATOS_RESPUESTA);
    }
}
