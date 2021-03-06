import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { Resultado } from "../../../comun/dominio/resultado";
import {
    ActualizarDatosBasicosEmpresaDTO,
    DatosBasicosEmpresaDTO,
} from "../../aplicacion/dto/DatosBasicosEmpresaDTO";
import { IEmpresaRepo } from "../../aplicacion/IEmpresa.repositorio";
import { DATOS_BASICOS_EMPRESA_VALIDOS } from "./RespuestasDatosBasicos";
import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import {
    CLAVE_DATOS_BASICOS_EMPRESA,
    CLAVE_SESION_USUARIO,
} from "../../../comun/infraestructura/persistencia/ClavesLocalStorage";
import { RespuestaInicioSesionDTO } from "../../../sesion/aplicacion/dto/RespuestaInicioSesionDTO";
import { OPERACION_FALLIDA } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionFallida";
import { HabilidadDTO } from "../../../comun/aplicacion/dtos/HabilidadDTO";

export class JSONRepositorioDatosBasicos implements IEmpresaRepo {
    private persistenciaAlterna: IServicioPersistencia;

    constructor(implPersistencia: IServicioPersistencia) {
        this.persistenciaAlterna = implPersistencia;
    }

    obtenerDatosBasicos(): Promise<Resultado<DatosBasicosEmpresaDTO>> {
        return new Promise((resolve, reject) => {
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
            //Transformamos id de habilidades
            let habilidades: HabilidadDTO[] = [];
            for (let habilidad of respuesta.habilidades) {
                habilidades.push({ uuid: <string>(<unknown>habilidad) });
            }
            respuesta.habilidades = habilidades;
            respuesta.correoElectronico = "test@test.com";

            //Respondemos
            resolve(Resultado.ok<DatosBasicosEmpresaDTO>(respuesta));
        });
    }
    actualizarDatosBasicos(
        datosBasicos: ActualizarDatosBasicosEmpresaDTO
    ): Promise<Resultado<OperacionExitosaDTO>> {
        return new Promise((resolve, reject) => {
            //Solicitamos ID de empresa para la petición
            const datosEmpresaOrError =
                this.persistenciaAlterna.obtener<RespuestaInicioSesionDTO>(
                    CLAVE_SESION_USUARIO
                );

            if (datosEmpresaOrError.esFallido)
                return Resultado.falla<any>(OPERACION_FALLIDA);

            //Enviamos peticion a backend
            //(fake) Actualizamos persistencia
            this.persistenciaAlterna.guardar(
                CLAVE_DATOS_BASICOS_EMPRESA,
                datosBasicos
            );

            //Respondemos
            resolve(
                Resultado.ok<OperacionExitosaDTO>({
                    mensaje: OPERACION_EXITOSA,
                })
            );
        });
    }
}
