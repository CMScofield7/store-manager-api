const connection = require('../connection');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getProductsById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?;',
    [id],
  );
  return result;
};

const createProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?);',
    [name],
  );

  return insertId;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
};