const TodoList = require("../models/todos");
const mongodb = require("mongodb");

exports.getTodos = async (req, res) => {
  const userId = req.user._id;
  console.log(userId);

  try {
    const todos = await TodoList.find({userId: new mongodb.ObjectID(userId)});
    console.log(todos);
    res.status(202).json(todos);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTodo = async (req, res) => {
  const id = req.params.id;
  //console.log(id);
  try {
    const todo = await TodoList.findById(id);
    if (!todo) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(202).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.postTodo = async (req, res) => {
  const body = req.body;
  // console.log(body);
  const userId = req.user._id;
  const todo = new TodoList({
    description: body.description,
    targetDate: body.targetDate,
    userId: userId
  });
  try {
    await todo.save();
    res.status(201).json(body);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    await TodoList.updateOne(
      { _id: id },
      { description: body.description, targetDate: body.targetDate }
    );
    //console.log(id);
    res.status(201).json({ message: "Created" });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteTodo = async (req, res) => {
  const id = req.params.id;
  try {
    await TodoList.deleteOne({ _id: id });
    res.sendStatus(202).json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
