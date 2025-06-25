import { body, param } from "express-validator";

export const cuentaValidations = {
  create: [
    body("numeroCuenta")
      .notEmpty()
      .withMessage("El número de cuenta es requerido")
      .matches(/^[A-Z0-9]{10}$/)
      .withMessage("Formato inválido (ej: CTE-123456)"),

    body("tipoCuenta")
      .isIn(["AHORRO", "CORRIENTE"])
      .withMessage("Tipo debe ser AHORRO o CORRIENTE"),

    body("saldoInicial")
      .isFloat({ min: 0 })
      .withMessage("Saldo debe ser positivo"),

    body("clienteId").isInt({ min: 1 }).withMessage("Cliente inválido"),
  ],

  idParam: [param("id").isInt({ min: 1 }).withMessage("ID de cuenta inválido")],
};
