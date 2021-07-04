import { Resultado } from "../../comun/dominio/resultado";
import { OperacionExitosaDTO } from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import { DatosBasicosEmpresaDTO } from "./dto/DatosBasicosEmpresaDTO";
import { SolicitudDatosBasicosDTO } from "./casoDeUso/ObtenerDatosBasicos.cu";

export interface IEmpresaRepo {
    obtenerDatosBasicos(
        id: SolicitudDatosBasicosDTO
    ): Resultado<DatosBasicosEmpresaDTO>;

    actualizarDatosBasicos(
        datosBasicos: DatosBasicosEmpresaDTO
    ): Resultado<OperacionExitosaDTO>;
}
