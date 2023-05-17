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

const createProduct = async (req, res) => {
  const { name } = req.body;
  console.log(name);

  const newProduct = await productsService.createProduct(name);
  return res.status(201).send(newProduct.message);
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const updatedProduct = await productsService.updateProduct(name, Number(id));

  if (updatedProduct.type) {
    return res.status(updatedProduct.statusCode).send({ message: updatedProduct.message });
  }

  return res.status(200).send(updatedProduct.message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const failToDelete = await productsService.deleteProduct(Number(id));

  if (failToDelete) {
    return res.status(failToDelete.statusCode).send({ message: failToDelete.message });
  }

  return res.status(204).end();
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};