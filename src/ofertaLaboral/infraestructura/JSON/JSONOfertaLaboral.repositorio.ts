import { OfertaLaboralEmpresaDTO } from "../../aplicacion/dto/OfertaLaboralEmpresaDTO";
import { Resultado } from "../../../comun/dominio/resultado";
import { IOfertasLaboralesRepo } from "../../aplicacion/IOfertaLaboral.repositorio";
import { SolicitudOfertaLaboralDTO } from "@/ofertaLaboral/aplicacion/casoDeUso/ObtenerOfertaLaboralDetalle.cu";
import { SolicitudCreacionOfertaLaboralDTO } from "@/ofertaLaboral/aplicacion/casoDeUso/CrearOfertaLaboral.cu";
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
import {
    OFERTAS_LABORALES_DETALLADAS_VALIDAS,
    OFERTAS_LABORALES_RESPUESTA_VALIDA,
} from "./respuestas/ListadoOfertasLaborales";
import { RespuestaInicioSesionDTO } from "../../../sesion/aplicacion/dto/RespuestaInicioSesionDTO";
import { CrearOfertaLaboralDTO } from "../../aplicacion/dto/CrearOfertaLaboralDTO";
import { HabilidadDTO } from "../../../comun/aplicacion/dtos/HabilidadDTO";
import { ModificarOfertaLaboralDTO } from "../../aplicacion/dto/ModificarOfertaLaboralDTO";

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
    ): Resultado<OperacionExitosaDTO> {
        //Solicitamos ID de empresa para la petición
        /*const datosEmpresaOrError =
            this.persistenciaAlterna.obtener<RespuestaInicioSesionDTO>(
                CLAVE_SESION_USUARIO
            );

        if (datosEmpresaOrError.esFallido)
            return Resultado.falla<any>(OPERACION_FALLIDA);*/

        //Fake id

        //Esperamos respuesta
        //Simulamos anexar
        let arregloOfertas: OfertaLaboralEmpresaDTO[] = [];
        const listadoOrError = this.persistenciaAlterna.obtener(
            CLAVE_CONJUNTO_OFERTAS_LABORALES
        );
        //Anexamos a array
        if (listadoOrError.esExitoso) {
            arregloOfertas = <OfertaLaboralEmpresaDTO[]>(
                listadoOrError.getValue()
            );
        }

        //Generamos  y fecha fake
        let auxiliarDTO: auxiliarJSONCrearOfertaLaboralDTO = {
            uuid: (Math.random() * 1000).toFixed(0),
            fechaPublicacion: "10/10/2020",
            titulo: ofertaLaboral.titulo,
            cargo: ofertaLaboral.cargo,
            sueldo: ofertaLaboral.sueldo,
            duracionEstimadaValor: ofertaLaboral.duracionEstimadaValor,
            duracionEstimadaEscala: ofertaLaboral.duracionEstimadaEscala,
            turnoTrabajo: ofertaLaboral.turnoTrabajo,
            numeroVacantes: ofertaLaboral.numeroVacantes,
            descripcion: ofertaLaboral.descripcion,
            habilidades: [
                {
                    uuid: "sa5d45s4d5sa",
                    nombre: "Hace nudos",
                    categoria: "manual",
                },
            ],
            requisitosEspeciales: ofertaLaboral.requisitosEspeciales,
        };
        arregloOfertas.push(auxiliarDTO);
        console.log(arregloOfertas);

        //Guardamos de nuevo
        const almacenarOrError = this.persistenciaAlterna.guardar(
            CLAVE_CONJUNTO_OFERTAS_LABORALES,
            arregloOfertas
        );
        if (almacenarOrError.esFallido)
            return Resultado.falla<any>(almacenarOrError.error);

        //En caso de respuesta exitosa
        return Resultado.ok<OperacionExitosaDTO>({
            mensaje: OPERACION_EXITOSA,
        });
    }

    obtenerOfertasLaboralesActivas(): Resultado<OfertaLaboralEmpresaDTO[]> {
        let DATOS_RESPUESTA: OfertaLaboralEmpresaDTO[] = [];
        // OFERTAS_LABORALES_RESPUESTA_CON_ERROR_VACANTES

        //Obtenemos de persitencia
        const listadoOrError = this.persistenciaAlterna.obtener(
            CLAVE_CONJUNTO_OFERTAS_LABORALES
        );
        if (listadoOrError.esFallido) {
            //Almacenamos en persitencia en respuesta exitosa
            const A_RESPONDER_DEFAULT = OFERTAS_LABORALES_DETALLADAS_VALIDAS;
            this.persistenciaAlterna.guardar(
                CLAVE_CONJUNTO_OFERTAS_LABORALES,
                A_RESPONDER_DEFAULT
            );
            DATOS_RESPUESTA = A_RESPONDER_DEFAULT;
        } else {
            //Obtenemos almacenado
            DATOS_RESPUESTA = <OfertaLaboralEmpresaDTO[]>(
                listadoOrError.getValue()
            );
        }

        //Respondemos a la solicitud
        return Resultado.ok<OfertaLaboralEmpresaDTO[]>(DATOS_RESPUESTA);
    }

    obtenerOfertaLaboralDetalle(
        id: SolicitudOfertaLaboralDTO
    ): Resultado<OfertaLaboralEmpresaDTO> {
        //Esperamos respuesta
        let arregloOfertas: OfertaLaboralEmpresaDTO[] =
            OFERTAS_LABORALES_DETALLADAS_VALIDAS;
        const listadoOrError = this.persistenciaAlterna.obtener(
            CLAVE_CONJUNTO_OFERTAS_LABORALES
        );
        //Anexamos a array
        if (listadoOrError.esExitoso) {
            arregloOfertas = <OfertaLaboralEmpresaDTO[]>(
                listadoOrError.getValue()
            );
        }

        for (let i: number = 0; i <= arregloOfertas.length; i++) {
            if (arregloOfertas[i].uuid === id.idOfertaLaboral) {
                const respuesta: OfertaLaboralEmpresaDTO = arregloOfertas[i];

                this.persistenciaAlterna.guardar(
                    CLAVE_ULT_OFERTA_LABORAL,
                    respuesta
                );

                return Resultado.ok<OfertaLaboralEmpresaDTO>(respuesta);
            }
        }

        return Resultado.falla<any>(OPERACION_FALLIDA);
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
