const { Router } = require("express");
const postController = require("../controllers/postController");
const { verifyToken } = require("../controllers/authController");
const router = Router();

router.get("/", postController.getAllPosts);
router.get("/:postId", postController.getPostById);
router.post("/:authorId", verifyToken, postController.createPost);
router.put("/:postId", verifyToken, postController.updatePost);
router.delete("/:postId", verifyToken, postController.deletePost);

module.exports = router;
