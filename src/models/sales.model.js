const camelize = require('camelize');
const connection = require('./connection');

const createSale = async (sales) => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales (date) VALUES (NOW());');

  const itemsSold = await Promise.all(
    sales.map(async ({ productId, quantity }) => {
      await connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?);',
        [insertId, productId, quantity],
      );
      
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
    const [[{ date }]] = await connection.execute(
      'SELECT date FROM sales WHERE id = ?',
      [sale.sale_id],
    );

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

module.exports = {
  createSale,
  getAllSales,
  getSalesWithProductsById,
  getSaleById,
};