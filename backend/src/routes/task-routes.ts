import express from 'express';
const taskController = require('../controllers/task-controllers');

const router = express.Router();

router.post('/create-task', taskController.createTask);
router.get('/', taskController.getTasksByUserId);
router.patch('/status/:tid', taskController.updateStatus);
router.put('/:tid', taskController.updateTask)
router.delete('/:tid', taskController.deleteTask);

module.exports = router
