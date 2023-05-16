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

const getAllSales = async () => {
  const getSales = await salesModel.getAllSales();
  return {
    type: null,
    message: getSales,
  };
};

const getSalesWithProductsById = async (id) => {
  const getSalesById = await salesModel.getSaleById(id);
  if (!getSalesById) {
      return {
        type: 'SALE_NOT_FOUND',
        message: 'Sale not found',
        statusCode: 404,
      }; 
}

  const getSalesWithProducts = await salesModel.getSalesWithProductsById(id);

  return {
    type: null,
    message: getSalesWithProducts,
  };
};

module.exports = {
  createSale,
  getAllSales,
  getSalesWithProductsById,
};