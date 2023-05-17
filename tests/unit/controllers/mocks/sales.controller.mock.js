const errorMock = {
  type: 'PRODUCT_NOT_FOUND',
  message: 'Product not found',
  statusCode: 404,
};

const getSalesMock = {
  type: null,
  message: [
    { id: 1, date: '2023-01-01' },
    { id: 2, date: '2023-01-02' },
  ],
};

const getSalesWithProductsMock = {
  type: null,
  message: [
    { productId: 1, quantity: 2, date: '2023-01-01' },
    { productId: 2, quantity: 1, date: '2023-01-02' },
  ],
};

module.exports = {
  errorMock,
  getSalesMock,
  getSalesWithProductsMock,
};