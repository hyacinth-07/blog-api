const express = require('express');
const router = express.Router();

// controller modules

const userController = require('../controllers/userControllers');
const postController = require('../controllers/postControllers');
const commentController = require('../controllers/commentControllers');

// read all posts
router.get('/', postController.home_page);

// read single post
router.get('/:id', postController.single_thread);

// create new post
router.post('/', postController.post_create);

// delete post
router.delete('/:id', postController.post_delete);

// update post
router.patch('/:id', postController.post_update);

// read single comment
// really should work with a query
router.get('/:postId/:commentId', commentController.single_comment);

// add comment
router.put('/:id', commentController.comment_add);

// delete comment
router.delete('/comments/:id', commentController.comment_delete);

// USER RELATED STUFF here

module.exports = router;
