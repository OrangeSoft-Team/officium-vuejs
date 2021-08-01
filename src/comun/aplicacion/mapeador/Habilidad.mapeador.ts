import { Habilidad, HabilidadProps } from "../../dominio/entidades/habilidad";
import { Resultado } from "../../dominio/resultado";
import { Identificador } from "../../dominio/valueObjects/Identificador";
import { nombreHabilidad } from "../../dominio/valueObjects/nombreHabilidad";
import { categoriaHabilidad } from "../../dominio/valueObjects/categoriaHabilidad";
import { HabilidadDTO } from "../dtos/HabilidadDTO";

export class HabilidadMapeador {
    public static aDominio(dto: HabilidadDTO): Resultado<Habilidad> {
        const idHabilidadOrError = Identificador.crear(dto.uuid);
        if (idHabilidadOrError.esFallido)
            return Resultado.falla<any>(idHabilidadOrError.error);

        //Propiedades de la entidad
        let habilidadProps: HabilidadProps = {
            idHabilidad: idHabilidadOrError.getValue(),
        };

        //Opcionales
        let nombreOrError: Resultado<nombreHabilidad>;
        if (dto.hasOwnProperty("nombre") && dto.nombre != undefined) {
            nombreOrError = nombreHabilidad.crear(dto.nombre);
            if (nombreOrError.esFallido)
                return Resultado.falla<any>(nombreOrError.error);

            //Agregamos al ser valido
            habilidadProps.nombre = nombreOrError.getValue();
        }

        let categoriaOrError: Resultado<categoriaHabilidad>;
        if (dto.hasOwnProperty("categoria") && dto.categoria != undefined) {
            categoriaOrError = categoriaHabilidad.crear(dto.categoria);
            if (categoriaOrError.esFallido)
                return Resultado.falla<any>(categoriaOrError.error);

            //Agregamos al ser valido
            habilidadProps.categoria = categoriaOrError.getValue();
        }

        //Devolvemos entidad
        return Resultado.ok<Habilidad>(
            Habilidad.crear(habilidadProps).getValue()
        );
    }

    public static aDTO(entidad: Habilidad): Resultado<HabilidadDTO> {
        //Extraemos valores de la entidad
        let propsDTO: HabilidadDTO = {
            uuid: entidad.props.idHabilidad.valor(),
        };

        //Opcionales
        if (
            entidad.props.hasOwnProperty("nombre") &&
            entidad.props.nombre != undefined
        ) {
            propsDTO.nombre = entidad.props.nombre.valor();
        }

        if (
            entidad.props.hasOwnProperty("categoria") &&
            entidad.props.categoria != undefined
        ) {
            propsDTO.categoria = entidad.props.categoria.valor();
        }

        return Resultado.ok<HabilidadDTO>(propsDTO);
    }

    public static aDominioConjunto(
        dtos: HabilidadDTO[]
    ): Resultado<Habilidad[]> {
        //Convertimos a dominio array
        let arrayPaises: Habilidad[] = [];

        for (let hab of dtos) {
            let habilidadOrError = HabilidadMapeador.aDominio(hab);
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

        return Resultado.ok<HabilidadDTO[]>(arrayHabilidades);
    }

    public static aArregloID(habilidades: HabilidadDTO[]): string[] {
        let arregloRespuesta: string[] = [];
        console.log('MAPEADOR DE HABILIDAD')
        console.log(habilidades)
        for (let had of habilidades) {
            arregloRespuesta.push(had.uuid);
        }

        return arregloRespuesta;
    }
}
