const bcrypt = require('bcrypt');
const {User, Cart, Product} = require('../../database/models');
const { passwordUtil, redisUtil } = require('../utils');
const jwt = require('jsonwebtoken');

const createCustomer = async ({name,email,password}) => {
 const hashedPassword = await passwordUtil.hashPassword(password);
 const cart = await Cart.create({product_list: []});
 return User.create({
    name,
    email,
    type:'customer',
    password: hashedPassword,
    cart_id: cart.id,
 });

}

const loginCustomer = async({email,password}) => {
   const user = await User.findOne({where: {email: email}});
   console.log(user);
   if(user) {
      const checkPassword = await passwordUtil.comparePassword(password, user.password)
      if(checkPassword) {
          const token = jwt.sign({id: user.id, name: user.name, email: user.email, type: user.type, cart_id: user.cart_id},process.env.JWT_SECRET);
          await redisUtil.set(user.id,'customer', token);
          return {token: `Bearer ${token}`};
      }
      else {
         throw new Error('Wrong Password entered');
      }
   } else {
      throw new Error(`No User found with email ${email}`);
   }
}

const getProducts = () => {
   return Product.findAll({
      attributes: ['id', 'name'], 
   });
}

const addToCart = async({cartId, productId}) =>{
    const cart =  await Cart.findOne({
      where: {id:cartId}
    })
    if(!cart) {
      throw new Error('not found');
    }
    const productList = [...cart.product_list, productId];
    return Cart.update({
      product_list: productList
    },{where: {id:cartId} })

}


module.exports = { createCustomer, loginCustomer, getProducts, addToCart };
