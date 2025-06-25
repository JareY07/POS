import express from "express";
import { body, param } from "express-validator";
import { validate } from "../middlewares/validate.js";
import {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../controllers/cliente.controller.js";

const router = express.Router();

const nombreValidation = body("nombre")
  .trim()
  .notEmpty()
  .withMessage("El nombre es requerido")
  .isLength({ max: 150 })
  .withMessage("Máximo 150 caracteres");

const telefonoValidation = body("telefono")
  .trim()
  .notEmpty()
  .withMessage("El teléfono es requerido")
  .isLength({ min: 8, max: 15 })
  .withMessage("Entre 8 y 15 caracteres")
  .matches(/^[0-9+()-]+$/)
  .withMessage("Teléfono no válido");

const idValidation = param("id")
  .isInt({ min: 1 })
  .withMessage("ID debe ser un número entero positivo");

router.get("/", getClientes);
router.get("/:id", validate([idValidation]), getClienteById);
router.post(
  "/",
  validate([
    nombreValidation,
    body("direccion").optional().isString().isLength({ max: 255 }),
    telefonoValidation,
    body("email").optional().isEmail().isLength({ max: 150 }),
  ]),
  createCliente
);
router.put(
  "/:id",
  validate([
    idValidation,
    nombreValidation,
    body("direccion").optional().isString().isLength({ max: 255 }),
    telefonoValidation,
    body("email").optional().isEmail().isLength({ max: 150 }),
  ]),
  updateCliente
);
router.delete("/:id", validate([idValidation]), deleteCliente);

export default router;
