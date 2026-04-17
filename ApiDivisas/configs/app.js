import express from "express";
import "dotenv/config";
import divisasRoutes from "../src/divisas/divisas.routes.js";
import { swaggerDocs } from "../src/swagger/swagger.js";

const app = express();

app.use(express.json());

// Swagger
swaggerDocs(app);

// rutas
app.use("/api/v1/divisas", divisasRoutes);

export default app;