const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { salesMock } = require('./mocks/sales.service.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando o sales.service', () => {
  describe('Testando a função createSale', () => {
    afterEach(sinon.restore);

    it('Retorna uma mensagem de sucesso caso todos os produtos forem encontrados', async () => {
      const salesMock = [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 },
      ];
      const getProductsByIdStub = sinon.stub(productsModel, 'getProductsById').resolves(true);
      const createSaleStub = sinon.stub(salesModel, 'createSale').resolves({ id: 1, itemsSold: salesMock });

      const createSale = await salesService.createSale(salesMock);

      expect(getProductsByIdStub).to.have.been.calledWith(sinon.match.number);
      expect(createSaleStub).to.have.been.calledWith(salesMock);
      expect(createSale).to.deep.equal({
        type: null,
        message: { id: 1, itemsSold: salesMock },
      });
    });

    it('Retorna uma mensagem de falha caso qualquer produto não for encontrado', async () => {
      
      const getProductsByIdStub = sinon.stub(productsModel, 'getProductsById').resolves(false);

      const createSale = await salesService.createSale(salesMock);

      expect(getProductsByIdStub).to.have.been.calledWith(sinon.match.number);
      expect(createSale).to.deep.equal({
        type: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
        statusCode: 404,
      });
    });
  });
});
