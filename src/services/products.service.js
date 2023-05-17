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

const createProduct = async (name) => {
  const insertId = await productsModel.createProduct(name);

  return {
    type: null,
    message: {
      id: insertId,
      name,
    },
  };
};

const updateProduct = async (name, id) => {
  const getProductById = await productsModel.getProductsById(id);

  if (!getProductById) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
      statusCode: 404,
    };
  }

  await productsModel.updateProduct(name, id);

  return {
    type: null,
    message: {
      id,
      name,
    },
  };
};

const deleteProduct = async (id) => {
  const getProductById = await productsModel.getProductsById(id);

  if (!getProductById) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
      statusCode: 404,
    };
  }

  await productsModel.deleteProduct(id);
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
