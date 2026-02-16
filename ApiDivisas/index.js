import app from "./configs/app.js";

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
    console.log(`ApiDivisas corriendo en puerto ${PORT}`);
});
