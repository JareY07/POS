import pool from "../utils/db.js";

class Cuenta {
  static async create(numeroCuenta, tipoCuenta, saldoInicial, clienteId) {
    const [result] = await pool.query(
      `INSERT INTO cuenta 
       (numeroCuenta, tipoCuenta, saldo, clienteId) 
       VALUES (?, ?, ?, ?)`,
      [numeroCuenta, tipoCuenta, saldoInicial, clienteId]
    );
    return result.insertId;
  }

  static async findByCliente(clienteId) {
    const [rows] = await pool.query(
      `SELECT id, numeroCuenta, tipoCuenta, saldo 
       FROM cuenta 
       WHERE clienteId = ? AND activo = 1`,
      [clienteId]
    );
    return rows;
  }

  static async updateSaldo(cuentaId, monto) {
    await pool.query(
      `UPDATE cuenta 
       SET saldo = saldo + ? 
       WHERE id = ?`,
      [monto, cuentaId]
    );
  }

  static async findById(cuentaId) {
    const [rows] = await pool.query(
      `SELECT c.*, cl.nombre as clienteNombre
       FROM cuenta c
       JOIN cliente cl ON c.clienteId = cl.id
       WHERE c.id = ? AND c.activo = 1`,
      [cuentaId]
    );
    return rows[0];
  }
}

export default Cuenta;
