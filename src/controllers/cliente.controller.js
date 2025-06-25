import Cliente from "../models/cliente.model.js";

export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.getAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

export const getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.getById(req.params.id);
    if (!cliente)
      return res.status(404).json({ message: "Cliente no encontrado" });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el cliente" });
  }
};

export const createCliente = async (req, res) => {
  try {
    const { nombre, direccion, telefono, email } = req.body;
    const id = await Cliente.create(nombre, direccion, telefono, email);
    res.status(201).json({ id, nombre, direccion, telefono, email });
  } catch (error) {
    res.status(500).json({ error: "Error al crear cliente" });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, telefono, email } = req.body;
    await Cliente.update(id, nombre, direccion, telefono, email);
    res.json({ message: "Cliente actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar cliente" });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    await Cliente.delete(req.params.id);
    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
};
