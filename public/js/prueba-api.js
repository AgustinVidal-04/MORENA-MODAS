fetch("http://localhost:3000/api/prueba")
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta del back-end:", data);
    })
    .catch(error => {
        console.error("Error al conectar con el back-end:", error);
    });