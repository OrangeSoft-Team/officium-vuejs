export abstract class Entidad {
    public esIgual(entidad: Entidad): boolean {
        //No definido => falso
        if (entidad == null || entidad == undefined) return false;

        //Igualdad => verdadero
        if (this == entidad) return true;

        //Otro caso
        return false;
    }
}
