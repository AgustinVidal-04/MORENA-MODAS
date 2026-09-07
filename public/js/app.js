// ==============================
// CONTROL DE ACCESO A RESERVA
// ==============================

const botonReserva = document.querySelector(".boton-reserva");

if (botonReserva) {

    botonReserva.addEventListener("click", function(event) {

        event.preventDefault();

        const usuarioLogueado =
            localStorage.getItem("usuarioLogueado");

        if (usuarioLogueado === "true") {

            window.location.href =
                botonReserva.getAttribute("href");

        } else {

            window.location.href = "login.html";
        }

    });
}


// ==============================
// CONTROL DE ACCESO A MIS RESERVAS
// ==============================

const enlaceMisReservas =
    document.querySelector(".enlace-mis-reservas");

if (enlaceMisReservas) {

    enlaceMisReservas.addEventListener("click", function(event) {

        event.preventDefault();

        const usuarioLogueado =
            localStorage.getItem("usuarioLogueado");

        if (usuarioLogueado === "true") {

            window.location.href =
                "mis-reservas.html";

        } else {

            window.location.href =
                "login.html";
        }

    });
}


// ==============================
// MENÚ SEGÚN ESTADO DE SESIÓN
// ==============================

const usuarioLogueado =
    localStorage.getItem("usuarioLogueado");

const navegacion =
    document.querySelector("nav");


if (navegacion && usuarioLogueado === "true") {

    // Eliminar Iniciar sesión y Registrarse

    const enlacesLogin =
        navegacion.querySelectorAll(
            'a[href="login.html"], a[href="registro.html"]'
        );

    enlacesLogin.forEach(function(enlace) {
        enlace.remove();
    });


    // Agregar Mis reservas si todavía no existe

    if (!navegacion.querySelector(".enlace-mis-reservas")) {

        const enlaceReservas =
            document.createElement("a");

        enlaceReservas.href =
            "mis-reservas.html";

        enlaceReservas.textContent =
            "Mis reservas";

        enlaceReservas.classList.add(
            "enlace-mis-reservas"
        );

        navegacion.appendChild(
            enlaceReservas
        );


        // Controlar acceso a Mis reservas

        enlaceReservas.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                window.location.href =
                    "mis-reservas.html";
            }
        );
    }


    // Agregar Cerrar sesión

    if (!navegacion.querySelector(".enlace-cerrar-sesion")) {

        const botonCerrarSesion =
            document.createElement("a");

        botonCerrarSesion.href = "#";

        botonCerrarSesion.textContent =
            "Cerrar sesión";

        botonCerrarSesion.classList.add(
            "enlace-cerrar-sesion"
        );

        navegacion.appendChild(
            botonCerrarSesion
        );


        // Cerrar sesión

        botonCerrarSesion.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                localStorage.removeItem(
                    "usuarioLogueado"
                );

                window.location.href =
                    "index.html";
            }
        );
    }
}