# Teste técnico Desenvolvedor Backend Bemobile.

# Objetivo
Estruturar uma API RESTful conectada a um banco de dados.Trata-se de um sistema que permite cadastrar usuários externos. Ao realizarem login, estes usuários deverão poder registrar clientes, produtos e vendas. Livros foram o produto escolhido para a construção da API.

---
# Links
* Deploy da API no vercel. A raíz redireciona para a documentação: https://caique-bemobile-api.vercel.app/

* Documentação OpenAPI interativa via Swagger UI: https://bemobile-api-docs.vercel.app/doc/

A especificação OpenAPI da aplicação se encontra em `resources/open_api_schema.yaml`.


## Principais Tecnologias usadas

* Node.js - v21.7.2;
* Docker - v26.0.0;
* Docker compose - v2;
* Adonis.Js;
* Typescript;
* Lucid(ORM);
* JWT(JSON Web Token);
* MySQL;


## Instalação

* Clone o repositório:
```bash
git clone git@github.com:caiquequaresmasilva/bemobile-backend-test.git
``` 

* Entre na pasta da API no repositório clonado e instale as dependências:

```bash
cd bemobile-backend-test
npm install
``` 
## Executando a aplicação

* Para rodar a aplicação corretamente, configure as variáveis de ambiente em um arquivo `.env`, com base no modelo do arquivo `.env.example`
```bash
TZ=UTC # Time Zone - deve ser mantido como UTC
PORT=3333 # Porta de execução da API
HOST=localhost # Host da API
LOG_LEVEL=info # Configuração do Logger
APP_KEY=JWT_SECRET # Secret do Token JWT. Pelo padrão do Adonis.Js, deve possuir no mínimo 16 caracteres
NODE_ENV=development # O ambiente NODE deve ser 'development'
DB_HOST=127.0.0.1 # Host do database MySQL
DB_PORT=3306 # Porta do database MySQL
DB_USER=root # Usuário do database MySQL
DB_PASSWORD=development # Senha do database MySQL
DB_DATABASE=api_development #Nome do database MySQL
``` 

Configure as variáveis para se conectar com um banco de dados `MySQL` de sua preferência, ou utilize o docker `MySQL` disponibilizado no projeto. Para tanto, instale o `Docker`e `Docker compose` nas versões indicadas acima, ou o `Docker Desktop`.

* Para usar o banco de dados dockerizado, rode os scripts:

```bash
npm run docker-dev:up # Sobe o banco de desenvolvimento. Espere alguns segundo para a próxima ação.
npm run set-db # executa migrations e seeder no banco de desenvolvimento.
``` 
* Para encerrar o container, execute:
```bash
npm run docker-dev:down # Encerra a execução do container de desenvolvimento.
``` 

---
### Esquema do banco de dados

![DATABASE](/images/database-schema.jpg)

---

* Em fim, para executar a API em modo desenvolvimento, execute:
```bash
npm run dev
``` 
---

## Endpoints
---
### Rotas de usuário

* `POST /usuarios`: Cria um novo usuário do sistema, caso seus dados sejam válidos. A senha deve conter pelo menos 8 caracteres, incluindo maiúscula, minúsculas e números:

   Request body:
  ```json
  {
    "email": "usuario.test@email.com",
    "senha": "senhaSENHA42"
  }
  ``` 
  
   Response body:
  ```json
  {
    "data": {
      "id": 1,
      "email": "usuario.test@email.com"
     }
  }
  ``` 
  HTTP STATUS: `201 CREATED`
---

 
* `POST /usuarios/login`: Caso os dados estejam corretos, loga um usuário e retorna um token de autenticação.;

   Request body:
  ```json
  {
    "email": "usuario.test@email.com",
    "senha": "senhaSENHA42"
  }
  ``` 

  Response body:
  ```json
  {
    "data": {
      "type": "Bearer",
      "token": "eyJhbGciOiJIUz..."
    }
  }
  ``` 
  HTTP STATUS: `200 OK`
  
---
---
### Rotas de livros

 
* `POST /livros`: Caso os dados estejam corretos, cria um novo livro no sistema. Requer bearer token de autenticação.

   Request body:
  ```json
  {
    "titulo": "As Crônicas de Gelo e Fogo",
    "subtitulo": "A Guerra dos Tronos",
    "autor": "George R. R. Martin",
    "preco": 76.16,
    "editora": "Suma",
    "idioma": "Português",
    "dimensoes": "23.0 x 15.4 x 3.0",
    "publicacao": "25-03-2019"
  }
  ``` 
  
  Response body:
  ```json
  {
    "data": {
      "id": 1,
      "titulo": "As Crônicas de Gelo e Fogo",
      "subtitulo": "A Guerra dos Tronos",
      "autor": "George R. R. Martin",
      "preco": 76.16
    }
  }
  ``` 
  HTTP STATUS: `201 CREATED`
 
* `PATCH /livros/{id}`: Caso os dados estejam corretos, edita o livro especificado. Nem todo os campos são obrigatórios. Requer token de autenticação
  
  Request body:
  ```json
  {
    "titulo": "As Crônicas de Gelo e Fogo",
    "subtitulo": "O Festim dos Corvos",
    "preco": 19.99
  }

  ``` 

  Response body:
  ```json
  {
      "data": {
        "id": 1,
        "titulo": "As Crônicas de Gelo e Fogo",
        "subtitulo": "O Festim dos Corvos",
        "autor": "George R. R. Martin",
        "preco": 19.99
    }
  }
  ``` 
  HTTP STATUS: `200 OK`
---
  
* `GET /livros`: Retorna lista de livros cadastrados resumidos. Requer autenticação.

  Response body:
  ```json
  
  {
    "data": [
      {
        "id": 1,
        "titulo": "As Crônicas de Gelo e Fogo",
        "subtitulo": "A Guerra dos Tronos",
        "autor": "George R. R. Martin",
        "preco": 76.16
      }
    ]
  }
  
  ``` 
  HTTP STATUS: `200 OK`
  
* `GET /livros/:id`: Retorna detalhes do livro especificado. Requer autenticação.
  
    Response body:
  ```json
  {
	  "data": {
		  "id": 1,
		  "titulo": "As Crônicas de Gelo e Fogo",
		  "subtitulo": "A Guerra dos Tronos",
		  "preco": 76.16,
		  "autor": "George R. R. Martin",
		  "dimensoes": "22.8 x 15.6 x 3.2",
		  "editora": "Suma",
		  "idioma": "Português",
		  "publicacao": "25-03-2019"
	  }
  }
  ``` 
  HTTP STATUS: `200 OK`
---
* `DELETE /livros/{id}`: Realiza a exclusão lógica do livro selecionado.

  HTTP STATUS: `204 NO CONTENT`
---
---
### Rotas de Clientes
---
* `POST /clientes`: Caso os dados sejam válidos, registra um novo cliente no sistema. Requer autenticação.

  Request Body
  ```json
  
  {
    "nome": "Caíque Quaresma Silva",
    "email": "caique.quaresma@gmail.com",
    "cpf": "12345678909",
    "logradouro": "Rua 15 de novembro",
    "bairro": "Vila Araguaia",
    "numero": "42",
    "complemento": "casa 2",
    "cidade": "São Paulo",
    "uf": "SP",
    "cep": "00032-180",
    "telefone": "11987581005"
   }
  ```

  Response Body
  ```json
  {
    "data": {
      "id": 1,
      "nome": "Caíque Quaresma Silva",
      "email": "caique.quaresma@gmail.com"
    }
   }
  
  ```
  HTTP STATUS: `201 CREATED`
---

* `PATCH /clientes/{id}`: Caso os dados sejam válidos, edita as informações de um cliente. A edição pode ocorrer em 4 categorias diferentes,opcionais: cliente; dados; endereco; cep. Requer autenticação

  Request Body
  ```json
  {
    "cliente": {
      "nome": "string",
      "email": "user@example.com"
    },
    "dados": {
      "cpf": "string",
      "telefone": "string"
    },
    "endereco": {
      "numero": "string",
      "complemento": "string"
    },
    "cep": {
      "logradouro": "string",
      "bairro": "string",
      "cidade": "string",
      "uf": "string",
      "cep": "string"
    }
  }
  ```

  Response Body
  ```json
  {
    "data": {
      "id": 1,
      "nome": "string",
      "email": "user@example.com",
      "cpf": "string",
      "logradouro": "string",
      "bairro": "string",
      "numero": "string",
      "complemento": "string",
      "cidade": "string",
      "uf": "string",
      "cep": "string",
      "telefone": "string"
    }
   }
  
  ```
  HTTP STATUS: `200 OK`
---

* `GET /clientes`: Retorna a lista resumida de clientes cadastrados. Requer autenticação.

  Response Body
  ```json
  {
    "data": [
      {
        "id": 1,
        "nome": "Caíque Quaresma Silva",
        "email": "caique.quaresma@gmail.com"
      }
    ]
  }
  
  ```
  HTTP STATUS: `200 OK`
---

* `GET /clientes/{id}`: Retorna os detalhes de um cliente específico. Requer autenticação

  Response Body
  ```json
  {
    "data": {
      "id": 1,
      "nome": "Caíque Quaresma Silva",
      "email": "caique.quaresma@gmail.com",
      "cpf": "12345678909",
      "logradouro": "Rua 15 de novembro",
      "bairro": "Vila Araguaia",
      "numero": "42",
      "complemento": "casa 2",
      "cidade": "São Paulo",
      "uf": "SP",
      "cep": "00032-180",
      "telefone": "11987581005"
    }
  }
  
  ```
  HTTP STATUS: `200 OK`
---

* `GET /clientes/{id}/vendas?mes={mes}&ano={ano}`: Retorna as vendas vinculadas a um cliente específico, com a possibilidade de filtragem pelo mês e ano das vendas. Requer autenticação.

  Response Body
  ```json
  {
    "data": [
      {
        "id": 1,
        "livro": {
          "id": 1,
          "titulo": "string",
          "subtitulo": "string",
          "autor": "string"
        },
        "precoUnitario": 9.99,
        "quantidade": 1,
        "precoTotal": 9.99,
        "data": "2024-04-15T01:22:28.698Z"
      }
    ]
  }
  
  ```
  HTTP STATUS: `200 OK`
---
---
### Rotas de vendas

* `POST /vendas`: Caso os dados sejam válidos, cria uma nova venda vinculada a um cliente e um livro especificado. Requer autenticação

  Request Body
  ```json
  {
    "clienteId": 1,
    "livroId": 1,
    "quantidade": 1
  }
  ```

  Response Body
  ```json
  {
    "data": {
      "id": 1,
      "quantidade": 1,
      "precoUnitario": 79.96,
      "precoTotal": 79.96,
      "clienteId": 1,
      "livroId": 1
    }
  }
  
  ```
  HTTP STATUS: `201 CREATED`
---
---

## Execução de testes

* Para executar os testes funcionais/integração com o banco de dados, utilize a configuração do arquivo `.env.test` disponibilizado. Para rodar o container com o database de testes, execute o script:
```bash
npm run docker-test:up
``````
---

* Para executar os testes funcionais, pode-se utilizar os seguintes comandos:
```bash
npm test functional # Executa todos os testes de integração
npm test functional -- --files nome_da_pasta/ # testes de uma pasta. EX: npm test functional --files livros/
npm test functional -- --files nome_da_pasta/função # testes de uma função específica. EX: npm test functional --files livros/index
```

* Para encerrar o database de teste, execute:
```bash
npm run docker-test:down
```
* `OBS:` Ao executar todos os testes de uma vez, existe um resultado variado. Hora todos os testes são aprovados, hora não. Acredito que seja alguma `Promise` perdida entre os Hooks das suites de testes, mas ainda não encontrei o problema exato. Mas a API se comporta como deveria ao realizar testes manuais.
---


