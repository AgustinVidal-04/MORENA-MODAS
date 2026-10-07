const connection = require("../config/database");

const crearReserva = (req, res) => {
    const {
        id_cliente,
        id_usuario,
        fecha_reserva,
        fecha_prueba,
        estado
    } = req.body;

    // Validar datos obligatorios
    if (!id_cliente || !id_usuario || !fecha_reserva || !fecha_prueba || !estado) {
        return res.status(400).json({
            error: "Faltan datos obligatorios para crear la reserva"
        });
    }

    // Verificar que el cliente exista
    const sqlCliente = `
        SELECT id_cliente
        FROM cliente
        WHERE id_cliente = ?
    `;

    connection.query(sqlCliente, [id_cliente], (error, resultados) => {
        if (error) {
            console.error("Error al verificar el cliente:", error);
            return res.status(500).json({
                error: "Error al verificar el cliente"
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                error: "El cliente indicado no existe"
            });
        }

        // Crear la reserva
        const sql = `
            INSERT INTO reserva
            (id_cliente, id_usuario, fecha_reserva, fecha_prueba, estado)
            VALUES (?, ?, ?, ?, ?)
        `;

        connection.query(
            sql,
            [id_cliente, id_usuario, fecha_reserva, fecha_prueba, estado],
            (error, resultado) => {
                if (error) {
                    console.error("Error al crear la reserva:", error);
                    return res.status(500).json({
                        error: "Error al crear la reserva"
                    });
                }

                res.status(201).json({
                    mensaje: "Reserva creada correctamente",
                    id_reserva: resultado.insertId
                });
            }
        );
    });
};


const obtenerReservas = (req, res) => {
    const sql = `
        SELECT 
            r.id_reserva,
            r.fecha_reserva,
            r.fecha_prueba,
            r.estado,
            c.nombre AS nombre_cliente,
            c.apellido AS apellido_cliente,
            u.nombre AS nombre_usuario,
            u.apellido AS apellido_usuario
        FROM reserva r
        INNER JOIN cliente c
            ON r.id_cliente = c.id_cliente
        INNER JOIN usuario u
            ON r.id_usuario = u.id_usuario
    `;

    connection.query(sql, (error, resultados) => {
        if (error) {
            console.error("Error al obtener las reservas:", error);
            return res.status(500).json({
                error: "Error al obtener las reservas"
            });
        }

        res.json(resultados);
    });
};


const obtenerReservaPorId = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT 
            r.id_reserva,
            r.fecha_reserva,
            r.fecha_prueba,
            r.estado,
            c.nombre AS nombre_cliente,
            c.apellido AS apellido_cliente,
            u.nombre AS nombre_usuario,
            u.apellido AS apellido_usuario
        FROM reserva r
        INNER JOIN cliente c
            ON r.id_cliente = c.id_cliente
        INNER JOIN usuario u
            ON r.id_usuario = u.id_usuario
        WHERE r.id_reserva = ?
    `;

    connection.query(sql, [id], (error, resultados) => {
        if (error) {
            console.error("Error al obtener la reserva:", error);
            return res.status(500).json({
                error: "Error al obtener la reserva"
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                error: "Reserva no encontrada"
            });
        }

        res.json(resultados[0]);
    });
};


const actualizarReserva = (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    const sql = `
        UPDATE reserva
        SET estado = ?
        WHERE id_reserva = ?
    `;

    connection.query(sql, [estado, id], (error, resultado) => {
        if (error) {
            console.error("Error al actualizar la reserva:", error);
            return res.status(500).json({
                error: "Error al actualizar la reserva"
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                error: "Reserva no encontrada"
            });
        }

        res.json({
            mensaje: "Reserva actualizada correctamente"
        });
    });
};


const eliminarReserva = (req, res) => {
    const { id } = req.params;

    const sql = `
        DELETE FROM reserva
        WHERE id_reserva = ?
    `;

    connection.query(sql, [id], (error, resultado) => {
        if (error) {
            console.error("Error al eliminar la reserva:", error);
            return res.status(500).json({
                error: "Error al eliminar la reserva"
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                error: "Reserva no encontrada"
            });
        }

        res.json({
            mensaje: "Reserva eliminada correctamente"
        });
    });
};


module.exports = {
    crearReserva,
    obtenerReservas,
    obtenerReservaPorId,
    actualizarReserva,
    eliminarReserva
};