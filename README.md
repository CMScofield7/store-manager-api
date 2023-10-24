# Store Manager API

Este é um projeto de API para gerenciamento de produtos e vendas, desenvolvido como parte do curso da Trybe. A API oferece funcionalidades para listar, cadastrar, atualizar e deletar produtos, além de gerenciar vendas. A seguir, estão listados os requisitos obrigatórios e os requisitos bônus que foram atendidos neste projeto.

## Requisitos Obrigatórios

### 01 - Listar Produtos
- Crie endpoints para listar produtos acessíveis através de /products e /products/:id;
- /products deve retornar todos os produtos ordenados de forma crescente por id;
- /products/:id deve retornar um único produto com base no id fornecido na URL.

### 02 - Desenvolver Testes
- Desenvolver testes que cubram no mínimo 5% das linhas e tenha no mínimo 2 funções escritas nas camadas da aplicação.

### 03 - Cadastrar Produtos
- Criar um endpoint acessível através de /products para cadastrar produtos no banco de dados.

### 04 - Validar Produtos
- Criar validações para os produtos sem acessar o banco de dados nas validações iniciais do corpo da requisição.

### 05 - Desenvolver Testes
- Desenvolver testes que cubram no mínimo 10% das linhas e tenha no mínimo 3 funções escritas nas camadas da aplicação.

### 06 - Cadastrar Vendas
- Criar um endpoint acessível através de /sales para validar e cadastrar vendas no banco de dados.
- É possível cadastrar a venda de vários produtos em uma única requisição.

### 07 - Desenvolver Testes
- Desenvolver testes que cubram no mínimo 15% das linhas e tenha no mínimo 4 funções escritas nas camadas da aplicação.

### 08 - Listar Vendas
- Criar endpoints para listar vendas acessíveis através de /sales e /sales/:id;
- /sales deve retornar todas as vendas ordenadas de forma crescente por saleId e productId.
- /sales/:id deve retornar uma única venda com base no id fornecido na URL.

### 09 - Desenvolver Testes
- Desenvolver testes que cubram no mínimo 20% das linhas e tenha no mínimo 6 funções escritas nas camadas da aplicação.

### 10 - Atualizar Produto
- Criar um endpoint acessível através de /products/:id para atualizar um produto no banco de dados.

### 11 - Desenvolver Testes
- Desenvolver testes que cubram no mínimo 25% das linhas e tenha no mínimo 7 funções escritas nas camadas da aplicação.

### 12 - Deletar Produto
- Criar um endpoint acessível através de /products/:id para deletar um produto do banco de dados.

## Requisitos Bônus

### 13 - Deletar Venda
- Criar um endpoint acessível através de /sales/:id para deletar uma venda do banco de dados.

### 14 - Desenvolver Testes
- Desenvolver testes que cubram no mínimo 35% das linhas e tenha no mínimo 9 funções escritas nas camadas da aplicação.

### 15 - Atualizar Venda
- Criar um endpoint acessível através de /sales/:id para atualizar uma venda no banco de dados.

### 16 - Desenvolver Testes
- Desenvolver testes que cubram no mínimo 40% das linhas e tenha no mínimo 10 funções escritas nas camadas da aplicação.

### 17 - Pesquisar Produtos
- Criar um endpoint acessível através de /products/search?q=searchTerm para buscar produtos por nome no banco de dados.

## Executando o Projeto

Para executar o projeto localmente, siga as instruções abaixo:

1. Clone este repositório.

2. Instale as dependências do projeto com o seguinte comando:
   ```shell
   npm install
   ```
   
3. Inicie o servidor com o comando:
   ```shell
   npm start
   ```
   
4. Acesse a API em http://localhost:PORT, substituindo PORT pela porta configurada.

## Testes

Para executar os testes do projeto, siga as instruções abaixo:

Certifique-se de que as dependências do projeto estejam instaladas.

Execute os testes com o seguinte comando:

  ```shell
   npm run test
   ```

<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto.
É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->
