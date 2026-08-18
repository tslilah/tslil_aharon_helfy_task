const express = require("express");

const router = express.Router();

let tasks = [
  {
    id: 1,
    title: "task 1",
    description: "test",
    completed: false,
    createdAt: new Date(),
    priority: "low",
  },
  {
    id: 2,
    title: "task 2",
    description: "test 2",
    completed: true,
    createdAt: new Date(),
    priority: "medium",
  },
  {
    id: 3,
    title: "task 3",
    description: "test 3",
    completed: false,
    createdAt: new Date(),
    priority: "high",
  },
  {
    id: 4,
    title: "task 4",
    description: "test 4",
    completed: true,
    createdAt: new Date(),
    priority: "low",
  },
];

const validPriorities = ["low", "medium", "high"];

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const { title, description = "", priority = "medium" } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  if (!validPriorities.includes(priority)) {
    return res.status(400).json({
      message: "Priority must be low, medium, or high",
    });
  }

  const newTask = {
    id: Date.now(),
    title: title.trim(),
    description: description.trim(),
    completed: false,
    createdAt: new Date(),
    priority,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const { title, description = "", priority = "medium" } = req.body;

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (!title || !title.trim()) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  if (!validPriorities.includes(priority)) {
    return res.status(400).json({
      message: "Priority must be low, medium, or high",
    });
  }

  task.title = title.trim();
  task.description = description.trim();
  task.priority = priority;

  res.json(task);
});

router.delete("/:id", (req, res) => {
  const taskId = Number(req.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  tasks.splice(taskIndex, 1);

  res.status(204).send();
});

router.patch("/:id/toggle", (req, res) => {
  const taskId = Number(req.params.id);

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.completed = !task.completed;

  res.json(task);
});

module.exports = router;
