export abstract class Entidad<T> {
    public readonly props: T;

    protected constructor(props: T) {
        this.props = props;
    }

    public esIgual(entidad: Entidad<T>): boolean {
        //No definido => falso
        if (entidad == null || entidad == undefined) return false;

        //Igualdad => verdadero
        if (this == entidad) return true;

        //Otro caso
        return false;
    }
}
