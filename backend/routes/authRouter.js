const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/sign_up', authController.signUp)
router.post('/sign_in', authController.signIn)

module.exports = router;
