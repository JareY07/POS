import pool from "../utils/db.js";

class Cliente {
  // Obtener todos
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM cliente WHERE activo = 1");
    return rows;
  }

  // Obtener por ID
  static async getById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM cliente WHERE id = ? AND activo = 1",
      [id]
    );
    return rows[0] || null;
  }

  // Crear
  static async create(nombre, direccion, telefono, email) {
    const [result] = await pool.query(
      "INSERT INTO cliente (nombre, direccion, telefono, correoElectronico) VALUES (?, ?, ?, ?)",
      [nombre, direccion, telefono, email]
    );
    return result.insertId;
  }

  // Actualizar
  static async update(id, nombre, direccion, telefono, email) {
    await pool.query(
      "UPDATE cliente SET nombre = ?, direccion = ?, telefono = ?, correoElectronico = ? WHERE id = ?",
      [nombre, direccion, telefono, email, id]
    );
  }

  // Eliminar (soft delete)
  static async delete(id) {
    await pool.query("UPDATE cliente SET activo = 0 WHERE id = ?", [id]);
  }
}

export default Cliente;
