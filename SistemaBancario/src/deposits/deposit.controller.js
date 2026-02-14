/*import Deposit from "./deposit.model.js";

export const createDeposit = async (req, res) => {
    try {
        const data = req.body;

        const deposit = new Deposit(data);
        await deposit.save();

        return res.status(200).send({
            success: true,
            message: "Depósito realizado correctamente",
            deposit
        });

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error al realizar el depósito",
            error: err.message
        });
    }
};

export const getDeposits = async (req, res) => {
    try {
        const deposits = await Deposit.find();

        return res.status(200).send({
            success: true,
            deposits
        });

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error al obtener depósitos",
            error: err.message
        });
    }
};

export const revertDeposit = async (req, res) => {
    try {
        const { id } = req.params;

        const deposit = await Deposit.findById(id);

        if (!deposit) {
            return res.status(404).send({
                success: false,
                message: "Depósito no encontrado"
            });
        }

        // Validar si ya fue revertido
        if (deposit.estado === "REVERTIDO") {
            return res.status(400).send({
                success: false,
                message: "El depósito ya fue revertido"
            });
        }

        // Validar tiempo (1 minuto)
        const ahora = new Date();
        const diferencia = (ahora - deposit.fecha) / 1000; // en segundos

        if (diferencia > 60) {
            return res.status(400).send({
                success: false,
                message: "Solo se puede revertir antes de 1 minuto"
            });
        }

        deposit.estado = "REVERTIDO";
        deposit.modificado = true;

        await deposit.save();

        return res.status(200).send({
            success: true,
            message: "Depósito revertido correctamente",
            deposit
        });

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error al revertir depósito",
            error: err.message
        });
    }
};
*/