let dynamoose = require("dynamoose");
dynamoose.aws.ddb.local("http://localhost:8000");
const express = require("express");
const router = express.Router();
let Todo = require("../Model/schema");

router.get("/todos", async (req, res) => {
  try {
    console.log("Entered get req");
    const todos = await Todo.scan().exec();
    console.log("This is the response", todos);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/todos", async (req, res) => {
  try {
    req.body["id"] = Date.now().toString();
    console.log(req.body);
    const createTodo = await Todo.create(req.body);
    res.status(201).json(createTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.delete({ id });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;
  try {
    const updateTodo = await Todo.update({ id }, { isCompleted });
    res.json(updateTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
