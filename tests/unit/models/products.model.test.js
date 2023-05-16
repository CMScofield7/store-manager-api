const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const {
  getAllProductsMock,
  getProductsByIdMock,
  createProductMock
} = require('./mocks/products.model.mock');

describe('Testando products.model', function () {
  afterEach(sinon.restore);

  describe('Testando a conexão da função getAllProducts', function () {
    it('Recebe um array', async function () {
      sinon.stub(connection, 'execute').resolves([getAllProductsMock]);

      const getAllProducts = await productsModel.getAllProducts();

      expect(getAllProducts).to.be.an('array');
      expect(getAllProducts).to.be.deep.equal(getAllProductsMock);
    });
  });

  describe('Testando a conexão da função getProductsById', function () {
    it('Recebe um objeto', async function () {
      sinon.stub(connection, 'execute').resolves([[getProductsByIdMock]]);

      const getProductsById = await productsModel.getProductsById();

      expect(getProductsById).to.be.an('object');
      expect(getProductsById).to.be.deep.equal(getProductsByIdMock);
    })
  });

  describe('Testando a conexão da função createProduct', function () {
    it('Envia um objeto pro banco de dados', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
      
      const createProduct = await productsModel.createProduct(createProductMock);

      expect(createProduct).to.be.equal(4);
    });
  });
});