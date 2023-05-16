const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { getAllProductsMock, getProductsByIdMock } = require('./mocks/products.service.mock');

describe('Testando products.service', function () {
  afterEach(sinon.restore);

  describe('Testando a função getAllProducts', function () {
    it('Recebe um array', async function () {
      sinon.stub(productsModel, 'getAllProducts').resolves(getAllProductsMock);

      const getAllProducts = await productsService.getAllProducts();

      expect(getAllProducts.type).to.be.equal(null);
      expect(getAllProducts).to.be.an('array');
      expect(getAllProducts).to.be.deep.equal(getAllProductsMock);
    });
  });

  describe('Testando a função getProductsById', function () {
    it('Recebe um objeto', async function () {
      sinon.stub(productsModel, 'getProductsById').resolves(getProductsByIdMock);

      const getProductsById = await productsService.getProductsById();

      expect(getProductsById.type).to.be.equal(null);
      expect(getProductsById).to.be.an('object');
      expect(getProductsById).to.be.deep.equal(getProductsByIdMock);
    });

    it('Testando a função getProductsById caso não haja ID', async function () {
      sinon.stub(productsModel, 'getProductsById').resolves(undefined);

      const getProductsById = await productsService.getProductsById();

      expect(getProductsById.type).not.to.be.equal(null);
      expect(getProductsById.message).to.be.equal('Product not found');
    });
  });
});