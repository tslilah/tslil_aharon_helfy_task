const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

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

app.get("/", (req, res) => {
  res.json({ message: "api is running" });
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title, description = "", priority = "medium" } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  const validPriorities = ["low", "medium", "high"];

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

app.put("/api/tasks/:id", (req, res) => {
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

  const validPriorities = ["low", "medium", "high"];

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

app.delete("/api/tasks/:id", (req, res) => {
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

app.patch("/api/tasks/:id/toggle", (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
