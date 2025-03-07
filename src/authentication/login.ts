import prisma from "../db";
import { comparePassword, createToken } from "./auth";

const login = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    const isValid = await comparePassword(req.body.password, user.password);

    if (!isValid) {
      res.status(401).json({ message: "user login failed" });
    }

    const token = createToken(user);

    res.json({ token });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export default login;
