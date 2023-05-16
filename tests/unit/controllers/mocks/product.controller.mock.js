const getAllProductsMock = {
  type: null,
  message: [
    {
      "id": 1,
      "name": "Martelo de Thor"
    },
    {
      "id": 2,
      "name": "Traje de encolhimento"
    },
    {
      "id": 3,
      "name": "Escudo do Capitão América"
    }
  ]
};

const getProductsByIdMock = {
  type: null,
  message: {
    "id": 1,
    "name": "Martelo de Thor"
  }
};

const productNotFoundMock = {
  type: 'PRODUCT_NOT_FOUND',
  message: 'Product not found',
  statusCode: 404,
};

module.exports = {
  getAllProductsMock,
  getProductsByIdMock,
  productNotFoundMock,
};