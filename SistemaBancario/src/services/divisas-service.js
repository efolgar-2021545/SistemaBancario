import axios from "axios";

export const convertirMoneda = async (from, to, amount) => {
    const response = await axios.get(
        "http://localhost:3007/api/divisas/convertir",
        {
            params: { from, to, amount }
        }
    );

    return response.data;
};