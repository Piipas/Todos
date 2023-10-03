const ConnectDB = require('./db/connect');
require('dotenv').config();

const express = require('express');
const server = express();

const tasks = require('./routers/tasks');
const port = 2023;

server.use(express.json());
server.use('/api/tasks', tasks);

const start = async _ => {
  try {
    await ConnectDB(process.env.MONGO_URI);
    server.listen(port, console.log(`Listening On Port ${port}...`));
  } catch (error) {
    console.log(error);
  }
}
start();