<h1> Livraria REST API </h1>
Este é um projeto de exemplo de uma API REST para gerenciar uma livraria, desenvolvido com Node.js durante um curso na Alura.

<h2> Visão Geral </h2>
Esta API permite gerenciar uma livraria com as seguintes funcionalidades:

- Listar todos os livros
- Obter detalhes de um livro específico
- Adicionar um novo livro
- Atualizar um livro existente
- Remover um livro
  
### Tecnologias Utilizadas
* Node.js
* Express
* MongoDB
* Mongoose

### Requisitos
- Node.js v14 ou superior
- MongoDB

<h3> Instalação </h3>
Clone este repositório para sua máquina local:

```
git clone https://github.com/seu-usuario/livraria-api.git
cd livraria-api
```

Instale as dependências do projeto:

```
npm install
```

Crie um arquivo .env na raiz do projeto e adicione a string de conexão do MongoDB:

```
MONGODB_URI = [sua conexão]
```
Inicie o servidor:

```
npm start
```
A API estará disponível em http://localhost:3000.

## Endpoints
### Listar todos os livros
URL: /livros

Método: GET

Resposta:

```
[
  {
        "_id": "667300a7b17f3d4276871dd1",
        "titulo": "Senhor dos Aneis: a Desolacao de Smaug",
        "editora": "Classicos",
        "preco": 10,
        "paginas": 200
    },
  ...
]
```
### Obter detalhes de um livro
URL: /livros/:id

Método: GET

Parâmetros URL:

id: ID do livro
Resposta:

```
{
    "_id": "667300a7b17f3d4276871dd1",
    "titulo": "Senhor dos Aneis: a Desolacao de Smaug",
    "editora": "Classicos",
    "preco": 10,
    "paginas": 200
}
```
### Adicionar um novo livro
URL: /livros

Método: POST

Corpo da Requisição:

```
{ 
    "titulo": "Senhor dos Aneis: a Desolacao de Smaug",
    "editora": "Classicos",
    "preco": 10,
    "paginas": 200,
    "autor": "66841176206edf5ba2fce893"
    
}
```
Resposta:

```
{
    "titulo": "Senhor dos aaaaAneis: a Desolacao de Smaug",
    "editora": "Classicos",
    "preco": 10,
    "paginas": 200,
    "autor": "66841176206edf5ba2fce893",
    "_id": "66b128df0e1af06c2988c243"
}
```

### Atualizar um livro existente
URL: /livros/:id

Método: PUT

Parâmetros URL:

id: ID do livro
Corpo da Requisição:

```
{ 
    "titulo": "Julinha: a Desolacao de Smaug",
    "editora": "Classicos",
    "preco": 10,
    "paginas": 20
}
```
Resposta:

```
{
    "message": "Livro atualizado com sucesso"
}
```

### Remover um livro
URL: /livros/:id

Método: DELETE

Parâmetros URL:

id: ID do livro
Resposta:

```
{
    "message": "Livro removido com sucesso"
}
```
