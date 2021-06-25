export interface CasoUso<ISolicitud, IRespuesta> {
    ejecutar(solicitud?: ISolicitud): Promise<IRespuesta> | IRespuesta;
}
