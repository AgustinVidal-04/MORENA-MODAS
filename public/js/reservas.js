const parametros = new URLSearchParams(window.location.search);
const producto = parametros.get("producto");
const nombreProducto = document.getElementById("nombreProducto");
const precioProducto = document.getElementById("precioProducto");
const disponibilidadProducto = document.getElementById("disponibilidadProducto");
if (producto === "oversize") {
nombreProducto.textContent = "Remera Oversize";

precioProducto.textContent = "$18.000";

disponibilidadProducto.textContent = "Disponible";

}
if (producto === "remera") {
nombreProducto.textContent = "Remera Básica";

precioProducto.textContent = "$15.000";

disponibilidadProducto.textContent = "Disponible";

}
if (producto === "campera") {
nombreProducto.textContent = "Campera";

precioProducto.textContent = "$30.000";

disponibilidadProducto.textContent = "Disponible";

}
const campoColor = document.getElementById("color");
campoColor.innerHTML = "";
const opcionInicial = document.createElement("option");
opcionInicial.value = "";
opcionInicial.textContent = "Seleccioná un color";
campoColor.appendChild(opcionInicial);
if (producto === "campera") {
campoColor.innerHTML += '<option value="Negro">Negro</option><option value="Azul">Azul</option><option value="Rojo">Rojo</option>';

} else {
campoColor.innerHTML += '<option value="Negro">Negro</option><option value="Blanco">Blanco</option><option value="Rojo">Rojo</option>';

}
const campoFecha = document.getElementById("fecha");
if (campoFecha) {
const hoy = new Date();

const año = hoy.getFullYear();

const mes = String(hoy.getMonth() + 1).padStart(2, "0");

const dia = String(hoy.getDate()).padStart(2, "0");

campoFecha.min = año + "-" + mes + "-" + dia;

}
if (campoFecha) {
campoFecha.addEventListener("change", function() {

    const campoHorario = document.getElementById("horario");

    if (!campoHorario) {

        return;

    }

    const opciones = campoHorario.options;

    for (let i = 0; i < opciones.length; i++) {

        opciones[i].disabled = false;

    }

    const hoy = new Date();

    const fechaActual =
        hoy.getFullYear() +
        "-" +
        String(hoy.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(hoy.getDate()).padStart(2, "0");

    if (campoFecha.value === fechaActual) {

        const horaActual =
            hoy.getHours() * 60 +
            hoy.getMinutes();

        for (let i = 0; i < opciones.length; i++) {

            if (!opciones[i].value) {

                continue;

            }

            const partes = opciones[i].value.split(":");

            const hora = Number(partes[0]);

            const minutos = Number(partes[1]);

            const minutosHorario =
                hora * 60 +
                minutos;

            if (minutosHorario <= horaActual) {

                opciones[i].disabled = true;

            }

        }

    }

});

}
const reservaForm = document.getElementById("reservaForm");
if (reservaForm) {
reservaForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const talle =
        document.getElementById("talle").value;

    const color =
        document.getElementById("color").value;

    const fecha =
        document.getElementById("fecha").value;

    const horario =
        document.getElementById("horario").value;

    if (!talle || !color || !fecha || !horario) {

        alert("Completá todos los datos de la reserva.");

        return;

    }

    const fechaHora =
        fecha + "T" + horario;

    const inicio =
        new Date(fechaHora);

    const vencimiento =
        new Date(
            inicio.getTime() +
            24 * 60 * 60 * 1000
        );

    const reserva = {

        producto: nombreProducto.textContent,

        talle: talle,

        color: color,

        fecha: fecha,

        horario: horario,

        inicio: fechaHora,

        vencimiento: vencimiento.toISOString(),

        estado: "Pendiente"

    };

    localStorage.setItem(
        "reservaActual",
        JSON.stringify(reserva)
    );

    try {

        const respuesta = await fetch(
            "http://localhost:3000/api/reservas",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    id_cliente: 1,

                    id_usuario: 1,

                    fecha_reserva: fecha,

                    fecha_prueba: fecha,

                    estado: "Pendiente"

                })

            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            console.error(
                "Error del servidor:",
                datos
            );

            alert(
                "No se pudo guardar la reserva en la base de datos."
            );

            return;

        }

        console.log(
            "Reserva guardada en MariaDB:",
            datos
        );

        alert(
            "Reserva realizada correctamente."
        );

        window.location.href = "confirmacion.html";

    } catch (error) {

        console.error(
            "Error al conectar con el back-end:",
            error
        );

        alert(
            "No se pudo conectar con el servidor."
        );

    }

});

}