const express = require('express');
const server = express();

const tasks = require('./routers/tasks');

server.use(express.json());
server.use('/api/tasks', tasks);

server.listen(2023, _ => {
  console.log("Listening On Port 2023...");
})