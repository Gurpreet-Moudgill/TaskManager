const express = require('express');
const {
  createTask,
  getTask
} = require('../controllers/taskController');
const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks', getTask);
// router.put('/tasks/:id', updateTask);
// router.post('/tasks/:id/complete', completeTask);

module.exports = router;
