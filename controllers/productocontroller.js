const connection = require("../config/database");

const obtenerProductos = (req, res) => {
    const sql = `
        SELECT 
            p.id_producto,
            p.nombre,
            p.descripcion,
            p.precio,
            c.nombre AS categoria
        FROM producto p
        INNER JOIN categoria c 
            ON p.id_categoria = c.id_categoria
    `;

    connection.query(sql, (error, resultados) => {
        if (error) {
            console.error("Error al obtener los productos:", error);

            return res.status(500).json({
                error: "Error al obtener los productos"
            });
        }

        res.json(resultados);
    });
};

module.exports = {
    obtenerProductos
};