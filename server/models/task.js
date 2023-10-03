const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Task title is required!"],
    maxLength: [40, "Task title can't be more than 40 characters"],
    minLength: [1, "Task title can't be empty!"]
  },
  completed: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Task', TaskSchema);