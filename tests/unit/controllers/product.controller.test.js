const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const {
  getAllProductsMock,
  getProductsByIdMock,
  productNotFoundMock,
  createProductMock,
} = require('./mocks/product.controller.mock');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando o products.controller', function () {
  afterEach(sinon.restore);

  describe('Testando a função getAllProducts', function () {
    it('Testando se retorna todos os produtos', async function () {
      sinon.stub(productsService, 'getAllProducts').resolves(getAllProductsMock);

      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      await productsController.getAllProducts(null, res);

      expect(res.status).to.be.calledWith(200);
      expect(res.send).to.be.calledWith(getAllProductsMock.message);
    });
  });

  describe('Testando a função getProductsById', function () {
    afterEach(sinon.restore);

    it('Testando se retorna o produto pelo ID', async function () {
      sinon.stub(productsService, 'getProductsById').resolves(getProductsByIdMock);

      const req = {
        params: {
          id: 1
        }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };
      
      await productsController.getProductsById(req, res);

      expect(res.status).to.be.calledWith(200);
      expect(res.send).to.be.calledWith(getProductsByIdMock.message);
    });

    it('Testando quando o produto não é encontrado', async function () {
      sinon.stub(productsService, 'getProductsById').resolves(productNotFoundMock);

      const req = {
        params: {
          id: 999
        }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };
      
      await productsController.getProductsById(req, res);

      expect(res.status).to.be.calledWith(404);
      expect(res.send).to.be.calledWith({ message: productNotFoundMock.message });
    });
  });

  describe('Testando a função createProduct', function () {
    it('Cria um novo produto', async function () {
      sinon.stub(productsService, 'createProduct').resolves(createProductMock);

      const req = {
        body: {
          name: 'Deck de Yu-Gi-Oh!'
        }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      await productsController.createProduct(req, res);

      console.log(res.send.args[0]);

      expect(res.status).to.be.calledWith(201);
      expect(res.send).to.be.calledWith(createProductMock.message);
    });
  });
});