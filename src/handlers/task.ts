import prisma from "../db";

//get the tasks
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        belongsToId: req.user.id,
      },
    });

    res.json({ tasks });
  } catch (e) {
    next(e);
  }
};

//get tasks by status
export const getTasksByStatus = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        belongsToId: req.user.id,
        status: req.body.status,
      },
    });

    res.json({ tasks });
  } catch (e) {
    next(e);
  }
};

//create a task
export const createTask = async (req, res, next) => {
  try {
    const task = await prisma.task.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        scheduleDate: req.body.scheduleDate,
        belongsToId: req.user.id,
      },
    });

    res.json({ message: "task created successfully" });
  } catch (e) {
    next(e);
  }
};

//update a task
export const updateTask = async (req, res, next) => {
  try {
    const task = await prisma.task.update({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
      data: {
        title: req.body.title,
        description: req.body.description,
        scheduleDate: req.body.scheduleDate,
        status: req.body.status,
      },
    });

    res.json({ message: "task updated successfully" });
  } catch (e) {
    next(e);
  }
};

//delete a task
export const deleteTask = async (req, res, next) => {
  try {
    const task = await prisma.task.delete({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
    });

    res.json({ message: "task deleted successfully" });
  } catch (e) {
    next(e);
  }
};
