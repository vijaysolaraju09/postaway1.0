import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const payload = jwt.verify(token, "secret");
    req.userId = payload.userId;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    res.status(401).send("Unauthorized");
  }
};

export default jwtAuth;
