import { validationResult } from "express-validator";

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Respuesta más detallada
    res.status(400).json({
      success: false,
      message: "Errores de validación",
      errors: errors.array().map((err) => ({
        param: err.param,
        msg: err.msg,
        location: err.location,
      })),
      receivedData: req.body, // Opcional: muestra los datos recibidos
    });
  };
};
