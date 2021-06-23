export class Resultado<T> {
    public esExitoso: boolean;
    public esFallido: boolean
    public error: T | string | undefined;
    private valor: T | undefined;
  
    public constructor (esExitoso: boolean, error?: T | string, value?: T) {
      if (esExitoso && error) {
        throw new Error("InvalidOperation: A result cannot be successful and contain an error");
      }
      
      if (!esExitoso && !error) {
        throw new Error("InvalidOperation: A failing result needs to contain an error message");
      }
  
      this.esExitoso = esExitoso;
      this.esFallido = !esExitoso;
      this.error = error;
      this.valor = value;
      
      Object.freeze(this);
    }
  
    public getValue () : T | undefined {
      if (!this.esExitoso) {
        return this.error as T;
      } 
  
      return this.valor;
    }
  
    public static ok<U> (value?: U) : Resultado<U> {
      return new Resultado<U>(true, undefined, value);
    }
  
    public static falla<U> (error: any): Resultado<U> {
      return new Resultado<U>(false, error);
    }
  }