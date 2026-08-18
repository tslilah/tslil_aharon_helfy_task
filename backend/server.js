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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
