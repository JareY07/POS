import Cuenta from "../models/cuenta.model.js";

export const crearCuenta = async (req, res) => {
  try {
    const { numeroCuenta, tipoCuenta, saldoInicial, clienteId } = req.body;

    const cuentaId = await Cuenta.create(
      numeroCuenta,
      tipoCuenta,
      saldoInicial,
      clienteId
    );

    res.status(201).json({
      success: true,
      cuentaId,
      message: "Cuenta creada exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al crear cuenta",
      details: process.env.NODE_ENV !== "production" ? error.message : null,
    });
  }
};

export const obtenerCuentasCliente = async (req, res) => {
  try {
    const cuentas = await Cuenta.findByCliente(req.params.clienteId);
    res.json({ success: true, data: cuentas });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al obtener cuentas",
    });
  }
};

export const obtenerCuenta = async (req, res) => {
  try {
    const cuenta = await Cuenta.findById(req.params.id);

    if (!cuenta) {
      return res.status(404).json({
        success: false,
        error: "Cuenta no encontrada",
      });
    }

    res.json({ success: true, data: cuenta });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al obtener cuenta",
    });
  }
};
