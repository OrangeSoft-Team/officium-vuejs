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
import {
    CLAVE_DATOS_BASICOS_EMPRESA,
    CLAVE_SESION_USUARIO,
} from "../../../comun/infraestructura/persistencia/ClavesLocalStorage";
import { RespuestaInicioSesionDTO } from "../../../ofertaLaboral/aplicacion/dto/RespuestaInicioSesionDTO";
import { OPERACION_FALLIDA } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionFallida";

export class JSONRepositorioDatosBasicos implements IEmpresaRepo {
    private persistenciaAlterna: IServicioPersistencia;

    constructor(implPersistencia: IServicioPersistencia) {
        this.persistenciaAlterna = implPersistencia;
    }

    obtenerDatosBasicos(): Resultado<DatosBasicosEmpresaDTO> {
        //Solicitamos ID de empresa para la petición
        const datosEmpresaOrError =
            this.persistenciaAlterna.obtener<RespuestaInicioSesionDTO>(
                CLAVE_SESION_USUARIO
            );

        if (datosEmpresaOrError.esFallido)
            return Resultado.falla<any>(OPERACION_FALLIDA);

        //datosEmpresaOrError.getValue().uuidEmpresa

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
        return Resultado.ok<DatosBasicosEmpresaDTO>(respuesta);
    }
    actualizarDatosBasicos(
        datosBasicos: DatosBasicosEmpresaDTO
    ): Resultado<OperacionExitosaDTO> {
        //Solicitamos ID de empresa para la petición
        const datosEmpresaOrError =
            this.persistenciaAlterna.obtener<RespuestaInicioSesionDTO>(
                CLAVE_SESION_USUARIO
            );

        if (datosEmpresaOrError.esFallido)
            return Resultado.falla<any>(OPERACION_FALLIDA);

        datosBasicos.uuidEmpresa = <string>(
            datosEmpresaOrError.getValue().uuidEmpresa
        );

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
