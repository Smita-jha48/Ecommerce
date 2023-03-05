const express = require('express');
const { customerController } = require('../controllers');
const {userMiddleware} = require('../middleware')
const router = express.Router();


router.post('/create',customerController.createCustomer);

router.route('/login')
.post(customerController.loginCustomer);

router.route('/products')
.get( userMiddleware.authorizeUser,userMiddleware.customerChecker,customerController.getProducts);

router.route('/addToCart/:id')
.get(userMiddleware.authorizeUser,userMiddleware.customerChecker,customerController.addToCart);



module.exports = router;