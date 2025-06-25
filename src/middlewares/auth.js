import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    console.log("Headers:", req.headers); // Debug: Ver qué headers llegan
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token recibido:", token); // Debug: Ver el token

    if (!token) {
      return res.status(401).json({ error: "Token requerido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decodificado:", decoded); // Debug: Ver el payload

    req.user = decoded; // Usa directamente el payload decodificado
    next();
  } catch (error) {
    console.error("Error en auth middleware:", error);
    res.status(401).json({ error: "Token inválido" });
  }
};
