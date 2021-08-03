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
import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import {
    CLAVE_DATOS_BASICOS_EMPRESA,
    CLAVE_SESION_USUARIO,
} from "../../../comun/infraestructura/persistencia/ClavesLocalStorage";
import { RespuestaInicioSesionDTO } from "../../../sesion/aplicacion/dto/RespuestaInicioSesionDTO";
import { OPERACION_FALLIDA } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionFallida";
import { HabilidadDTO } from "../../../comun/aplicacion/dtos/HabilidadDTO";
import axios from "axios";
import { NEST_URL_BASE } from "../../../main";

export class HTTPRepositorioDatosBasicos implements IEmpresaRepo {
    private persistenciaAlterna: IServicioPersistencia;

    constructor(implPersistencia: IServicioPersistencia) {
        this.persistenciaAlterna = implPersistencia;
    }

    obtenerDatosBasicos(): Promise<Resultado<DatosBasicosEmpresaDTO>> {
        return new Promise((resolve, reject) => {
            //Hacemos peticion a backend
            axios
                .get(NEST_URL_BASE + "empleador/perfil", {
                    withCredentials: true,
                })
                .then((respuesta) => {
                    //Guardamos
                    this.persistenciaAlterna.guardar(
                        CLAVE_DATOS_BASICOS_EMPRESA,
                        respuesta.data
                    );

                    //Enviamos
                    resolve(
                        Resultado.ok<DatosBasicosEmpresaDTO>(respuesta.data)
                    );
                })
                .catch((e) => {
                    //En caso de error
                    // Recueperamos de persistencia
                    const datosOrError =
                        this.persistenciaAlterna.obtener<DatosBasicosEmpresaDTO>(
                            CLAVE_DATOS_BASICOS_EMPRESA
                        );
                    let respuesta: DatosBasicosEmpresaDTO;

                    if (datosOrError.esExitoso) {
                        resolve(
                            Resultado.ok<DatosBasicosEmpresaDTO>(
                                datosOrError.getValue()
                            )
                        );
                    }
                });
        });
    }
    actualizarDatosBasicos(
        datosBasicos: ActualizarDatosBasicosEmpresaDTO
    ): Promise<Resultado<OperacionExitosaDTO>> {
        //Enviamos peticion a backend
        return new Promise((resolve, reject) => {
            axios
                .put(NEST_URL_BASE + "empleador/perfil", datosBasicos, {
                    withCredentials: true,
                })
                .then((respuesta) => {
                    //Actualizamos persistencia
                    this.persistenciaAlterna.guardar(
                        CLAVE_DATOS_BASICOS_EMPRESA,
                        respuesta.data
                    );

                    resolve(
                        Resultado.ok<OperacionExitosaDTO>({
                            mensaje: OPERACION_EXITOSA,
                        })
                    );
                })
                .catch((e) => {
                    resolve(
                        Resultado.falla<any>({
                            mensaje: OPERACION_FALLIDA,
                        })
                    );
                });
        });
    }
}
