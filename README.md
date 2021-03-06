[![Pruebas unitarias, integraci贸n y aceptaci贸n](https://github.com/OrangeSoft-Team/officium-vuejs/actions/workflows/ci.yml/badge.svg)](https://github.com/OrangeSoft-Team/officium-vuejs/actions/workflows/ci.yml)
[![Despliegue a GH Pages](https://github.com/OrangeSoft-Team/officium-vuejs/actions/workflows/deploy.yml/badge.svg)](https://github.com/OrangeSoft-Team/officium-vuejs/actions/workflows/deploy.yml)

<p align="center">
  <img src="https://i.imgur.com/peHiyrK.png" alt="logo" width="400">
</p>
<br>

Officium Vue.Js es una aplicaci贸n web elaborado utilizando los conceptos de "Arquitectura Hexagonal" o "Puertos y Adaptadores".
Officium es un proyecto acad茅mico llevado acabo por OrangeSoft 馃崐

### :page_facing_up: Tabla de Contenidos

---

Este README consiste de las siguientes partes, listadas a continuaci贸n:

-   [Colaboradores de Desarrollo](#man_technologist-colaboradores-de-desarrollo)
-   [Stack de Tecnolog铆as](#computer-stack-de-tecnolog铆as)
-   [Instalaci贸n de la Aplicaci贸n](#wrench-instalaci贸n-de-la-aplicaci贸n)
-   [Construcci贸n de la Aplicaci贸n (build)](#hammer-construcci贸n-de-la-aplicaci贸n-build)
-   [Ejecuci贸n de la Aplicaci贸n](#electric_plug-ejecuci贸n-de-la-aplicaci贸n)
-   [Ejecuci贸n de las Pruebas Automatizadas](#test_tube-ejecuci贸n-de-las-pruebas-automatizadas)
-   [Referencias](#mag_right-referencias)

Adicionalmente, se utilizan las siguientes plantillas para el repositorio:

-   [Commit](https://github.com/OrangeSoft-Team/readme-guide/blob/main/Commit.md)
-   [Pull Request](https://github.com/OrangeSoft-Team/readme-guide/blob/main/Pull_Request.md)
-   [Issue](https://github.com/OrangeSoft-Team/readme-guide/blob/main/Issue.md)

### :man_technologist: Colaboradores de Desarrollo

---

| Nombre y Apellido | Usuario  | Enlace                      |
| ----------------- | -------- | --------------------------- |
| Alan Sosa         | Black995 | https://github.com/Black995 |
| Miguel de Olim    | Madot10  | https://github.com/Madot10  |
| Lucas Ariza       | lpariza  | https://github.com/lpariza  |

### :computer: Stack de Tecnolog铆as

---

| Logo                                                                                                                                                                                | Tipo                      | Nombre               | Enlace de Descarga                       | Versi贸n |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | -------------------- | ---------------------------------------- | ------- |
| <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width="24">                                                                                 | Lenguaje                  | TypeScript           | https://www.typescriptlang.org/download  | 4.3     |
| <img src="https://vuejs.org/images/logo.svg" width="24">                                                                                                                            | Framework                 | Vue.JS               | https://vuejs.org/                       | 2.6.11  |
| <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/1200px-Npm-logo.svg.png" width="24">                                                               | Manejador de dependencias | Node Package Manager | https://www.npmjs.com/get-npm            | 6.14.3  |
| <img src="https://nodejs.org/static/images/logo.svg" width="24">                                                                                                                    | Ambiente de ejecuci贸n     | Node.JS              | https://nodejs.org/en/download/          | 12.13.0 |
| <img src="https://camo.githubusercontent.com/dff60c3322fc0645c42441b218ce565be5d14b528ac4d79247baa547b4977d1f/68747470733a2f2f70726574746965722e696f2f69636f6e2e706e67" width="24"> | Linter                    | Prettier             | https://prettier.io/docs/en/install.html | 7.1.1   |
| <img src="https://avatars.githubusercontent.com/u/32196900?s=400&v=4" width="24">                                                                                                   | Testing                   | Jest                 | https://jestjs.io/docs/getting-started   | 27.0.5  |
| <img src="https://miro.medium.com/max/3164/1*80J2Wa21DYXxMbbtBziJHg.png" width="48">                                                                                                | Cliente HTTP              | Axios                | https://axios-http.com/docs/intro        | 0.21.1  |
| <img src="https://nightwatchjs.org/images/symbol-nightwatch.svg" width="24">                                                                                                        | Testing e2e               | Nightwatch.js        | https://nightwatchjs.org/                | 1.7.6   |
| <img src="https://avatars.githubusercontent.com/u/44036562?s=280&v=4" width="32">                                                                                                   | CI / CD                   | GitHub Actions       | https://github.com/features/actions      | 1.0.0   |

### :wrench: Instalaci贸n de la Aplicaci贸n

---

Para realizar la instalaci贸n de la aplicaci贸n, es necesario realizar los siguientes pasos:

-   Ejecute el siguiente comando para obtener el stack tecnol贸gico de frameworks y librer铆as de las cuales depende la aplicaci贸n:

    `npm install`

### :hammer: Construcci贸n de la Aplicaci贸n (build)

---

Para llevar a cabo la puesta en producci贸n de esta aplicaci贸n, debe realizar los siguientes pasos:

-   Ejecute el siguiente comando en una consola de comandos cualquiera situada en la carpeta de la aplicaci贸n.:

    **Nota:** Este comando se encargara de preparar la aplicaci贸n para production, generando los archivos y coloc谩ndolos en la carpeta `/dist`

    `npm run build`

### :electric_plug: Ejecuci贸n de la Aplicaci贸n

---

Para la ejecuci贸n de la aplicaci贸n debe sencillamente escribir el siguiente comando en una consola de comandos situada en la carpeta de la aplicaci贸n:

-   Aplicaci贸n en modo desarrollo (development):

    `npm run serve`

### :test_tube: Ejecuci贸n de las Pruebas Automatizadas

---

Esta aplicaci贸n consta de tres tipos de pruebas automatizables ejecutables, las cuales se pueden ejecutar de manera individual o en conjunto a trav茅s de los siguientes comandos en una consola de comandos situada en la carpeta del proyecto:

-   Todas las pruebas (unitarias, integraci贸n, aceptaci贸n):

    `npm run test-todos`

-   Pruebas unitarias:

    `npm run test-unitario`

-   Pruebas de integraci贸n:

    `npm run test-integracion`

-   Pruebas de aceptaci贸n:

    `npm run test-aceptacion`

### :mag_right: Referencias

---

-   [Arquitectura de la (Vue)na - C茅sar Alberca](https://www.youtube.com/watch?v=NpjecaAgcVQ)
-   [Ejemplo de arquitectura hexagonal con VueJS](https://github.com/DomingoAlvarez99/shop-hexagonal/tree/master/src)
-   [Alej谩ndonos de ReactJs y VueJs en frontend usando Clean Architecture](http://xurxodev.com/frontend-clean_architecture/)
-   [Arquitectura Hexagonal en el FrontEnd銆?2020銆慮(https://softwarecrafters.io/react/arquitectura-hexagonal-frontend)
-   [Organizing App Logic with the Clean Architecture [with Examples]](https://khalilstemmler.com/articles/software-design-architecture/organizing-app-logic/)
-   [Comparison of Domain-Driven Design and Clean Architecture Concepts](https://khalilstemmler.com/articles/software-design-architecture/domain-driven-design-vs-clean-architecture/)
-   [Building an Enterprise Application with Vue](https://javascript.plainenglish.io/building-vue-enterprise-application-part-0-overture-6d41bea14236)
-   [Building Vue Enterprise Application: Part 1. Entities](https://levelup.gitconnected.com/building-vue-enterprise-application-part-1-entities-808077f3d2e7)
-   [Building Vue Enterprise Application: Part 2. Services](https://javascript.plainenglish.io/building-vue-enterprise-application-part-2-services-f7ec400190e7)
-   [Building Vue Enterprise Application: Part 3. The Store](https://itnext.io/building-vue-enterprise-application-part-3-the-store-dbda0e4bb117)
-   [Building Vue Enterprise Application: Part 4. UI components](https://itnext.io/building-vue-enterprise-application-part-4-ui-components-21a45b3067a4)
-   [Better Software Design with Application Layer Use Cases](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/application-layer-use-cases/)
-   [An Introduction to Domain-Driven Design](https://khalilstemmler.com/articles/domain-driven-design-intro/)
-   [Implementing DTOs, Mappers & the Repository Pattern](https://khalilstemmler.com/articles/typescript-domain-driven-design/repository-dto-mapper/)
-   [Flexible Error Handling w/ the Result Class](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class/)
-   [Functional Error Handling with Express.js and DDD](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/functional-error-handling/)
-   [Command Query Separation | Object-Oriented Design Principles w/ TypeScript](https://khalilstemmler.com/articles/oop-design-principles/command-query-separation/#CQS-in-Domain-Driven-Design-Architecture-with-CQRS)
-   [Partiendo el monolito a trav茅s de Bounded Context](https://adrianalonso.es/arquitectura-del-software/partiendo-monolito-bounded-context/)
-   [Mocking TypeScript classes with Jest](https://medium.com/@davguij/mocking-typescript-classes-with-jest-8ef992170d1d)
-   [Jest - Mock Local Storage](https://www.codeblocq.com/2021/01/Jest-Mock-Local-Storage/)
-   [E2E Testing with Nightwatch](https://www.fullstacklabs.co/blog/e2e-testing-with-nightwatch-js)
