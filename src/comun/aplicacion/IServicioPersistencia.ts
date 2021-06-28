import { Resultado } from "../dominio/resultado";

export interface IServicioPersistencia {
    //Metodo para recuperar la informacion
    obtener<T>(clave: string): Resultado<T>;

    //Almacenar estructura en persistencia
    guardar(clave: string, valor: any): Resultado<any>;

    //Eliminar datos de una clave
    remover(clave: string): Resultado<any>;
}
