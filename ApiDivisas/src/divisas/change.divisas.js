import axios from "axios";
import "dotenv/config";

const API_KEY = process.env.EXCHANGE_API_KEY;
const BASE_URL = "https://v6.exchangerate-api.com/v6";

export async function convertirMoneda(from, to, amount) {
    try {
        //url para el cambio de moneda
        const url = `${BASE_URL}/${API_KEY}/pair/${from}/${to}/${amount}`;

        const response = await axios.get(url);

        if (response.data.result !== "success") {
        throw new Error("Error en la API de divisas");
        }

        return {
        montoOriginal: amount,
        monedaOrigen: from,
        monedaDestino: to,
        tasa: response.data.conversion_rate,
        montoConvertido: response.data.conversion_result
        };

    } catch (error) {
        console.error("Error al convertir moneda:", error.message);
        throw new Error("No se pudo realizar la conversión de esa moneda");
    }
    
};

