const express = require('express');
const router = express.Router();

const {
  getTasks,
  addTask,
  modifyTask,
  deleteTask
} = require('../controllers/tasks');

router.route('/').get(getTasks).post(addTask);
router.route('/:id').patch(modifyTask).delete(deleteTask);

module.exports = router;