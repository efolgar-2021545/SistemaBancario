import { convertirMoneda } from '../divisas/change.divisas.js';

export const convertir = async (req, res) => {
    try {
        const { from, to, amount } = req.query;

        if (!from || !to || !amount) {
            return res.status(400).json({
                error: "Debe enviar el from, to y amount"
            })
        }
        //se valida el monto
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({
                error: "El montoo debe ser un número válido mayor a 0"
            })
        }

        const resultado = await convertirMoneda(
            from.toUpperCase(),
            to.toUpperCase(),
            Number(amount));

        res.json(resultado);

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
