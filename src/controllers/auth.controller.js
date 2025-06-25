import Usuario from "../models/usuario.model.js";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findByEmail(email);
    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Payload debe incluir el ID
    const token = jwt.sign(
      {
        id: usuario.id, // ← Esto es crítico
        email: usuario.email,
        nombre: usuario.nombre,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};
