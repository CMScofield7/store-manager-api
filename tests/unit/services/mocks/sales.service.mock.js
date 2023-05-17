const salesMock = [
  { productId: 1, quantity: 10 },
  { productId: 2, quantity: 5 },
];

const getSalesMock = [
  { id: 1, date: '2023-01-01' },
  { id: 2, date: '2023-01-02' },
];

const expectedReturn = {
  type: null,
  message: getSalesMock,
};

const getSalesByIdMock = { id: 1, date: '2023-01-01' };

const getSalesWithProductsByIdMock = [
  { productId: 1, quantity: 2, date: '2023-01-01' },
  { productId: 2, quantity: 1, date: '2023-01-02' },
];

const expectedReturnMock = {
  type: null,
  message: getSalesWithProductsByIdMock,
};

const expectedNotFoundMock = {
  type: 'SALE_NOT_FOUND',
  message: 'Sale not found',
  statusCode: 404,
};

module.exports = {
  salesMock,
  getSalesMock,
  expectedReturn,
  getSalesByIdMock,
  getSalesWithProductsByIdMock,
  expectedReturnMock,
  expectedNotFoundMock,
};