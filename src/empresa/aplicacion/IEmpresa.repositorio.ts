import { Resultado } from "../../comun/dominio/resultado";
import { SolicitudDatosBasicosDTO } from "./casoDeUso/ObtenerDatosBasicos.cu";
import { DatosBasicosEmpresaDTO } from "./dto/DatosBasicosEmpresaDTO";
import { OperacionExitosaDTO } from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";

export interface IEmpresaRepo {

    obtenerDatosBasicos(
        id: SolicitudDatosBasicosDTO
    ): Resultado<DatosBasicosEmpresaDTO>;

    actualizarDatosBasicos(
        ofertaLaboral: DatosBasicosEmpresaDTO
    ): Resultado<OperacionExitosaDTO>;
}
