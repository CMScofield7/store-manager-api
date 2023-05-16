const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const {
  errorMock,
} = require('./mocks/sales.controller.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando o sales.controller', () => {
  describe('Testando a função createSale', () => {
    afterEach(sinon.restore);

    it('Cria uma nova venda com sucesso', async () => {
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

    it('Deve tratar do erro quando cria uma venda', async () => {
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
});
