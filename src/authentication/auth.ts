import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const createToken = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.SECRET_KEY
  );

  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(400).json({ message: "not authorised" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(400).json({ message: "token not valid" });
    return;
  }
  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (e) {
    res.status(401).json({ message: "authorisation failed" });
  }
};
