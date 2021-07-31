import { Resultado } from "../../../comun/dominio/resultado";
import { TrabajoEmpresaDTO } from "../../aplicacion/dto/TrabajoEmpresaDTO";
import { ITrabajoRepo } from "../../aplicacion/ITrabajos.repositorio";
import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import { CLAVE_TRABAJOS_EMPRESA } from "../../../comun/infraestructura/persistencia/ClavesLocalStorage";
import { TRABAJOS_EMPRESA_VALIDA } from "./respuestas/ListadoTrabajos";
import { SolicitudTrabajoDTO } from "../../aplicacion/casoDeUso/ObtenerTrabajoDetalle.cu";
import { LISTADO_TRABAJOS_DETALLE } from "./respuestas/ListadoDetalleTrabajos";
import { OPERACION_FALLIDA } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionFallida";
import { OPERACION_EXITOSA } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";


export class JSONTrabajosRepositorio implements ITrabajoRepo {
    private persistenciaAlterna: IServicioPersistencia;

    constructor(implPersistencia: IServicioPersistencia) {
        this.persistenciaAlterna = implPersistencia;
    }
    obtenerDetalleTrabajo(
        identificador: SolicitudTrabajoDTO
    ): Resultado<TrabajoEmpresaDTO> {
        const listadoTrabajos: TrabajoEmpresaDTO[] = LISTADO_TRABAJOS_DETALLE;

        for (let trabajo of listadoTrabajos) {
            if (identificador.uuid_trabajo == trabajo!.uuid) {
                return Resultado.ok<TrabajoEmpresaDTO>(trabajo);
            }
        }

        return Resultado.falla<any>(OPERACION_FALLIDA);
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

    culminaTrabajo(identificador: SolicitudTrabajoDTO): Resultado<any> {
        
        //Respondemos a la solicitud
        return Resultado.ok<any>(OPERACION_EXITOSA);

    }
}
