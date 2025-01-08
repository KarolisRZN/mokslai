const express = require("express");

const app = express();
const port = 3001;

app.use(express.json());

let todos = [];
let currentId = 1;

// GET /todos - Retrieve all tasks
app.get("/todos", (req, res) => {
  res.json(todos);
});

// POST /todos - Add a new task
app.post("/todos", (req, res) => {
  const { description, completed } = req.body;
  const newTask = {
    id: currentId++,
    description,
    completed: completed || false,
  };
  todos.push(newTask);
  res.status(201).json(newTask);
});

// PUT /todos/:id - Update an existing task by its ID
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { description, completed } = req.body;
  const task = todos.find((t) => t.id == id);

  if (task) {
    task.description =
      description !== undefined ? description : task.description;
    task.completed = completed !== undefined ? completed : task.completed;
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// DELETE /todos/:id - Delete a task by its ID
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const taskIndex = todos.findIndex((t) => t.id == id);

  if (taskIndex !== -1) {
    todos.splice(taskIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

app.listen(port, () => {
  console.log(`To-Do List API is running at http://localhost:${port}`);
});
