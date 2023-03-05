const bcrypt = require('bcrypt');
const {User, Cart, Product} = require('../../database/models');
const { passwordUtil, redisUtil } = require('../utils');
const jwt = require('jsonwebtoken');

const createAdmin = async ({name,email,password}) => {
 const hashedPassword = await passwordUtil.hashPassword(password);
 const cart = await Cart.create({product_list: []});
 return User.create({
    name,
    email,
    type:'admin',
    password: hashedPassword,
    cart_id: cart.id,
 });

}

const loginAdmin = async({email,password}) => {
   const user = await User.findOne({where: {email: email}});
   console.log(user);
   if(user) {
      const checkPassword = await passwordUtil.comparePassword(password, user.password)
      if(checkPassword) {
          const token = await jwt.sign({id: user.id, name: user.name, email: user.email, type: user.type},process.env.JWT_SECRET);
          await redisUtil.set(user.id,'admin', token);
          return {token: `Bearer ${token}`};
      }
      else {
         throw new Error('Wrong Password entered');
      }
   } else {
      throw new Error(`No User found with email ${email}`);
   }
}

const createProduct = async({name, userId}) => {
    console.log(name);
    console.log(userId);
    return Product.create({name: name, user_id: userId});

}

module.exports = { createAdmin, loginAdmin, createProduct };
