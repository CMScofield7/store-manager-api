const { salesService } = require('../services');

const createSale = async (req, res) => {
  const { body } = req;
  const sales = await salesService.createSale(body);

  if (sales.type) return res.status(sales.statusCode).send({ message: sales.message });
  return res.status(201).send(sales.message);
};

const getAllSales = async (_req, res) => {
  const getSales = await salesService.getAllSales();
  return res.status(200).send(getSales.message);
};

const getSalesWithProductsById = async (req, res) => {
  const { id } = req.params;
  const getSalesWithProducts = await salesService.getSalesWithProductsById(Number(id));
  
  if (getSalesWithProducts.type) {
    return res.status(getSalesWithProducts.statusCode)
      .send({ message: getSalesWithProducts.message });
  }

  return res.status(200).send(getSalesWithProducts.message);
};

const deleteSaleById = async (req, res) => {
  const { id } = req.params;
  const failToDelete = await salesService.deleteSaleById(Number(id));

  if (failToDelete) {
    return res.status(failToDelete.statusCode).send({ message: failToDelete.message });
  }

  return res.status(204).end();
};

module.exports = {
  createSale,
  getAllSales,
  getSalesWithProductsById,
  deleteSaleById,
};