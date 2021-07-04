import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { Resultado } from "../../../comun/dominio/resultado";
import { SolicitudDatosBasicosDTO } from "../../aplicacion/casoDeUso/ObtenerDatosBasicos.cu";
import { DatosBasicosEmpresaDTO } from "../../aplicacion/dto/DatosBasicosEmpresaDTO";
import { IEmpresaRepo } from "../../aplicacion/IEmpresa.repositorio";
import { DATOS_BASICOS_EMPRESA_VALIDOS } from "./RespuestasDatosBasicos";
import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import { CLAVE_DATOS_BASICOS_EMPRESA } from "../../../comun/infraestructura/persistencia/ClavesLocalStorage";

export class JSONRepositorioDatosBasicos implements IEmpresaRepo {
    private persistenciaAlterna: IServicioPersistencia;

    constructor(implPersistencia: IServicioPersistencia) {
        this.persistenciaAlterna = implPersistencia;
    }

    obtenerDatosBasicos(
        id: SolicitudDatosBasicosDTO
    ): Resultado<DatosBasicosEmpresaDTO> {
        //Hacemos peticion a backend
        //(fake) Recueperamos de persistencia
        const datosOrError =
            this.persistenciaAlterna.obtener<DatosBasicosEmpresaDTO>(
                CLAVE_DATOS_BASICOS_EMPRESA
            );
        let respuesta: DatosBasicosEmpresaDTO;
        if (datosOrError.esExitoso) {
            respuesta = datosOrError.getValue();
        } else {
            //No existe en resistencia alterna
            respuesta = DATOS_BASICOS_EMPRESA_VALIDOS;
            this.persistenciaAlterna.guardar(
                CLAVE_DATOS_BASICOS_EMPRESA,
                respuesta
            );
        }

        //Respondemos
        return Resultado.ok<DatosBasicosEmpresaDTO>(
            DATOS_BASICOS_EMPRESA_VALIDOS
        );
    }
    actualizarDatosBasicos(
        datosBasicos: DatosBasicosEmpresaDTO
    ): Resultado<OperacionExitosaDTO> {
        //Enviamos peticion a backend
        //(fake) Actualizamos persistencia
        this.persistenciaAlterna.guardar(
            CLAVE_DATOS_BASICOS_EMPRESA,
            datosBasicos
        );

        //Respondemos
        return Resultado.ok<OperacionExitosaDTO>({
            mensaje: OPERACION_EXITOSA,
        });
    }
}
