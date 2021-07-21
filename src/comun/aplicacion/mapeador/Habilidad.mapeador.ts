import { Habilidad, HabilidadProps } from "../../dominio/entidades/habilidad";
import { Resultado } from "../../dominio/resultado";
import { Identificador } from "../../dominio/valueObjects/Identificador";
import { NombreHabilidad } from "../../dominio/valueObjects/nombreHabilidad";
import { CategoriaHabilidad } from "../../dominio/valueObjects/categoriaHabilidad";
import { HabilidadDTO } from "../dtos/HabilidadDTO";

export class HabilidadMapeador {
    public static aDominio(dto: HabilidadDTO): Resultado<Habilidad> {
        let nombreHabilidadOrError = NombreHabilidad.crear(dto.nombreHabilidad);
        if (nombreHabilidadOrError.esFallido)
            return Resultado.falla<any>(nombreHabilidadOrError.error);
        let categoriaHabilidadOrError = CategoriaHabilidad.crear(dto.categoriaHabilidad);
        if (categoriaHabilidadOrError.esFallido)
            return Resultado.falla<any>(categoriaHabilidadOrError.error);

        //Propiedades de la entidad
        let paisProps: HabilidadProps = {
            nombre: nombreHabilidadOrError.getValue(),
            categoria: categoriaHabilidadOrError.getValue()
        };

        //Opcional
        let idHabilidadOrError: Resultado<Identificador>;
        if (dto.hasOwnProperty("uuidHabilidad") && dto.uuidHabilidad != undefined) {
            idHabilidadOrError = Identificador.crear(dto.uuidHabilidad);
            if (idHabilidadOrError.esFallido)
                return Resultado.falla<any>(idHabilidadOrError.error);

            //Agregamos al ser valido
            paisProps.idHabilidad = idHabilidadOrError.getValue();
        }

        //Devolvemos entidad
        return Resultado.ok<Habilidad>(Habilidad.crear(paisProps).getValue());
    }
    
    public static aDTO(entidad: Habilidad): Resultado<HabilidadDTO> {
        //Extraemos valores de la entidad
        let propsDTO: HabilidadDTO = {
            nombreHabilidad: entidad.props.nombre.valor(),
            categoriaHabilidad: entidad.props.categoria.valor(),
        };

        //Opcionales
        if (entidad.props.hasOwnProperty("idHabilidad") && entidad.props.idHabilidad != undefined) {
            propsDTO.uuidHabilidad = entidad.props.idHabilidad.valor();
        }

        return Resultado.ok<HabilidadDTO>(propsDTO);
    }

    
    public static aDominioConjunto(
        dtos: HabilidadDTO[]
    ): Resultado<Habilidad[]> {
        //Convertimos a dominio array
        let arrayPaises: Habilidad[] = [];

        for (let hab of dtos) {
            let habilidadOrError =
            HabilidadMapeador.aDominio(hab);
            //En caso de fallo
            if (habilidadOrError.esFallido) {
                return Resultado.falla<any>(habilidadOrError.error);
            }

            //En caso de ser valido
            arrayPaises.push(habilidadOrError.getValue());
        }

        return Resultado.ok<Habilidad[]>(arrayPaises);
    }

    public static aDTOConjunto(
        entidades: Habilidad[]
    ): Resultado<HabilidadDTO[]> {
        //Array auxiliar
        let arrayHabilidades: HabilidadDTO[] = [];

        for (let hab of entidades) {
            let ofertaDTOOrError = HabilidadMapeador.aDTO(hab);

            if (ofertaDTOOrError.esFallido)
                return Resultado.falla<any>(ofertaDTOOrError.error);

                arrayHabilidades.push(ofertaDTOOrError.getValue());
        }

        return Resultado.ok<HabilidadDTO[]>(
            arrayHabilidades
        );
    }

}
