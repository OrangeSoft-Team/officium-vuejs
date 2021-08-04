import { OfertaLaboralEmpresaDTO } from "../../aplicacion/dto/OfertaLaboralEmpresaDTO";
import { Resultado } from "../../../comun/dominio/resultado";
import { IOfertasLaboralesRepo } from "../../aplicacion/IOfertaLaboral.repositorio";
import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { OPERACION_FALLIDA } from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionFallida";
import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import {
    CLAVE_CONJUNTO_OFERTAS_LABORALES,
    CLAVE_ID_EMPRESA,
    CLAVE_SESION_USUARIO,
    CLAVE_ULT_OFERTA_LABORAL,
} from "../../../comun/infraestructura/persistencia/ClavesLocalStorage";
import { RespuestaInicioSesionDTO } from "../../../sesion/aplicacion/dto/RespuestaInicioSesionDTO";
import { CrearOfertaLaboralDTO } from "../../aplicacion/dto/CrearOfertaLaboralDTO";
import { HabilidadDTO } from "../../../comun/aplicacion/dtos/HabilidadDTO";
import { ModificarOfertaLaboralDTO } from "../../aplicacion/dto/ModificarOfertaLaboralDTO";
import { SolicitudOfertaLaboralDTO } from "../../aplicacion/casoDeUso/ObtenerOfertaLaboralDetalle.cu";
import { OFERTAS_LABORALES_DETALLADAS_VALIDAS } from "../JSON/respuestas/ListadoOfertasLaborales";
import axios from "axios";
import { SPRING_URL_BASE } from "../../../main";

interface auxiliarJSONCrearOfertaLaboralDTO {
    uuid?: string;
    fechaPublicacion?: string;
    uuidempresa?: string;
    titulo: string;
    cargo: string;
    sueldo: number;
    duracionEstimadaValor: number;
    duracionEstimadaEscala: string;
    turnoTrabajo: string;
    numeroVacantes: number;
    descripcion: string;
    habilidades: HabilidadDTO[];
    requisitosEspeciales?: string;
}

export class JSONOfertaLaboralRepositorio implements IOfertasLaboralesRepo {
    private persistenciaAlterna: IServicioPersistencia;

    constructor(implPersistencia: IServicioPersistencia) {
        this.persistenciaAlterna = implPersistencia;
    }

    modificarOfertaLaboral(
        ofertaLaboral: ModificarOfertaLaboralDTO,
        identificador: { uuid: string }
    ): Resultado<OperacionExitosaDTO> {
        //En caso de respuesta exitosa
        return Resultado.ok<OperacionExitosaDTO>({
            mensaje: OPERACION_EXITOSA,
        });
    }

    crearOfertaLaboral(
        ofertaLaboral: CrearOfertaLaboralDTO
    ): Promise<Resultado<OperacionExitosaDTO>> {
        return new Promise((resolve, reject) => {
            //Solicitamos ID de empresa para la petición
            axios
                .post(
                    SPRING_URL_BASE + "empleador/ofertas_laborales",
                    ofertaLaboral
                )
                .then((res) => {
                    //En caso de respuesta exitosa
                    resolve(
                        Resultado.ok<OperacionExitosaDTO>({
                            mensaje: OPERACION_EXITOSA,
                        })
                    );
                })
                .catch((e) => {
                    resolve(Resultado.falla<any>(e));
                });
        });
    }

    obtenerOfertasLaboralesActivas(): Promise<
        Resultado<OfertaLaboralEmpresaDTO[]>
    > {
        return new Promise((resolve, reject) => {
            axios
                .get(SPRING_URL_BASE + "empleador/ofertas_laborales")
                .then((res) => {
                    //Guardamos en persistencia
                    this.persistenciaAlterna.guardar(
                        CLAVE_CONJUNTO_OFERTAS_LABORALES,
                        res.data
                    );

                    //Respondemos
                    resolve(Resultado.ok<OfertaLaboralEmpresaDTO[]>(res.data));
                })
                .catch((e) => {
                    resolve(Resultado.falla<any>(e));
                });
        });
    }

    obtenerOfertaLaboralDetalle(
        id: SolicitudOfertaLaboralDTO
    ): Promise<Resultado<OfertaLaboralEmpresaDTO>> {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    SPRING_URL_BASE +
                        "empleador/ofertas_laborales/" +
                        id.idOfertaLaboral
                )
                .then((res) => {
                    resolve(Resultado.ok<OfertaLaboralEmpresaDTO>(res.data));
                })
                .catch((e) => {
                    resolve(Resultado.falla<any>(e));
                });
        });
    }

    cancelaOfertaLaboral(
        id: SolicitudOfertaLaboralDTO
    ): Resultado<OperacionExitosaDTO> {
        //Respondemos a la solicitud
        return Resultado.ok<OperacionExitosaDTO>({
            mensaje: OPERACION_EXITOSA,
        });
    }
}
