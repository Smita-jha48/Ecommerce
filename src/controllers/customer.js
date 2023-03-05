const {customerService} = require('../services');

const createCustomer = async(req,res) => {
    try {
         const newUser = await customerService.createCustomer({...req.body});
         res.status(201).json({
            data: newUser
         })
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const loginCustomer = async (req, res) => {
    try {
      const token = await customerService.loginCustomer({...req.body});
      res.status(200).json({
        data: token
      });
    } catch(error){
       res.status(500).json({
        error: error.message
       });
    }
}

const getProducts = async(req,res) => {
    try {
      const products = await customerService.getProducts();
      res.status(200).json({
        data: products
      });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }

}

const addToCart = async (req,res) => {
    try {
         console.log(req.params);
         console.log(req.userData);
         const cart_id = req.userData.cart_id;
         const productId = req.params['id'];
         const updatedcart = await customerService.addToCart({cartId:cart_id, productId:productId});
         res.status(200).json({
            data: updatedcart,
            message: "Successfully added to cart"
          });
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });

    }
}

module.exports = {createCustomer, loginCustomer, getProducts, addToCart};