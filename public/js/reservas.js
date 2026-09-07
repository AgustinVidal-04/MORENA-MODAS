const reservaForm = document.getElementById("reservaForm");

const parametros = new URLSearchParams(window.location.search);
const productoSeleccionado = parametros.get("producto");

const nombreProducto = document.getElementById("nombreProducto");


// ==============================
// MOSTRAR PRODUCTO SELECCIONADO
// ==============================

if (nombreProducto && productoSeleccionado) {

    const productos = {
        remera: "Remera básica",
        campera: "Campera urbana",
        pantalon: "Pantalón wide leg"
    };

    if (productos[productoSeleccionado]) {
        nombreProducto.textContent = productos[productoSeleccionado];
    }
}


// ==============================
// VALIDACIÓN DE FECHA
// ==============================

const campoFecha = document.getElementById("fecha");

if (campoFecha) {

    const hoy = new Date();

    const fechaHoy =
        hoy.getFullYear() + "-" +
        String(hoy.getMonth() + 1).padStart(2, "0") + "-" +
        String(hoy.getDate()).padStart(2, "0");

    campoFecha.min = fechaHoy;
}


// ==============================
// VALIDACIÓN DE HORARIOS
// ==============================

const campoHorario = document.getElementById("horario");

function actualizarHorarios() {

    if (!campoFecha || !campoHorario) {
        return;
    }

    const fechaSeleccionada = campoFecha.value;

    if (!fechaSeleccionada) {
        return;
    }

    const hoy = new Date();

    const fechaHoy =
        hoy.getFullYear() + "-" +
        String(hoy.getMonth() + 1).padStart(2, "0") + "-" +
        String(hoy.getDate()).padStart(2, "0");


    const opcionesHorario = Array.from(campoHorario.options);


    // Primero habilitamos todos los horarios

    opcionesHorario.forEach(function(opcion) {

        if (!opcion.value) {
            return;
        }

        opcion.disabled = false;
    });


    // Si la fecha es hoy,
    // deshabilitamos los horarios que ya pasaron

    if (fechaSeleccionada === fechaHoy) {

        const horaActual =
            hoy.getHours() * 60 + hoy.getMinutes();


        opcionesHorario.forEach(function(opcion) {

            if (!opcion.value) {
                return;
            }

            const partes = opcion.value.split(":");

            const hora = Number(partes[0]);
            const minutos = Number(partes[1]);

            const minutosHorario =
                hora * 60 + minutos;


            if (minutosHorario <= horaActual) {
                opcion.disabled = true;
            }

        });
    }
}


if (campoFecha) {
    campoFecha.addEventListener("change", actualizarHorarios);
}


// ==============================
// VALIDACIÓN Y CREACIÓN
// DE LA RESERVA
// ==============================

if (reservaForm) {

    reservaForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const talle =
            document.getElementById("talle").value;

        const color =
            document.getElementById("color").value;

        const fecha =
            document.getElementById("fecha").value;

        const horario =
            document.getElementById("horario").value;


        // Validar campos obligatorios

        if (!talle || !color || !fecha || !horario) {

            alert("Completá todos los datos de la reserva.");

            return;
        }


        // ==============================
        // CALCULAR DURACIÓN DE 24 HORAS
        // ==============================

        const fechaHoraInicio =
            `${fecha}T${horario}`;

        const inicio =
            new Date(fechaHoraInicio);


        const vencimiento =
            new Date(
                inicio.getTime() +
                24 * 60 * 60 * 1000
            );


        // ==============================
        // GUARDAR RESERVA
        // ==============================

        const reserva = {

            producto: nombreProducto.textContent,

            talle: talle,

            color: color,

            fecha: fecha,

            horario: horario,

            inicio: fechaHoraInicio,

            vencimiento: vencimiento.toISOString(),

            estado: "Pendiente"
        };


        localStorage.setItem(
            "reservaActual",
            JSON.stringify(reserva)
        );


        alert("Reserva validada correctamente.");


        window.location.href =
            "confirmacion.html";

    });
}