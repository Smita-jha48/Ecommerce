const router = require('./customer');
const customerRoute = require('./customer');
const adminRoute = require('./admin');

router.use('/customer',customerRoute);
router.use('/admin', adminRoute);


module.exports = { customerRoute, adminRoute};