const jwt = require("jsonwebtoken");
const { use } = require("../routes/customer");
const { redisUtil } = require("../utils");

const  authorizeUser = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const userData = await jwt.verify(token, process.env.JWT_SECRET);
        if(!userData) {
            res.status(400).json({
                error: 'Unauthorized User'
            })
            return ;
        }
        const redisToken = await redisUtil.get(userData.id,userData.type);
        console.log(redisToken);
        if(redisToken !== token){
            res.status(400).json({
                error: 'Unauthorized User'
            });
            return ;
        }
        req.userData = userData;
        next();
    }
    catch (error) {
       res.status(500).json({
        error: error.message
       });
    }
}


const customerChecker = (req,res,next) => {
    try {
        const userData = req.userData;
        if(userData.type !== 'customer') {
            res.status(400).json ({
                mesage : 'not valid user'
            });
            return
        }
        next();

    } catch (error) {
        res.status(500).json({
            error: error.message
    })
}
}

const adminChecker = (req,res,next) => {
    try {
        const userData = req.userData;
        if(userData.type !== 'admin') {
            res.status(400).json ({
                mesage : 'not valid user'
            });
            return
        }
        next();

    } catch (error) {
        res.status(500).json({
            error: error.message
    })
}
}

module.exports = {authorizeUser, customerChecker, adminChecker };