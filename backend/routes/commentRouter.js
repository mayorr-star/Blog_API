const { Router } = require('express');
const commentController = require('../controllers/commentController');
const { verifyToken } = require('../controllers/authController');
const retrieveUser = require('../middlewares/userMiddleware');

const router = Router({mergeParams: true});

router.post('/', verifyToken, retrieveUser, commentController.createComment);

module.exports = router;