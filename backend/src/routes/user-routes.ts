import express from 'express';
const userControllers = require('../controllers/user-controllers');


const router = express.Router();

router.post('/register', userControllers.signup);
router.post('/login', userControllers.login);

module.exports = router;