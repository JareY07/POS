import express from "express";
import { body } from "express-validator";
import {
  crearProducto,
  listarProductos,
} from "../controllers/producto.controller.js";
import { validate } from "../middlewares/validate.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// Validaciones
const productoValidations = [
  body("nombreProducto").notEmpty().withMessage("El nombre es requerido"),
  body("precioUnitario").isFloat({ min: 0.01 }).withMessage("Precio inválido"),
  body("existencia").isInt({ min: 0 }).withMessage("Existencia inválida"),
  body("codigoBarras").optional().isString(),
];

router.post("/", auth, validate(productoValidations), crearProducto);

router.get("/", listarProductos);

export default router;
