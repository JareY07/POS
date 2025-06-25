import pool from "../utils/db.js";

class Usuario {
  static async findByEmail(email) {
    const [rows] = await pool.query(
      "SELECT id, nombre, email, password FROM usuario WHERE email = ? AND activo = 1",
      [email]
    );
    return rows[0];
  }
}

export default Usuario;
