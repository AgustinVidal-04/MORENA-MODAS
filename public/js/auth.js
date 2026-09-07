const registroForm = document.getElementById("registroForm");
const loginForm = document.getElementById("loginForm");


// ==============================
// VALIDACIÓN DEL REGISTRO
// ==============================

if (registroForm) {

    registroForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const nombre =
            document.getElementById("nombre").value.trim();

        const apellido =
            document.getElementById("apellido").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const telefono =
            document.getElementById("telefono").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (
            nombre === "" ||
            apellido === "" ||
            email === "" ||
            telefono === "" ||
            password === "" ||
            confirmPassword === ""
        ) {

            alert("Completá todos los campos.");

            return;
        }


        if (password !== confirmPassword) {

            alert("Las contraseñas no coinciden.");

            return;
        }


        alert("Registro realizado correctamente. Ahora iniciá sesión.");


        // Enviar al usuario al login

        window.location.href = "login.html";

    });
}


// ==============================
// VALIDACIÓN DEL LOGIN
// ==============================

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        // ==============================
        // VALIDAR CAMPOS OBLIGATORIOS
        // ==============================

        if (email === "" || password === "") {

            alert("Completá todos los campos.");

            return;
        }


        // ==============================
        // VALIDAR LONGITUD DE CONTRASEÑA
        // ==============================

        if (password.length < 6) {

            alert("La contraseña debe tener al menos 6 caracteres.");

            return;
        }


        // ==============================
        // INICIAR SESIÓN
        // ==============================

        localStorage.setItem(
            "usuarioLogueado",
            "true"
        );


        alert("Inicio de sesión correcto.");


        window.location.href = "index.html";

    });
}