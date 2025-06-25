import express from "express";
import { cuentaValidations } from "../validations/cuenta.validations.js";
import { validate } from "../middlewares/validate.js";
import {
  crearCuenta,
  obtenerCuentasCliente,
  obtenerCuenta,
} from "../controllers/cuenta.controller.js";

const router = express.Router();

router.post("/", validate(cuentaValidations.create), crearCuenta);

router.get("/cliente/:clienteId", obtenerCuentasCliente);

router.get("/:id", validate(cuentaValidations.idParam), obtenerCuenta);

export default router;
