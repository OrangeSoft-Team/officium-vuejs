import { Resultado } from "../../comun/dominio/resultado";
import { Fecha } from "../../comun/dominio/valueObjects/fecha";
import { Identificador } from "../../comun/dominio/valueObjects/Identificador";
import { Trabajo, TrabajoProps } from "../dominio/Trabajo";
import { EstadoTrabajo } from "../dominio/valueObjects/estadoTrabajo";
import { TrabajoEmpresaDTO } from "./dto/TrabajoEmpresaDTO";
import { OfertaLaboralTrabajoDTO } from "../../ofertaLaboral/aplicacion/dto/OfertaLaboralEmpresaDTO";
import { OfertasLaboralesMapeador } from "../../ofertaLaboral/aplicacion/OfertaLaboral.mapeador";
import { EmpleadoDTO } from "../../empleado/aplicacion/EmpleadoDTO";
import { EmpleadoMapeador } from "../../empleado/aplicacion/Empleado.mapeador";

export class TrabajoEmpresaMapeador {
    public static aDominio(dto: TrabajoEmpresaDTO): Resultado<Trabajo> {
        //Value Objects principales
        const fechaInicioOrError = Fecha.crear(dto.fechaInicioTrabajo);
        if (fechaInicioOrError.esFallido)
            return Resultado.falla<any>(fechaInicioOrError.error);

        const estadoTrabajoOrError = EstadoTrabajo.crear(dto.estatus);
        if (estadoTrabajoOrError.esFallido)
            return Resultado.falla<any>(estadoTrabajoOrError.error);

        //Props de Oferta Laboral
        const ofertaLaboralDTOOrError = this.prepararDominioOfertaLaboral(dto);
        if (ofertaLaboralDTOOrError.esFallido)
            return Resultado.falla<any>(ofertaLaboralDTOOrError.error);

        const OfertaLaboralParaTrabajoOrError =
            OfertasLaboralesMapeador.aDominioParaTrabajo(
                ofertaLaboralDTOOrError.getValue()
            );
        if (OfertaLaboralParaTrabajoOrError.esFallido)
            return Resultado.falla<any>(OfertaLaboralParaTrabajoOrError.error);

        //Props de empleado
        const empleadoDTOOrError = this.prepararDominioEmpleado(dto);
        if (empleadoDTOOrError.esFallido)
            return Resultado.falla<any>(empleadoDTOOrError.error);

        const empleadoParaTrabajarOrError = EmpleadoMapeador.aDominio(
            empleadoDTOOrError.getValue()
        );
        if (empleadoParaTrabajarOrError.esFallido)
            return Resultado.falla<any>(empleadoParaTrabajarOrError.error);

        //Propiedades de entidad
        let trabajoProps: TrabajoProps = {
            fechaInicio: fechaInicioOrError.getValue(),
            estado: estadoTrabajoOrError.getValue(),
            ofertaLaboral: OfertaLaboralParaTrabajoOrError.getValue(),
            empleado: empleadoParaTrabajarOrError.getValue(),
        };

        //VO opcionales
        let identificadorTrabajoOrError: Resultado<Identificador>;
        if (dto.hasOwnProperty("uuid") && dto.uuid != undefined) {
            identificadorTrabajoOrError = Identificador.crear(<string>dto.uuid);
            if (identificadorTrabajoOrError.esFallido)
                return Resultado.falla<any>(identificadorTrabajoOrError.error);
            trabajoProps.identificadorTrabajo =
                identificadorTrabajoOrError.getValue();
        }

        let fechaCulminacionOrError: Resultado<Fecha>;
        if (
            dto.hasOwnProperty("fechaCulminacionTrabajo") &&
            dto.fechaCulminacionTrabajo != undefined
        ) {
            fechaCulminacionOrError = Fecha.crear(
                <string>dto.fechaCulminacionTrabajo
            );
            if (fechaCulminacionOrError.esFallido)
                return Resultado.falla<any>(fechaCulminacionOrError.error);
            trabajoProps.fechaCulminacion = fechaCulminacionOrError.getValue();
        }

        //Respondemos
        return Resultado.ok<Trabajo>(Trabajo.crear(trabajoProps).getValue());
    }

    public static aDominioConjunto(
        dtos: TrabajoEmpresaDTO[]
    ): Resultado<Trabajo[]> {
        //Convertimos a dominio array
        let arrayTrabajos: Trabajo[] = [];

        for (let trabajo of dtos) {
            let trabajoEntidadOrError =
                TrabajoEmpresaMapeador.aDominio(trabajo);
            if (trabajoEntidadOrError.esFallido)
                return Resultado.falla<any>(trabajoEntidadOrError.error);

            arrayTrabajos.push(trabajoEntidadOrError.getValue());
        }

        return Resultado.ok<Trabajo[]>(arrayTrabajos);
    }

    public static aDTO(entidad: Trabajo): Resultado<TrabajoEmpresaDTO> {
        //Extraemos de entidad
        let propsDTO: TrabajoEmpresaDTO = {
            titulo: entidad.props.ofertaLaboral.props.titulo.valor(),
            fechaInicioTrabajo: entidad.props.fechaInicio.valor(),
            primerNombreEmpleado:
                entidad.props.empleado.props.primerNombre.valor(),
            primerApellidoEmpleado:
                entidad.props.empleado.props.primerApellido.valor(),
            cargo: entidad.props.ofertaLaboral.props.cargo.valor(),
            estatus: entidad.props.estado.valor(),
        };

        //Opcionales
        if (
            entidad.props.hasOwnProperty("identificadorTrabajo") &&
            entidad.props.identificadorTrabajo != undefined
        ) {
            propsDTO.uuid = entidad.props.identificadorTrabajo.valor();
        }

        if (
            entidad.props.empleado.props.hasOwnProperty("segundoNombre") &&
            entidad.props.empleado.props.segundoNombre != undefined
        ) {
            propsDTO.segundoNombreEmpleado =
                entidad.props.empleado.props.segundoNombre.valor();
        }

        if (
            entidad.props.empleado.props.hasOwnProperty("segundoApellido") &&
            entidad.props.empleado.props.segundoApellido != undefined
        ) {
            propsDTO.segundoApellidoEmpleado =
                entidad.props.empleado.props.segundoApellido.valor();
        }

        if (
            entidad.props.empleado.props.hasOwnProperty(
                "identificadorEmpleado"
            ) &&
            entidad.props.empleado.props.identificadorEmpleado != undefined
        ) {
            propsDTO.uuidEmpleado =
                entidad.props.empleado.props.identificadorEmpleado.valor();
        }

        if (
            entidad.props.empleado.props.hasOwnProperty("direccion") &&
            entidad.props.empleado.props.direccion != undefined
        ) {
            if (
                entidad.props.empleado.props.direccion.props.hasOwnProperty(
                    "calleUno"
                ) &&
                entidad.props.empleado.props.direccion != undefined
            ) {
                propsDTO.calleUnoEmpleado =
                    entidad.props.empleado.props.direccion.props.calleUno.valor();
            }

            if (
                entidad.props.empleado.props.direccion.props.hasOwnProperty(
                    "calleDos"
                ) &&
                entidad.props.empleado.props.direccion.props.calleDos !=
                    undefined
            ) {
                propsDTO.calleDosEmpleado =
                    entidad.props.empleado.props.direccion.props.calleDos.valor();
            }

            if (
                entidad.props.empleado.props.direccion.props.hasOwnProperty(
                    "codigoPostal"
                ) &&
                entidad.props.empleado.props.direccion.props.codigoPostal !=
                    undefined
            ) {
                propsDTO.codigoPostalEmpleado =
                    entidad.props.empleado.props.direccion.props.codigoPostal.valor();
            }
        }

        if (
            entidad.props.empleado.props.hasOwnProperty("pais") &&
            entidad.props.empleado.props.pais != undefined &&
            entidad.props.empleado.props.pais.props.hasOwnProperty("idPais") &&
            entidad.props.empleado.props.pais.props.idPais != undefined
        ) {
            propsDTO.uuidPais =
                entidad.props.empleado.props.pais.props.idPais.valor();
        }

        if (
            entidad.props.empleado.props.hasOwnProperty("estado") &&
            entidad.props.empleado.props.estado != undefined &&
            entidad.props.empleado.props.estado.props.hasOwnProperty(
                "idEstado"
            ) &&
            entidad.props.empleado.props.estado.props.idEstado != undefined
        ) {
            propsDTO.uuidEstado =
                entidad.props.empleado.props.estado.props.idEstado.valor();
        }

        if (
            entidad.props.empleado.props.hasOwnProperty("ciudad") &&
            entidad.props.empleado.props.ciudad != undefined &&
            entidad.props.empleado.props.ciudad.props.hasOwnProperty(
                "idCiudad"
            ) &&
            entidad.props.empleado.props.ciudad.props.idCiudad != undefined
        ) {
            propsDTO.uuidCiudad =
                entidad.props.empleado.props.ciudad.props.idCiudad.valor();
        }

        if (
            entidad.props.empleado.props.hasOwnProperty("telefono") &&
            entidad.props.empleado.props.telefono != undefined
        ) {
            propsDTO.numeroTelefonicoEmpleadoEmpleado =
                entidad.props.empleado.props.telefono.valor();
        }

        if (
            entidad.props.empleado.props.hasOwnProperty("correoElectronico") &&
            entidad.props.empleado.props.correoElectronico != undefined
        ) {
            propsDTO.correoElectronicoEmpleado =
                entidad.props.empleado.props.correoElectronico.valor();
        }

        if (
            entidad.props.ofertaLaboral.props.hasOwnProperty("descripcion") &&
            entidad.props.ofertaLaboral.props.descripcion != undefined
        ) {
            propsDTO.descripcion =
                entidad.props.ofertaLaboral.props.descripcion.valor();
        }

        if (
            entidad.props.ofertaLaboral.props.hasOwnProperty(
                "duracionEstimada"
            ) &&
            entidad.props.ofertaLaboral.props.duracionEstimada != undefined
        ) {
            propsDTO.valorDuracion =
                entidad.props.ofertaLaboral.props.duracionEstimada.valor().duracion;
            propsDTO.escalaDuracion =
                entidad.props.ofertaLaboral.props.duracionEstimada.valor().escala;
        }

        if (
            entidad.props.ofertaLaboral.props.hasOwnProperty("turnoTrabajo") &&
            entidad.props.ofertaLaboral.props.turnoTrabajo != undefined
        ) {
            propsDTO.turnoTrabajo =
                entidad.props.ofertaLaboral.props.turnoTrabajo.valor();
        }

        if (
            entidad.props.hasOwnProperty("fechaCulminacion") &&
            entidad.props.fechaCulminacion != undefined
        ) {
            propsDTO.fechaCulminacionTrabajo =
                entidad.props.fechaCulminacion.valor();
        }

        return Resultado.ok<TrabajoEmpresaDTO>(propsDTO);
    }

    public static aDTOConjunto(
        entidades: Trabajo[]
    ): Resultado<TrabajoEmpresaDTO[]> {
        //Convertimos a dominio array
        let arrayTrabajos: TrabajoEmpresaDTO[] = [];

        for (let trabajo of entidades) {
            let trabajoEntidadOrError = TrabajoEmpresaMapeador.aDTO(trabajo);
            //En caso de fallo
            if (trabajoEntidadOrError.esFallido) {
                return Resultado.falla<any>(trabajoEntidadOrError.error);
            }

            //En caso de ser valido
            arrayTrabajos.push(trabajoEntidadOrError.getValue());
        }

        return Resultado.ok<TrabajoEmpresaDTO[]>(arrayTrabajos);
    }

    private static prepararDominioOfertaLaboral(
        dto: TrabajoEmpresaDTO
    ): Resultado<OfertaLaboralTrabajoDTO> {
        let ofertaProps: OfertaLaboralTrabajoDTO = {
            titulo: dto.titulo,
            cargo: dto.cargo,
        };

        //Opcionales
        if (dto.hasOwnProperty("escalaDuracion")) {
            ofertaProps.duracionEstimadaEscala = dto.escalaDuracion;
        }

        if (dto.hasOwnProperty("valorDuracion")) {
            ofertaProps.duracionEstimadaValor = dto.valorDuracion;
        }

        if (dto.hasOwnProperty("turnoTrabajo")) {
            ofertaProps.turnoTrabajo = dto.turnoTrabajo;
        }

        if (dto.hasOwnProperty("descripcion")) {
            ofertaProps.descripcion = dto.descripcion;
        }

        return Resultado.ok<OfertaLaboralTrabajoDTO>(ofertaProps);
    }

    private static prepararDominioEmpleado(
        dto: TrabajoEmpresaDTO
    ): Resultado<EmpleadoDTO> {
        let empleadoProps: EmpleadoDTO = {
            primerNombre: dto.primerNombreEmpleado,
            primerApellido: dto.primerApellidoEmpleado,
        };

        //Opcionales

        if (dto.hasOwnProperty("uuidEmpleado")) {
            empleadoProps.uuidEmpleado = dto.uuidEmpleado;
        }

        if (dto.hasOwnProperty("segundoNombreEmpleado")) {
            empleadoProps.segundoNombre = dto.segundoNombreEmpleado;
        }

        if (dto.hasOwnProperty("segundoApellidoEmpleado")) {
            empleadoProps.segundoApellido = dto.segundoApellidoEmpleado;
        }

        if (dto.hasOwnProperty("calleUnoEmpleado")) {
            empleadoProps.calleUno = dto.calleUnoEmpleado;
        }

        if (dto.hasOwnProperty("calleDosEmpleado")) {
            empleadoProps.calleDos = dto.calleDosEmpleado;
        }

        if (dto.hasOwnProperty("codigoPostalEmpleado")) {
            empleadoProps.codigoPostal = dto.codigoPostalEmpleado;
        }

        if (dto.hasOwnProperty("uuidPais")) {
            empleadoProps.uuidPais = dto.uuidPais;
        }

        if (dto.hasOwnProperty("uuidEstado")) {
            empleadoProps.uuidEstado = dto.uuidEstado;
        }

        if (dto.hasOwnProperty("uuidCiudad")) {
            empleadoProps.uuidCiudad = dto.uuidCiudad;
        }

        if (dto.hasOwnProperty("correoElectronicoEmpleado")) {
            empleadoProps.correoElectronico = dto.correoElectronicoEmpleado;
        }

        if (dto.hasOwnProperty("numeroTelefonicoEmpleadoEmpleado")) {
            empleadoProps.telefono = dto.numeroTelefonicoEmpleadoEmpleado;
        }

        return Resultado.ok<EmpleadoDTO>(empleadoProps);
    }
}
