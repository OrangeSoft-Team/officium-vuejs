import { Resultado } from "../../comun/dominio/resultado";
import { Identificador } from "../../comun/dominio/valueObjects/Identificador";
import { Empleado, EmpleadoProps } from "../dominio/Empleado";
import { PrimerApellido } from "../dominio/valueObject/primerApellido";
import { PrimerNombre } from "../dominio/valueObject/primerNombre";
import { EmpleadoDTO } from "./EmpleadoDTO";
import { DireccionDTO } from "../../comun/aplicacion/dtos/DireccionDTO";
import { DireccionMapeador } from "../../comun/aplicacion/mapeador/Direccion.mapaeador";
import { CiudadMapeador } from "../../comun/aplicacion/mapeador/Ciudad.mapaeador";
import { EstadoMapeador } from "../../comun/aplicacion/mapeador/Estado.mapeador";
import { PaisMapeador } from "../../comun/aplicacion/mapeador/Pais.mapeador";
import { Correo } from "../../comun/dominio/valueObjects/correoElectronico";
import { NumeroTelef } from "../../comun/dominio/valueObjects/numeroTelefonico";
import { SegundoNombre } from "../dominio/valueObject/segundoNombre";
import { SegundoApellido } from "../dominio/valueObject/segundoApellido";
import { Direccion } from "../../comun/dominio/entidades/Direccion";
import { Pais } from "../../comun/dominio/entidades/Pais";
import { Estado } from "../../comun/dominio/entidades/Estado";
import { Ciudad } from "../../comun/dominio/entidades/Ciudad";

export class EmpleadoMapeador {
    public static aDominio(dto: EmpleadoDTO): Resultado<Empleado> {
        //VO principales
        const primerNombreOrError = PrimerNombre.crear(dto.primerNombre);
        if (primerNombreOrError.esFallido)
            return Resultado.falla<any>(primerNombreOrError.error);

        const primerApellidoOrError = PrimerApellido.crear(dto.primerApellido);
        if (primerApellidoOrError.esFallido)
            return Resultado.falla<any>(primerApellidoOrError.error);

        //Propiedades de la entidad
        let empleadoProps: EmpleadoProps = {
            primerNombre: primerNombreOrError.getValue(),
            primerApellido: primerApellidoOrError.getValue(),
        };

        //OPCIONALES
        let uuidOrError: Resultado<Identificador>;
        if (dto.hasOwnProperty("uuidEmpleado")) {
            uuidOrError = Identificador.crear(<string>dto.uuidEmpleado);
            if (uuidOrError.esFallido)
                return Resultado.falla<any>(uuidOrError.error);
            empleadoProps.identificadorEmpleado = uuidOrError.getValue();
        }

        let direccionOrError: Resultado<Direccion>;
        if (
            dto.hasOwnProperty("calleUno") &&
            dto.hasOwnProperty("codigoPostal")
        ) {
            //Entidad direccion
            let direccionDTO: DireccionDTO = {
                calleUno: <string>dto.calleUno,
                codigoPostal: <string>dto.codigoPostal,
            };

            if (dto.hasOwnProperty("calleDos") && dto.calleDos != undefined)
                direccionDTO.calleDos = dto.calleDos;

            direccionOrError = DireccionMapeador.aDominio(direccionDTO);
            if (direccionOrError.esFallido)
                return Resultado.falla<any>(direccionOrError.error);

            empleadoProps.direccion = direccionOrError.getValue();
        }

        let segundoNombreOrError: Resultado<SegundoNombre>;
        if (
            dto.hasOwnProperty("segundoNombre") &&
            dto.segundoNombre != undefined
        ) {
            segundoNombreOrError = SegundoNombre.crear(dto.segundoNombre);
            if (segundoNombreOrError.esFallido)
                return Resultado.falla<any>(segundoNombreOrError.error);

            //Agregamos al ser valido
            empleadoProps.segundoNombre = segundoNombreOrError.getValue();
        }

        let segundoApellidoOrError: Resultado<SegundoApellido>;
        if (
            dto.hasOwnProperty("segundoApellido") &&
            dto.segundoApellido != undefined
        ) {
            segundoApellidoOrError = SegundoApellido.crear(dto.segundoApellido);
            if (segundoApellidoOrError.esFallido)
                return Resultado.falla<any>(segundoApellidoOrError.error);

            //Agregamos al ser valido
            empleadoProps.segundoApellido = segundoApellidoOrError.getValue();
        }

        let paisOrError: Resultado<Pais>;
        if (dto.hasOwnProperty("uuidPais") && dto.uuidPais != undefined) {
            paisOrError = PaisMapeador.aDominio({ uuidPais: dto.uuidPais });
            if (paisOrError.esFallido)
                return Resultado.falla<any>(paisOrError.error);

            //Agregamos al ser valido
            empleadoProps.pais = paisOrError.getValue();
        }

        let estadoOrError: Resultado<Estado>;
        if (dto.hasOwnProperty("uuidEstado") && dto.uuidEstado != undefined) {
            estadoOrError = EstadoMapeador.aDominio({
                uuidEstado: dto.uuidEstado,
            });
            if (estadoOrError.esFallido)
                return Resultado.falla<any>(estadoOrError.error);

            //Agregamos al ser valido
            empleadoProps.estado = estadoOrError.getValue();
        }

        let ciudadOrError: Resultado<Ciudad>;
        if (dto.hasOwnProperty("uuidCiudad") && dto.uuidCiudad != undefined) {
            ciudadOrError = CiudadMapeador.aDominio({
                uuidCiudad: dto.uuidCiudad,
            });
            if (ciudadOrError.esFallido)
                return Resultado.falla<any>(ciudadOrError.error);

            //Agregamos al ser valido
            empleadoProps.ciudad = ciudadOrError.getValue();
        }

        let correoOrError: Resultado<Correo>;
        if (
            dto.hasOwnProperty("correoElectronico") &&
            dto.correoElectronico != undefined
        ) {
            correoOrError = Correo.crear(dto.correoElectronico);
            if (correoOrError.esFallido)
                return Resultado.falla<any>(correoOrError.error);

            //Agregamos al ser valido
            empleadoProps.correoElectronico = correoOrError.getValue();
        }

        let telefonoOrError: Resultado<NumeroTelef>;
        if (dto.hasOwnProperty("telefono") && dto.telefono != undefined) {
            telefonoOrError = NumeroTelef.crear(dto.telefono);
            if (telefonoOrError.esFallido)
                return Resultado.falla<any>(telefonoOrError.error);

            //Agregamos al ser valido
            empleadoProps.telefono = telefonoOrError.getValue();
        }

        return Resultado.ok<Empleado>(Empleado.crear(empleadoProps).getValue());
    }

    public static aDominioConjunto(dtos: EmpleadoDTO[]): Resultado<Empleado[]> {
        //Convertimos a dominio array
        let arrayEmpleado: Empleado[] = [];

        for (let empleado of dtos) {
            let empleadoEntidadOrError = EmpleadoMapeador.aDominio(empleado);
            //En caso de fallo
            if (empleadoEntidadOrError.esFallido) {
                return Resultado.falla<any>(empleadoEntidadOrError.error);
            }

            //En caso de ser valido
            arrayEmpleado.push(empleadoEntidadOrError.getValue());
        }

        return Resultado.ok<Empleado[]>(arrayEmpleado);
    }

    public static aDTO(entidad: Empleado): Resultado<EmpleadoDTO> {
        //Extraemos valores de la entidad
        let respuestaDTO: EmpleadoDTO = {
            primerNombre: entidad.props.primerNombre.valor(),
            primerApellido: entidad.props.primerApellido.valor(),
        };

        //Opcionales
        if (
            entidad.props.hasOwnProperty("identificadorEmpleado") &&
            entidad.props.identificadorEmpleado != undefined
        ) {
            respuestaDTO.uuidEmpleado =
                entidad.props.identificadorEmpleado.valor();
        }

        if (
            entidad.props.hasOwnProperty("segundoNombre") &&
            entidad.props.segundoNombre != undefined
        ) {
            respuestaDTO.segundoNombre = entidad.props.segundoNombre.valor();
        }

        if (
            entidad.props.hasOwnProperty("segundoApellido") &&
            entidad.props.segundoApellido != undefined
        ) {
            respuestaDTO.segundoApellido =
                entidad.props.segundoApellido.valor();
        }

        if (
            entidad.props.hasOwnProperty("direccion") &&
            entidad.props.direccion != undefined
        ) {
            if (
                entidad.props.direccion.props.hasOwnProperty("calleDos") &&
                entidad.props.direccion.props.calleDos != undefined
            ) {
                respuestaDTO.calleDos =
                    entidad.props.direccion.props.calleDos.valor();
            }

            if (
                entidad.props.direccion.props.hasOwnProperty("calleUno") &&
                entidad.props.direccion.props.calleUno != undefined
            ) {
                respuestaDTO.calleUno =
                    entidad.props.direccion.props.calleUno.valor();
            }

            if (
                entidad.props.direccion.props.hasOwnProperty("codigoPostal") &&
                entidad.props.direccion.props.codigoPostal != undefined
            ) {
                respuestaDTO.codigoPostal =
                    entidad.props.direccion.props.codigoPostal.valor();
            }
        }

        if (
            entidad.props.hasOwnProperty("pais") &&
            entidad.props.pais != undefined
        ) {
            respuestaDTO.uuidPais = entidad.props.pais.props.idPais.valor();
        }

        if (
            entidad.props.hasOwnProperty("estado") &&
            entidad.props.estado != undefined
        ) {
            respuestaDTO.uuidEstado =
                entidad.props.estado.props.idEstado.valor();
        }

        if (
            entidad.props.hasOwnProperty("ciudad") &&
            entidad.props.ciudad != undefined
        ) {
            respuestaDTO.uuidCiudad =
                entidad.props.ciudad.props.idCiudad.valor();
        }

        if (
            entidad.props.hasOwnProperty("correoElectronico") &&
            entidad.props.correoElectronico != undefined
        ) {
            respuestaDTO.correoElectronico =
                entidad.props.correoElectronico.valor();
        }

        if (
            entidad.props.hasOwnProperty("telefono") &&
            entidad.props.telefono != undefined
        ) {
            respuestaDTO.telefono = entidad.props.telefono.valor();
        }

        return Resultado.ok<EmpleadoDTO>(respuestaDTO);
    }

    public static aDTOConjunto(
        entidades: Empleado[]
    ): Resultado<EmpleadoDTO[]> {
        //Convertimos a dominio array
        let arrayEmpleado: EmpleadoDTO[] = [];

        for (let empleado of entidades) {
            let empleadoEntidadOrError = EmpleadoMapeador.aDTO(empleado);
            //En caso de fallo
            if (empleadoEntidadOrError.esFallido) {
                return Resultado.falla<any>(empleadoEntidadOrError.error);
            }

            //En caso de ser valido
            arrayEmpleado.push(empleadoEntidadOrError.getValue());
        }

        return Resultado.ok<EmpleadoDTO[]>(arrayEmpleado);
    }
}
