const express = require('express');
const router = express.Router();

// controller modules

const userController = require('../controllers/userControllers');
const postController = require('../controllers/postControllers');
const commentController = require('../controllers/commentControllers');

// routes
// router.get('/', async (req, res) => {
// 	try {
// 		res.json({ message: 'Welcome to the Api blog' });
// 	} catch (e) {
// 		// error code 500 = generic server error
// 		res.status(500).json({ message: e.message });
// 	}
// });

router.get('/', postController.home_page);

module.exports = router;
