import prisma from "../db";

//for getting the user information
export const getUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    res.json({ user });
  } catch (e) {
    next(e);
  }
};

//for updating user info
export const updateUser = async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        username: req.body.username,
      },
    });

    res.json({ message: "user data has been updated." });
  } catch (e) {
    next(e);
  }
};

//delete user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: req.user.id,
      },
    });

    res.json({ message: "user data has been successfully deleted." });
  } catch (e) {
    next(e);
  }
};
