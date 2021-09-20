import Task from "../models/TasksModel.js";
import moment from "moment";
import pkg from "sequelize";
const { Op } = pkg;

export const getAllTasks = async (req, res) => {
  const { id } = req.user.payload;
  const { date } = req.query;
  try {
    const tasks = await Task.findAll({
      where: {
        userId: id,
        completed: false,
        deadline: {
          [Op.between]: [
            Date.parse(date + " 00:00:00"),
            Date.parse(date + " 23:59:59"),
          ],
        },
      },
    });
    if (!tasks[0]) {
      res.status(404).send({ message: "No se ha encontrado ninguna tarea..." });
    } else {
      res.status(200).send({ tasks });
    }
  } catch (ex) {
    res.status(500).send({ message: "Error en el servidor..." });
  }
};

export const setTaskCompleted = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Task.update(
      { completed: true, delivery: Date.now() },
      {
        where: {
          id,
        },
      }
    );
    if (!result[0]) {
      res
        .status(404)
        .send({ message: "No se ha encontrado la tarea...", status: 404 });
    } else {
      res
        .status(200)
        .send({ message: "Se ha completado la tarea!", status: 200 });
    }
  } catch (ex) {
    res.status(500).send({ message: "Error en el servidor...", status: 500 });
  }
};

export const getAllTasksCompleted = async (req, res) => {
  const { id } = req.user.payload;
  try {
    const tasks = await Task.findAll({
      where: {
        userId: id,
        completed: true,
      },
    });
    if (!tasks[0]) {
      res.status(404).send({ message: "No se ha encontrado ninguna tarea..." });
    } else {
      res.status(200).send({ tasks });
    }
  } catch (ex) {
    res.status(500).send({ message: "Error en el servidor...", status: 500 });
  }
};

export const createTasks = async (req, res) => {
  const { id } = req.user.payload;
  const { title, description, date, time } = req.body;

  if (!title || !description || !date || !time) {
    res.status(404).send({ message: "Uno de los campos esta vacio..." });
  } else {
    const deadline = Date.parse(
      date.split("/").reverse().join("-") + " " + time
    );
    try {
      const task = await Task.create(
        {
          title,
          description,
          deadline: deadline,
          completed: false,
          userId: id,
        },
        {
          fields: ["title", "description", "deadline", "completed", "userId"],
        }
      );
      if (task) {
        res.status(200).send({ task: task });
      } else {
        res.status(404).send({ message: "Error al crear la tarea..." });
      }
    } catch (ex) {
      res.status(500).send({ message: "Error en el servidor...", status: 500 });
    }
  }
};

export const countAllTasksCompleted = async (req, res) => {
  const { id } = req.user.payload;
  try {
    const tasks = await Task.count({
      where: {
        userId: id,
        completed: true,
      },
    });
    console.log(tasks);
    if (!tasks) {
      res.status(404).send({ message: "No se ha encontrado ninguna tarea..." });
    } else {
      res.status(200).send({ tasks });
    }
  } catch (ex) {
    res.status(500).send({ message: "Error en el servidor...", status: 500 });
  }
};

export const countAllPendingTasks = async (req, res) => {
  const { id } = req.user.payload;
  try {
    const tasks = await Task.count({
      where: {
        userId: id,
        completed: false,
      },
    });
    console.log(tasks);
    if (!tasks) {
      res.status(404).send({ message: "No se ha encontrado ninguna tarea..." });
    } else {
      res.status(200).send({ tasks });
    }
  } catch (ex) {
    res.status(500).send({ message: "Error en el servidor...", status: 500 });
  }
};

export const countAllLateTasks = async (req, res) => {
  const { id } = req.user.payload;
  try {
    const tasks = await Task.count({
      where: {
        userId: id,
        completed: false,
        deadline: {
          [Op.lt]: Date.now(),
        },
      },
    });
    console.log(tasks);
    if (!tasks) {
      res.status(404).send({ message: "No se ha encontrado ninguna tarea..." });
    } else {
      res.status(200).send({ tasks });
    }
  } catch (ex) {
    res.status(500).send({ message: "Error en el servidor...", status: 500 });
  }
};
