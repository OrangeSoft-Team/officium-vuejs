// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide
const CREDENCIALES_PRUEBA = {
    correoElectronico: "test@test.com",
    contrasena: "123456QAZwsx",
};

const OFERTA_LABORAL = {
    idOfertaLaboral: "3",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    estado: "publicado",
    titulo: "Encargado de tienda",
    fechaPublicacion: "31/05/2021",
    cargo: "Encargado general de tienda IBM",
    sueldo: 65898,
    duracionEstimadaValor: 6,
    duracionEstimadaEscala: "mes",
    turnoTrabajo: "diurno",
    numeroVacantes: 4,
    habilidad: "Trabajar bajo presión",
};

module.exports = {
    "[Aceptación] Iniciar sesión con credenciales básicas": (browser) => {
        //Inicio de sesión
        browser
            .init()
            /*  .waitForElementVisible("#app")
            .waitForElementVisible("#btn-login")
            .setValue("#text-correo", CREDENCIALES_PRUEBA.correoElectronico)
            .setValue("#text-contrasena", CREDENCIALES_PRUEBA.contrasena)
            .click("#btn-login");
        //Dashboard
        browser
            .pause(5000)
            .waitForElementVisible("a[href*='ofertas-laborales']")*/
            .end();
    },
    "[Aceptación] Crear oferta laboral": (browser) => {
        //Inicio de sesión
        browser
            .init()
            /* .waitForElementVisible("#app")
            .waitForElementVisible("#btn-login")
            .setValue("#text-correo", CREDENCIALES_PRUEBA.correoElectronico)
            .setValue("#text-contrasena", CREDENCIALES_PRUEBA.contrasena)
            .click("#btn-login");
        //Dashboard
        browser
            .pause(3000)
            .waitForElementVisible("#app")
            .click("a[href*='ofertas-laborales']");

        //Ofertas laborales
        browser
            .pause(1000)
            .waitForElementVisible("#btn-crear")
            .click("#btn-crear");

        //Modal crear
        browser
            .pause(1000)
            .waitForElementPresent("#modal-crear")
            .setValue("#inpt-titulo", OFERTA_LABORAL.titulo)
            .setValue("#inpt-cargo", OFERTA_LABORAL.cargo)
            .setValue("#inpt-turno", OFERTA_LABORAL.turnoTrabajo)
            .setValue("#inpt-vacantes", OFERTA_LABORAL.numeroVacantes)
            .setValue("#inpt-sueldo", OFERTA_LABORAL.sueldo)
            .setValue("#inpt-duracion", OFERTA_LABORAL.duracionEstimadaValor)
            .setValue("#inpt-escala", OFERTA_LABORAL.duracionEstimadaEscala)
            .setValue("#inpt-descripcion", OFERTA_LABORAL.descripcion)
            .setValue("#inpt-habilidad", OFERTA_LABORAL.habilidad)
            .click("#btn-add-habilidad")
            .click("#btn-submit-crear");

        //Mensaje de exito
        browser.pause(2000).waitForElementVisible("#alerta-exito")*/
            .end();
    },
};
