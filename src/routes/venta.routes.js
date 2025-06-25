import express from "express";
import { ventaValidations } from "../validations/venta.validations.js";
import { validate } from "../middlewares/validate.js";
import { auth } from "../middlewares/auth.js";
import { crearVenta, listarVentas } from "../controllers/venta.controller.js";

const router = express.Router();

router.post("/", auth, crearVenta);

router.post("/", validate(ventaValidations), crearVenta);
router.get("/", listarVentas);

export default router;
