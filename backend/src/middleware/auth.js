import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    res.status(401).send({message: "Access denied. No token provided"})
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    console.log("Token all good")
    next()
  } catch(error) {
    console.log("Error tying to verify", error)
    res.status(400).send({message: "Invalid token"})
  }

  
}

export default auth;