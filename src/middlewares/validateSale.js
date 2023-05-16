const validateSale = (req, res, next) => {
  const sales = req.body;

  if (sales.some((sale) => !sale.productId)) {
    return res.status(400).send({ message: '"productId" is required' });
  }

  if (sales.some((sale) => sale.quantity === undefined || sale.quantity === null)) {
    return res.status(400).send({ message: '"quantity" is required' });
  }

  if (sales.some((sale) => sale.quantity < 1)) {
    return res.status(422).send({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  validateSale,
};