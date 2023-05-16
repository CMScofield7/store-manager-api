const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');

const { salesModel } = require('../../../src/models');
const {
  salesMock,
  insertId,
  expectedCreatedSaleMock,
} = require('./mocks/sales.model.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando sales.model', () => {
  describe('Testando a conexão da função createSale', () => {
    afterEach(sinon.restore);

    it('Insere a venda e retorna o ID da venda criada e o item vendido', async () => {

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
});
