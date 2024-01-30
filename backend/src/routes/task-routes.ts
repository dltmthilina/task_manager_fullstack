import express from 'express';
const taskController = require('../controllers/task-controllers');

const router = express.Router();

router.post('/create-task', taskController.createTask);
router.get('/:uid', taskController.getTasksByUserId);
router.patch('/status/:tid', taskController.updateStatus);
router.put('/:tid', ()=>{})
router.delete('/:tid', ()=>{});

module.exports = router
