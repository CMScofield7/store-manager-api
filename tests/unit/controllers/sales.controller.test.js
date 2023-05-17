const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const {
  errorMock,
  getSalesMock,
  getSalesWithProductsMock,
} = require('./mocks/sales.controller.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando o sales.controller', function () {
  describe('Testando a função createSale', function () {
    afterEach(sinon.restore);

    it('Cria uma nova venda com sucesso', async function () {
      const req = {
        body: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 },
        ],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      const salesMock = {
        type: null,
        message: { id: 1, itemsSold: req.body },
      };
      
      const createSaleStub = sinon.stub(salesService, 'createSale').resolves(salesMock);

      await salesController.createSale(req, res);

      expect(createSaleStub).to.have.been.calledWith(req.body);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.send).to.have.been.calledWith(salesMock.message);
    });

    it('Deve tratar do erro quando cria uma venda', async function () {
      const req = {
        body: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 },
        ],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };
      
      const createSaleStub = sinon.stub(salesService, 'createSale').resolves(errorMock);

      await salesController.createSale(req, res);

      expect(createSaleStub).to.have.been.calledWith(req.body);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.send).to.have.been.calledWith({ message: errorMock.message });
    });
  });

  describe('Testando a função getAllSales', function () {
    afterEach(sinon.restore);

    it('Retorna todas as vendas', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      sinon.stub(salesService, 'getAllSales').resolves(getSalesMock);

      await salesController.getAllSales({}, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(getSalesMock.message);
    });
  });

  describe('getSalesWithProductsById', function () {
    afterEach(sinon.restore);

    it('Retorna todas as vendas com produtos pelo ID', async function () {
      const id = 1;

      const req = {
        params: { id },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      const getSalesWithProductsByIdStub = sinon.stub(salesService, 'getSalesWithProductsById').resolves(getSalesWithProductsMock);

      await salesController.getSalesWithProductsById(req, res);

      expect(getSalesWithProductsByIdStub).to.have.been.calledOnceWith(id);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(getSalesWithProductsMock.message);
    });

    it('Retorna um erro quando não acha venda com produto pelo ID', async function () {
      const id = 1;
      const req = {
        params: { id },
      };
      const getSalesWithProductsMock = {
        type: 'SALE_NOT_FOUND',
        message: 'Sale not found',
        statusCode: 404,
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };
      
      sinon.stub(salesService, 'getSalesWithProductsById').resolves(getSalesWithProductsMock);

      await salesController.getSalesWithProductsById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.send).to.have.been.calledWith({ message: getSalesWithProductsMock.message });
    });
  });
});
