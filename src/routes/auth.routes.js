import express from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.model.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usuario.findByEmail(email);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Payload debe incluir el ID mínimo
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

export { router as authRoutes };
