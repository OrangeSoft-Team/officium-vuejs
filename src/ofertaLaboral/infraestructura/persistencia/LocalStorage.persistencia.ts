import { IServicioPersistencia } from "../../../comun/aplicacion/IServicioPersistencia";
import { Resultado } from "../../../comun/dominio/resultado";

export class LocalStoragePersistencia implements IServicioPersistencia {
    obtener<T>(clave: string): Resultado<T> {
        console.log("[LS] ME SOLICITAN ", clave);
        const recuperado = JSON.parse(<string>localStorage.getItem(clave));
        return Resultado.ok<T>(recuperado);
    }
    guardar(clave: string, valor: any): Resultado<any> {
        console.log("[LS] GUARDO ", clave, valor);
        localStorage.setItem(clave, JSON.stringify(valor));
        return Resultado.ok<any>(true);
    }
    remover(clave: string): Resultado<any> {
        localStorage.removeItem(clave);
        return Resultado.ok<any>(true);
    }
}
