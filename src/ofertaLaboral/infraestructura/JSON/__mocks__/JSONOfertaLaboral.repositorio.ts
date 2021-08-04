import { OfertaLaboralEmpresaDTO } from "../../../aplicacion/dto/OfertaLaboralEmpresaDTO";
import { Resultado } from "../../../../comun/dominio/resultado";
import { IOfertasLaboralesRepo } from "../../../aplicacion/IOfertaLaboral.repositorio";
import { SolicitudOfertaLaboralDTO } from "@/ofertaLaboral/aplicacion/casoDeUso/ObtenerOfertaLaboralDetalle.cu";
import { SolicitudCreacionOfertaLaboralDTO } from "@/ofertaLaboral/aplicacion/casoDeUso/CrearOfertaLaboral.cu";
import {
    OperacionExitosaDTO,
    OPERACION_EXITOSA,
} from "../../../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { OFERTAS_LABORALES_RESPUESTA_VALIDA } from "../../../infraestructura/JSON/respuestas/ListadoOfertasLaborales";
import { OFERTA_LABORAL_RESPUESTA_VALIDA } from "../../../infraestructura/JSON/respuestas/IndividualOfertaLaboral";
import { CrearOfertaLaboralDTO } from "../../../aplicacion/dto/CrearOfertaLaboralDTO";
import { ModificarOfertaLaboralDTO } from "../../../aplicacion/dto/ModificarOfertaLaboralDTO";

export class JSONOfertaLaboralRepositorio implements IOfertasLaboralesRepo {
    crearOfertaLaboral(
        ofertaLaboral: CrearOfertaLaboralDTO
    ): Promise<Resultado<OperacionExitosaDTO>> {
        return new Promise((resolve, reject) => {
            resolve(
                Resultado.ok<OperacionExitosaDTO>({
                    mensaje: OPERACION_EXITOSA,
                })
            );
        });
    }

    obtenerOfertasLaboralesActivas(): Promise<
        Resultado<OfertaLaboralEmpresaDTO[]>
    > {
        return new Promise((resolve, reject) => {
            resolve(
                Resultado.ok<OfertaLaboralEmpresaDTO[]>(
                    OFERTAS_LABORALES_RESPUESTA_VALIDA
                )
            );
        });
    }

    obtenerOfertaLaboralDetalle(
        id: SolicitudOfertaLaboralDTO
    ): Promise<Resultado<OfertaLaboralEmpresaDTO>> {
        return new Promise((resolve, reject) => {
            resolve(
                Resultado.ok<OfertaLaboralEmpresaDTO>(
                    OFERTA_LABORAL_RESPUESTA_VALIDA
                )
            );
        });
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

    cancelaOfertaLaboral(
        identificador: SolicitudOfertaLaboralDTO
    ): Resultado<OperacionExitosaDTO> {
        //Respondemos a la solicitud
        return Resultado.ok<OperacionExitosaDTO>({
            mensaje: OPERACION_EXITOSA,
        });
    }
}
