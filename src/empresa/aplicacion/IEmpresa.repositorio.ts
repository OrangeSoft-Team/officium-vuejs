import { Resultado } from "../../comun/dominio/resultado";
import { OperacionExitosaDTO } from "../../comun/aplicacion/dto.respuestaOperaciones/OperacionExitosa";
import {
    ActualizarDatosBasicosEmpresaDTO,
    DatosBasicosEmpresaDTO,
} from "./dto/DatosBasicosEmpresaDTO";
//import { SolicitudDatosBasicosDTO } from "./casoDeUso/ObtenerDatosBasicos.cu";

export interface IEmpresaRepo {
    obtenerDatosBasicos(): Resultado<DatosBasicosEmpresaDTO>;

    actualizarDatosBasicos(
        datosBasicos: ActualizarDatosBasicosEmpresaDTO
    ): Resultado<OperacionExitosaDTO>;
}
