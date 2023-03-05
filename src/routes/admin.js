const express = require('express');
const { adminController } = require('../controllers');
const {userMiddleware} = require('../middleware')
const router = express.Router();


router.post('/create',adminController.createAdmin);

router.route('/login')
.post(adminController.loginAdmin);

router.route('/addProduct')
.post(userMiddleware.authorizeUser,userMiddleware.adminChecker, adminController.createProduct);


module.exports = router;