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

//get tasks by date
export const getTasksByDate = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        belongsToId: req.user.id,
        scheduleDate: {
          gte: new Date(`${req.params.date}T00:00:00.000Z`),
          lte: new Date(`${req.params.date}T23:59:59.999Z`),
        },
      },
    });

    res.json({ tasks });
  } catch (e) {
    next(e);
  }
};

//get tasks for a range
export const getTasksForARange = async (req, res, next) => {
  try {
    const { start, end } = req.query;
    const tasks = await prisma.task.findMany({
      where: {
        belongsToId: req.user.id,
        scheduleDate: {
          gte: new Date(`${start}T00:00:00.000Z`),
          lte: new Date(`${end}T23:59:59.999Z`),
        },
      },
    });

    res.json({ tasks });
  } catch (e) {
    console.log(req.query);
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
    console.log("🛠 Creating task with:", {
      title: req.body.title,
      description: req.body.description,
      scheduleDate: req.body.scheduleDate,
      belongsToId: req.user.id,
    });

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
