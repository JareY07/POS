import { body, param } from "express-validator";

export const clienteValidations = {
  // Validaciones para crear/actualizar
  createOrUpdate: [
    body("nombre")
      .trim()
      .notEmpty()
      .withMessage("El nombre es requerido")
      .isLength({ max: 150 })
      .withMessage("Máximo 150 caracteres"),

    body("direccion")
      .optional()
      .isString()
      .isLength({ max: 255 })
      .withMessage("Máximo 255 caracteres"),

    body("telefono")
      .trim()
      .notEmpty()
      .withMessage("El teléfono es requerido")
      .isLength({ min: 8, max: 15 })
      .withMessage("Entre 8 y 15 caracteres")
      .matches(/^[0-9+()-]+$/)
      .withMessage("Teléfono no válido"),

    body("email")
      .optional()
      .trim()
      .isEmail()
      .withMessage("Correo electrónico no válido")
      .isLength({ max: 150 })
      .withMessage("Máximo 150 caracteres"),
  ],

  // Validación para ID en parámetros
  idParam: [
    param("id")
      .isInt({ min: 1 })
      .withMessage("ID debe ser un número entero positivo"),
  ],
};
