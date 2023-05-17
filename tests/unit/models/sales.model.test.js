const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');

const { salesModel } = require('../../../src/models');
const {
  salesMock,
  insertId,
  expectedCreatedSaleMock,
  salesProductsMock,
  salesIdWitDateMock,
  expectedSalesAndDateMock,
  productByIdMock,
} = require('./mocks/sales.model.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando sales.model', function () {
  describe('Testando a conexão da função createSale', function () {
    afterEach(sinon.restore);

    it('Insere a venda e retorna o ID da venda criada e o item vendido', async function () {

      const executeStub = sinon.stub(connection, 'execute');
      executeStub.withArgs('INSERT INTO sales (date) VALUES (NOW());').resolves([{ insertId }]);
      executeStub.withArgs('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?);').resolves();

      const createSale = await salesModel.createSale(salesMock);

      expect(createSale).to.deep.equal(expectedCreatedSaleMock);
      expect(executeStub).to.have.been.calledWith('INSERT INTO sales (date) VALUES (NOW());');
      expect(executeStub).to.have.been.calledWith(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?);',
        [insertId, 1, 10],
      );
      expect(executeStub).to.have.been.calledWith(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?);',
        [insertId, 2, 5],
      );
    });
  });

  describe('Testando a função getAllSales', function () {
    afterEach(sinon.restore);

    it('Deve retornar uma array de vendas com produtos e datas', async function () {

      const executeStub = sinon.stub(connection, 'execute');
      executeStub.withArgs('SELECT * FROM sales_products').resolves([salesProductsMock]);
      executeStub.withArgs('SELECT date FROM sales WHERE id = ?', [1]).resolves([[salesIdWitDateMock[0]]]);
      executeStub.withArgs('SELECT date FROM sales WHERE id = ?', [2]).resolves([[salesIdWitDateMock[1]]]);

      const getAllSales = await salesModel.getAllSales();

      expect(getAllSales).to.deep.equal(expectedSalesAndDateMock);
    });
  });

  describe('getSalesWithProductsById', function () {
    afterEach(sinon.restore);

    it('Deve retornar vendas com produtos pelo ID', async function () {
      const id = 1;
        
      await sinon.stub(connection, 'execute').resolves([productByIdMock]);
        
      const getSalesWithProductsById = await salesModel.getSalesWithProductsById(id);

      expect(getSalesWithProductsById).to.be.an('array');
    });
  });


  describe('getSaleById', function () {
    afterEach(sinon.restore);

    it('Deve retornar uma venda pelo ID', async function () {
      const id = 1;
      const query = 'SELECT * FROM sales WHERE id = ?';
      const result = {
        id: 1,
        date: '2023-01-01',
        amount: 10.99,
      };

      const executeStub = sinon.stub(connection, 'execute');
      executeStub.withArgs(query, [id]).resolves([[result]]);

      const expected = {
        id: 1,
        date: '2023-01-01',
        amount: 10.99,
      };

      const getSaleById = await salesModel.getSaleById(id);

      expect(getSaleById).to.deep.equal(expected);
    });
  });
});
