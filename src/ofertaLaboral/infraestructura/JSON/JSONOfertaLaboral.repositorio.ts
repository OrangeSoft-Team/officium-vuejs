import { SolicitudOfertasLaboralesActivasDTO } from "../../aplicacion/casoDeUso/ObtenerOfertasLaboralesActivas.cu";
import { OfertaLaboralEmpresaDTO } from "../../aplicacion/dto/OfertaLaboralEmpresaDTO";
import { Resultado } from "../../../comun/dominio/resultado";
import { IOfertasLaboralesRepo } from "../../aplicacion/IOfertaLaboral.repositorio";
import {
    OFERTAS_LABORALES_RESPUESTA_CON_ERROR_VACANTES,
    OFERTAS_LABORALES_RESPUESTA_VALIDA,
    OFERTA_LABORAL_RESPUESTA_VALIDA,
} from "./ofertasLaboralesRespuestas";
import { SolicitudOfertaLaboralDTO } from "@/ofertaLaboral/aplicacion/casoDeUso/ObtenerOfertaLaboralDetalle.cu";
import { SolicitudCreacionOfertaLaboralDTO } from "@/ofertaLaboral/aplicacion/casoDeUso/CrearOfertaLaboral.cu";
import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";

import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import {
    CLAVE_CONJUNTO_OFERTAS_LABORALES,
    CLAVE_ID_EMPRESA,
    CLAVE_ULT_OFERTA_LABORAL,
} from "../../../comun/infraestructura/persistencia/ClavesLocalStorage";

export class JSONOfertaLaboralRepositorio implements IOfertasLaboralesRepo {
    private persistenciaAlterna: IServicioPersistencia;

    constructor(implPersistencia: IServicioPersistencia) {
        this.persistenciaAlterna = implPersistencia;
    }

    crearOfertaLaboral(
        ofertaLaboral: SolicitudCreacionOfertaLaboralDTO
    ): Resultado<OperacionExitosaDTO> {
        //Solicitamos ID de empresa para la petición
        const idEmpresaOrError =
            this.persistenciaAlterna.obtener(CLAVE_ID_EMPRESA);
        if (idEmpresaOrError.esFallido)
            return Resultado.falla<any>(OPERACION_FALLIDA);

        ofertaLaboral.uuidempresa = <string>idEmpresaOrError.getValue();

        //Esperamos respuesta

        //En caso de respuesta exitosa
        return Resultado.ok<OperacionExitosaDTO>({
            mensaje: OPERACION_EXITOSA,
        });
    }

    obtenerOfertasLaboralesActivas(
        id: SolicitudOfertasLaboralesActivasDTO
    ): Resultado<OfertaLaboralEmpresaDTO[]> {
        const DATOS_RESPUESTA = OFERTAS_LABORALES_RESPUESTA_VALIDA;
        // OFERTAS_LABORALES_RESPUESTA_CON_ERROR_VACANTES

        //Almacenamos en persitencia en respuesta exitosa
        this.persistenciaAlterna.guardar(
            CLAVE_CONJUNTO_OFERTAS_LABORALES,
            DATOS_RESPUESTA
        );

        //Respondemos a la solicitud
        return Resultado.ok<OfertaLaboralEmpresaDTO[]>(DATOS_RESPUESTA);
    }

    obtenerOfertaLaboralDetalle(
        id: SolicitudOfertaLaboralDTO
    ): Resultado<OfertaLaboralEmpresaDTO> {
        let i: number = 0;

        for (i = 0; i <= OFERTAS_LABORALES_RESPUESTA_VALIDA.length; i++) {
            if (
                OFERTAS_LABORALES_RESPUESTA_VALIDA[i].idOfertaLaboral ===
                id.idOfertaLaboral
            ) {
                const respuesta: OfertaLaboralEmpresaDTO =
                    OFERTAS_LABORALES_RESPUESTA_VALIDA[i];

                this.persistenciaAlterna.guardar(
                    CLAVE_ULT_OFERTA_LABORAL,
                    respuesta
                );

                return Resultado.ok<OfertaLaboralEmpresaDTO>(respuesta);
            }
        }

        //TODO Mensaje de error generico
        return Resultado.falla<any>("");
    }
}
function OPERACION_FALLIDA<T>(
    OPERACION_FALLIDA: any
): Resultado<OperacionExitosaDTO> {
    throw new Error("Function not implemented.");
}
