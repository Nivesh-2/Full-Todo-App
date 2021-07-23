const express = require("express");
const router = express.Router();
const todoController = require("../controller/todos");

// http://localhost:5000/todos/:id
router.get("/:id", todoController.getTodo);

//http://localhost:5000/todos/
router.get("/", todoController.getTodos);

// http://localhost:5000/todos/postTodo
router.post("/postTodo", todoController.postTodo);

// http://localhost:5000/todos/updateTodo/:id
router.put("/updateTodo/:id", todoController.updateTodo);

// http://localhost:5000/todos/:id
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
