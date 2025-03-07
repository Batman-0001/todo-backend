import prisma from "../db";
import { createToken, hashPassword } from "./auth";

const signup = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createToken(user);

    res.json({ token });
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "user registration failed" });
  }
};

export default signup;
