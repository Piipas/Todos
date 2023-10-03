const Task = require('../models/task');

const getTasks = async (req, res) => {
  try {
    const taskProcess = await Task.find();
    res.status(200).json(taskProcess);
  } catch (error) {
    console.log(error);
  }
}

const addTask = async (req, res) => {
  try {
    const title = req.body.title;
    const taskProcess = await Task.create({title});
    res.status(200).json(taskProcess);
  } catch (error) {
    console.log(error);
  }
}

const modifyTask = async (req, res) => {
  try {
    const taskID = req.params.id;
    const taskProcess = await Task.findOneAndUpdate({_id: taskID}, req.body, {
      new: true,
      runValidators: true
    })
    if (!taskProcess) { return res.status(404).json({msg: `The id ${taskID} does not match any task.`}) }
    res.json(200).json(taskProcess);
  } catch (error) {
    console.log(error);
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const taskProcess = await Task.findOneAndDelete({_id: taskID});
    if (!taskProcess) { return res.status(404).json({msg: `The id ${taskID} does not match any task.`}) }
    res.status(200).json(taskProcess);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getTasks,
  addTask,
  modifyTask,
  deleteTask
}