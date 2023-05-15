const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return {
    type: null,
    message: products,
  };
};

const getProductsById = async (id) => {
  const product = await productsModel.getProductsById(id);
  if (!product) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
      statusCode: 404,
    };
  }
  return {
    type: null,
    message: product,
  };
};

module.exports = {
  getAllProducts,
  getProductsById,
};
