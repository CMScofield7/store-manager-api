const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const {
  salesMock,
  getSalesMock,
  expectedReturn,
  getSalesByIdMock,
  getSalesWithProductsByIdMock,
  expectedReturnMock,
  expectedNotFoundMock,
} = require('./mocks/sales.service.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando o sales.service', function () {
  describe('Testando a função createSale', function () {
    afterEach(sinon.restore);

    it('Retorna uma mensagem de sucesso caso todos os produtos forem encontrados', async function () {
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

    it('Retorna uma mensagem de falha caso qualquer produto não for encontrado', async function () {
      
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

  describe('Testando a função getAllSales', function () {
    afterEach(sinon.restore);

    it('Deve retornar todas as vendas', async function () {
      const getAllSalesStub = sinon.stub(salesModel, 'getAllSales').resolves(getSalesMock);

      const getAllSales = await salesService.getAllSales();

      expect(getAllSalesStub).to.have.been.calledOnce;
      expect(getAllSales).to.deep.equal(expectedReturn);
    });
  });

  describe('Testando a função getSalesWithProductsById', function () {
    afterEach(sinon.restore);

    it('Deve retornar vendas com produtos pelo ID', async function () {
      const id = 1;

      sinon.stub(salesModel, 'getSaleById').resolves(getSalesByIdMock);

      const getSalesWithProductsByIdStub = sinon.stub(salesModel, 'getSalesWithProductsById').resolves(getSalesWithProductsByIdMock);

      const getSalesWithProductsById = await salesService.getSalesWithProductsById(id);

      expect(getSalesWithProductsByIdStub).to.have.been.calledOnceWith(id);
      expect(getSalesWithProductsById).to.deep.equal(expectedReturnMock);
    });

    it('Deve retornar "Sale not found" quando as vendas pelo ID não existirem', async function () {
      const id = 1;

      const getSaleByIdStub = sinon.stub(salesModel, 'getSaleById').resolves(null);

      const getSalesWithProductsById = await salesService.getSalesWithProductsById(id);

      expect(getSaleByIdStub).to.have.been.calledOnceWith(id);
      expect(getSalesWithProductsById).to.deep.equal(expectedNotFoundMock);
    });
  });
});
