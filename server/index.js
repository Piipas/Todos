const express = require('express');
const server = express();

let tasks = [];

server.use(express.json());

server.get('/api/tasks', (req, res) => {
  res.status(200).json(tasks);
})

server.post('/api/tasks', (req, res) => {
  const title = req.body.title;
  if (!title) {
    return res.status(401).json({ success: false, msg: "Please Provide A Task Title!" });
  }
  const id = tasks.length ? tasks[tasks.length-1].id + 1 : 1;
  const task = { id, title, completed: false };
  tasks.push(task);
  res.status(200).send({ success: true, data: tasks, msg: "Task Added Successfuly!" });
})

server.put('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const title = req.body.title;
  const completed = Boolean(req.body.completed);
  if (!id || !title) { return res.status(401).json({ success: false, msg: "ID and Title are requried!" }); }
  const isExist = tasks.find(task => task.id == id);
  if (!isExist) { return res.status(401).json({ success: false, msg: `There is no task with id ${id}` }); }
  tasks.map(task => {
    if (task.id === id) {
      task.title = title;
      task.completed = completed;
    }
  });
  res.status(200).send({ success: true, data: tasks, msg: `The task with id ${id}, modified successfully!` });
})

server.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!id) { return res.status(401).json({ success: false, msg: "ID is required!" }) }
  const isExist = tasks.find(task => task.id === id);
  if (!isExist) { return res.status(401).json({ success: false, msg: `There is no task with id ${id}` }) };
  tasks = tasks.filter(task => task.id !== id);
  res.status(200).send({ success: true, data: tasks, msg: `The task with id ${id}, deleted successfully!` });
})

server.listen(2023, _ => {
  console.log("Listening On Port 2023...");
})