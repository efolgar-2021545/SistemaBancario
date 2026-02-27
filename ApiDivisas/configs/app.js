import express from "express";
import "dotenv/config";
import divisasRoutes from "../src/divisas/divisas.routes.js";

const app = express();

app.use(express.json());

app.use("/api/divisas", divisasRoutes);

export default app;
