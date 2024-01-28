import express from 'express';

const router = express.Router();

router.post('/create-task', ()=>{});
router.get('/', ()=>{});
router.get('/:id', ()=>{});
router.patch('/status/:id', ()=>{});
router.put('/:id', ()=>{})
router.delete('/:id', ()=>{});

module.exports = router
