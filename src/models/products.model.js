const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getProductsById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?;';
  const [[result]] = await connection.execute(query, [id]);
  return result;
};

const createProduct = async (name) => {
  const query = 'INSERT INTO products (name) VALUES (?);';
  const [{ insertId }] = await connection.execute(query, [name]);

  return insertId;
};

const updateProduct = async (name, id) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?;';
  const [{ affectedRows }] = await connection.execute(query, [name, id]);
  return affectedRows;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?;';
  const [{ affectedRows }] = await connection.execute(query, [id]);
  return affectedRows;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};