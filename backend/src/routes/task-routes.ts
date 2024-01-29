import express from 'express';
const taskController = require('../controllers/task-controllers');

const router = express.Router();

router.post('/create-task', taskController.createTask);
router.get('/', ()=>{});
router.get('/:id', ()=>{});
router.patch('/status/:id', ()=>{});
router.put('/:id', ()=>{})
router.delete('/:id', ()=>{});

module.exports = router
