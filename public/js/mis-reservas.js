// ==============================
// CONTROL DE ACCESO
// ==============================

const usuarioLogueado =
    localStorage.getItem("usuarioLogueado");

if (usuarioLogueado !== "true") {

    window.location.href = "login.html";

} else {

    // ==============================
    // OBTENER RESERVA
    // ==============================

    const reservaGuardada =
        localStorage.getItem("reservaActual");

    if (reservaGuardada) {

        const reserva =
            JSON.parse(reservaGuardada);

        const reservasContainer =
            document.querySelector(".reservas-container");


        // ==============================
        // COMPROBAR SI LA RESERVA VENCIO
        // ==============================

        if (reserva.vencimiento) {

            const ahora = new Date();

            const vencimiento =
                new Date(reserva.vencimiento);

            if (ahora >= vencimiento) {

                reserva.estado = "Vencida";

                localStorage.setItem(
                    "reservaActual",
                    JSON.stringify(reserva)
                );
            }
        }


        // ==============================
        // FORMATEAR FECHA DE INICIO
        // ==============================

        const fechaInicio =
            reserva.fecha
                .split("-")
                .reverse()
                .join("/");


        // ==============================
        // FORMATEAR FECHA DE VENCIMIENTO
        // ==============================

        let fechaVencimiento = "";
        let horaVencimiento = "";


        if (reserva.vencimiento) {

            const vencimiento =
                new Date(reserva.vencimiento);


            fechaVencimiento =
                String(
                    vencimiento.getDate()
                ).padStart(2, "0") +
                "/" +
                String(
                    vencimiento.getMonth() + 1
                ).padStart(2, "0") +
                "/" +
                vencimiento.getFullYear();


            horaVencimiento =
                String(
                    vencimiento.getHours()
                ).padStart(2, "0") +
                ":" +
                String(
                    vencimiento.getMinutes()
                ).padStart(2, "0");
        }


        // ==============================
        // CREAR TARJETA DE RESERVA
        // ==============================

        const reservaCard =
            document.createElement("div");

        reservaCard.classList.add(
            "reserva-card"
        );


        reservaCard.innerHTML = `

            <div class="reserva-info">

                <h3>${reserva.producto}</h3>

                <p>
                    <strong>Talle:</strong>
                    ${reserva.talle}
                </p>

                <p>
                    <strong>Color:</strong>
                    ${reserva.color}
                </p>

                <p>
                    <strong>Fecha de inicio:</strong>
                    ${fechaInicio}
                </p>

                <p>
                    <strong>Horario de inicio:</strong>
                    ${reserva.horario} hs
                </p>

                <p>
                    <strong>Válida hasta:</strong>
                    ${fechaVencimiento}
                    ${horaVencimiento} hs
                </p>

                <p>
                    <strong>Duración:</strong>
                    24 horas
                </p>

                <p>
                    <strong>Estado:</strong>

                    <span class="estado-reserva">
                        ${reserva.estado}
                    </span>

                </p>

            </div>

            <div class="reserva-acciones">

                <button
                    class="boton boton-secundario boton-cancelar"
                    data-id="nueva"
                >
                    Cancelar reserva
                </button>

            </div>
        `;


        reservasContainer.appendChild(
            reservaCard
        );
    }


    // ==============================
    // CANCELAR RESERVA
    // ==============================

    const botonesCancelar =
        document.querySelectorAll(
            ".boton-cancelar"
        );


    botonesCancelar.forEach(function(boton) {

        boton.addEventListener(
            "click",
            function() {

                const confirmar =
                    confirm(
                        "¿Estás seguro de que querés cancelar esta reserva?"
                    );


                if (!confirmar) {
                    return;
                }


                const reservaCard =
                    boton.closest(
                        ".reserva-card"
                    );


                const estado =
                    reservaCard.querySelector(
                        ".estado-reserva"
                    );


                estado.textContent =
                    "Cancelada";


                boton.textContent =
                    "Reserva cancelada";


                boton.disabled = true;

            }
        );

    });

}