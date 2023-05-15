const { productsService } = require('../services');

const getAllProducts = async (_req, res) => {
  const products = await productsService.getAllProducts();
  return res.status(200).send(products.message);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductsById(Number(id));

  if (product.type) {
    return res.status(product.statusCode).send({ message: product.message });
  }

  return res.status(200).send(product.message);
};

module.exports = {
  getAllProducts,
  getProductsById,
};