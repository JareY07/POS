import pool from "../utils/db.js";

class Producto {
  // Obtener todos (READ)
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM producto WHERE activo = 1");
    return rows;
  }

  // Obtener por ID (READ)
  static async getById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM producto WHERE id = ? AND activo = 1",
      [id]
    );
    return rows[0] || null;
  }

  // Crear (CREATE)
  static async create(nombre, precio, existencia) {
    const [result] = await pool.query(
      "INSERT INTO producto (nombreProducto, precioUnitario, existencia) VALUES (?, ?, ?)",
      [nombre, precio, existencia]
    );
    return result.insertId;
  }

  // Actualizar (UPDATE)
  static async update(id, nombre, precio, existencia) {
    await pool.query(
      "UPDATE producto SET nombreProducto = ?, precioUnitario = ?, existencia = ? WHERE id = ?",
      [nombre, precio, existencia, id]
    );
  }

  // Eliminar (soft delete) (DELETE)
  static async delete(id) {
    await pool.query("UPDATE producto SET activo = 0 WHERE id = ?", [id]);
  }
}

export default Producto;
