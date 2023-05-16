const { salesService } = require('../services');

const createProduct = async (req, res) => {
  const { body } = req;
  const sales = await salesService.createSale(body);

  if (sales.type) return res.status(sales.statusCode).send({ message: sales.message });
  return res.status(201).send(sales.message);
};

module.exports = {
  createProduct,
};