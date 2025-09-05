import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "Token requerido" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido" });
  }
}

export function requireSuperAdmin(req, res, next) {
  if (req.user.role !== "superadmin") {
    return res.status(403).json({ error: "Acceso denegado" });
  }
  next();
}

export function requireSelfOrSuperAdmin(paramKey = "id") {
  return (req, res, next) => {
    const targetId = parseInt(req.params[paramKey]);
    if (req.user.role === "superadmin" || req.user.id === targetId) {
      return next();
    }
    return res.status(403).json({ error: "Acceso denegado" });
  };
}
