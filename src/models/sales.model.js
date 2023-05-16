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

module.exports = {
  createSale,
};