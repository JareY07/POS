import Producto from "../models/producto.model.js";

export const crearProducto = async (req, res) => {
  try {
    const { nombreProducto, precioUnitario, existencia, codigoBarras } =
      req.body;

    const nuevoProducto = await Producto.create(
      nombreProducto,
      precioUnitario,
      existencia,
      codigoBarras
    );

    res.status(201).json({
      success: true,
      producto: nuevoProducto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al crear producto",
      details: process.env.NODE_ENV !== "production" ? error.message : null,
    });
  }
};

export const listarProductos = async (req, res) => {
  try {
    const productos = await Producto.getAll();
    res.json({ success: true, data: productos });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al obtener productos",
    });
  }
};
