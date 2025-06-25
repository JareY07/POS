import { body } from "express-validator";

export const ventaValidations = [
  body("clienteId").optional().isInt().withMessage("ID de cliente inválido"),
  body("productos")
    .isArray({ min: 1 })
    .withMessage("Debe incluir al menos un producto")
    .custom((productos) => {
      return productos.every(
        (p) => p.productoId && p.cantidad && p.precioUnitario
      );
    })
    .withMessage("Cada producto debe tener ID, cantidad y precio"),
];
