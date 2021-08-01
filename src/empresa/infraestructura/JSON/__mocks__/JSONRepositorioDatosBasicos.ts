import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { Resultado } from "../../../../comun/dominio/resultado";
import {
    ActualizarDatosBasicosEmpresaDTO,
    DatosBasicosEmpresaDTO,
} from "../../../aplicacion/dto/DatosBasicosEmpresaDTO";
import { IEmpresaRepo } from "../../../aplicacion/IEmpresa.repositorio";
import { DATOS_BASICOS_EMPRESA_VALIDOS } from "../RespuestasDatosBasicos";
import { IServicioPersistencia } from "../../../../comun/aplicacion/IServicioPersistencia";
import { CLAVE_DATOS_BASICOS_EMPRESA } from "../../../../comun/infraestructura/persistencia/ClavesLocalStorage";

export class JSONRepositorioDatosBasicos implements IEmpresaRepo {
    private persistenciaAlterna: IServicioPersistencia;

    constructor(implPersistencia: IServicioPersistencia) {
        this.persistenciaAlterna = implPersistencia;
    }

    obtenerDatosBasicos(): Promise<Resultado<DatosBasicosEmpresaDTO>> {
        return new Promise((resolve, reject) => {
            //Hacemos peticion a backend

            //Respondemos
            return resolve(
                Resultado.ok<DatosBasicosEmpresaDTO>(
                    DATOS_BASICOS_EMPRESA_VALIDOS
                )
            );
        });
    }
    actualizarDatosBasicos(
        datosBasicos: ActualizarDatosBasicosEmpresaDTO
    ): Promise<Resultado<OperacionExitosaDTO>> {
        return new Promise((resolve, reject) => {
            //Enviamos peticion a backend

            //Respondemos
            return resolve(
                Resultado.ok<OperacionExitosaDTO>({
                    mensaje: OPERACION_EXITOSA,
                })
            );
        });
    }
}
