const { salesModel, productsModel } = require('../models');

const createSale = async (sales) => {
  const productFound = await Promise.all(
    sales.map(async (sale) => {
      const getProductsById = await productsModel.getProductsById(Number(sale.productId));
      return Boolean(getProductsById);
    }),
  );

  if (productFound.some((found) => !found)) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
      statusCode: 404,
    };
  }

  const productSold = await salesModel.createSale(sales);

  return {
    type: null,
    message: productSold,
  };
};

module.exports = {
  createSale,
};