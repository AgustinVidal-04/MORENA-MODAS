const express = require("express");
const cors = require("cors");

const { prueba } = require("./controllers/pruebacontroller");

const productoRoutes = require("./routes/productoroutes");
const reservaRoutes = require("./routes/reservaroutes");

require("./config/database");

const app = express();
const PORT = 3000;

// Permite recibir datos en formato JSON
app.use(express.json());

// Permite las peticiones desde el front-end
app.use(cors());

// Permite recibir datos enviados mediante formularios
app.use(express.urlencoded({ extended: true }));

// Permite acceder a los archivos del front-end
app.use(express.static("public"));

app.get("/api/prueba", prueba);

app.use("/api", productoRoutes);

app.use("/api", reservaRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});