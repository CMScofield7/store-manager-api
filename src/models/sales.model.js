const camelize = require('camelize');
const connection = require('./connection');

const createSale = async (sales) => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales (date) VALUES (NOW());');

  const itemsSold = await Promise.all(
    sales.map(async ({ productId, quantity }) => {
      const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?);';
      await connection.execute(query, [insertId, productId, quantity]);

    return { productId, quantity };
    }),
  );

  return {
    id: insertId,
    itemsSold,
  };
};

const getAllSales = async () => {
  const [salesProducts] = await connection.execute('SELECT * FROM sales_products');

  const salesPromise = salesProducts.map(async (sale) => {
    const query = 'SELECT date FROM sales WHERE id = ?';
    const [[{ date }]] = await connection.execute(query, [sale.sale_id]);

    return { ...camelize(sale), date };
  });

  return Promise.all(salesPromise);
};

const getSalesWithProductsById = async (id) => {
  const query = `
    SELECT
      sp.product_id,
      sp.quantity,
      s.date
    FROM
      sales_products sp
      INNER JOIN sales AS s ON s.id = sp.sale_id
    WHERE
      sp.sale_id = ?
  `;

  const [result] = await connection.execute(query, [id]);

  return camelize(result);
};

const getSaleById = async (id) => {
  const [[result]] = await connection.execute('SELECT * FROM sales WHERE id = ?', [id]);
  return result;
};

const deleteSaleById = async (id) => {
  await connection.execute('DELETE FROM sales_products WHERE sale_id = ?', [id]);

  const [{ affectedRows }] = await connection.execute('DELETE FROM sales WHERE id = ?', [id]);

  return affectedRows;
};

module.exports = {
  createSale,
  getAllSales,
  getSalesWithProductsById,
  getSaleById,
  deleteSaleById,
};