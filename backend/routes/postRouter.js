const { Router } = require('express');
const postController = require('../controllers/postController');
const {verifyToken} = require('../controllers/authController')
const router = Router();

router.get('/', postController.getAllPosts);
router.get('/:postId', postController.getPostById);
router.post('/', verifyToken, postController.createPost)

module.exports = router;