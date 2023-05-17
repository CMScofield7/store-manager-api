const salesMock = [
  { productId: 1, quantity: 10 },
  { productId: 2, quantity: 5 },
];

const insertId = 1;

const expectedCreatedSaleMock = {
  id: insertId,
  itemsSold: [
    { productId: 1, quantity: 10 },
    { productId: 2, quantity: 5 },
  ],
};

const salesProductsMock = [
  { id: 1, sale_id: 1, product_id: 1, quantity: 2 },
  { id: 2, sale_id: 2, product_id: 2, quantity: 1 },
];

const salesIdWitDateMock = [
  { id: 1, date: '2023-01-01' },
  { id: 2, date: '2023-01-02' },
];

const expectedSalesAndDateMock = [
  { id: 1, saleId: 1, productId: 1, quantity: 2, date: '2023-01-01' },
  { id: 2, saleId: 2, productId: 2, quantity: 1, date: '2023-01-02' },
];

const productByIdMock = [
  { product_id: 1, quantity: 2, date: '2023-01-01' },
  { product_id: 2, quantity: 1, date: '2023-01-02' },
];

const expectedProductByIdMock = [
  { productId: 1, quantity: 2, date: '2023-01-01' },
  { productId: 2, quantity: 1, date: '2023-01-02' },
];

module.exports = {
  salesMock,
  insertId,
  expectedCreatedSaleMock,
  salesProductsMock,
  salesIdWitDateMock,
  expectedSalesAndDateMock,
  productByIdMock,
  expectedProductByIdMock,
};