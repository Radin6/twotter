import jwt from "jsonwebtoken";

const authOptional = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Si no hay encabezado de autorización, permite que el flujo continúe
  if (!authHeader) {
    req.user = null;
    return next();
  }

  // Intenta extraer y verificar el token
  try {
    const token = authHeader.replace("Bearer ", "");
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Añade la información del usuario a la solicitud
    console.log("Token verified");
  } catch (error) {
    console.log("Invalid token");
    req.user = null; // Si el token es inválido, se trata como no autenticado
  }

  next(); // Permite que el flujo continúe
};

export default authOptional;
