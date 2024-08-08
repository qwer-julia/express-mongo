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
routes.get("/autores", AutorController.listarAutores, paginar);
routes.post("/autores", AutorController.cadastrarAutor);
routes.get("/autores/:id", AutorController.listarAutorPorId);
routes.put("/autores/:id", AutorController.atualizarAutor);
routes.delete("/autores/:id", AutorController.deletarAutor);

### Autores
#### Listar todos os autores
URL: /autores

Método: GET

##### Parâmetros de Consulta (Query Parameters):

pagina (opcional): Número da página para paginação (padrão: 1).
limite (opcional): Número de resultados por página (padrão: 5).
ordenacao (opcional): Ordena a exibição dos livros (padrão: _id crescente). Exemplos: [_id:1, _id:-1, nomeAutor:1]

Resposta:

```
[
    {
        "_id": "66b4b5123bb8de152f7d593d",
        "nome": "Julia"
    },
  ...
]
```

#### Obter detalhes de um autor
URL: /autores/:id

Método: GET

Parâmetros URL:
id: ID do autor

Resposta:

```
[
    {
    "nome": "Julinha",
    "nacionalidade": "Brasileira",
    "_id": "66b5145034c3f4221ac540b4"
    }
]
```

#### Adicionar um novo autor
URL: /autores

Método: POST

Corpo da Requisição:
```
{
    "nome": "Julinha",
    "nacionalidade": "Brasileira"
}
```

Resposta:
```
[
    {
    "nome": "Julinha",
    "nacionalidade": "Brasileira",
    "_id": "66b5145034c3f4221ac540b4"
    }
]
```
#### Atualizar um autor existente
URL: /autores/:id

Método: PUT

Parâmetros URL:

id: ID do autor
Corpo da Requisição:
```
{
    "nome": "Julinha 2",
}
```

Resposta:
```
{
    "nome": "Julinha 2",
    "nacionalidade": "Brasileira",
    "_id": "66b5145034c3f4221ac540b4"
}
```

#### Remover um livro
URL: /autores/:id

Método: DELETE

Parâmetros URL:

id: ID do autor
Resposta:

```
{
    "message": "Autor removido com sucesso"
}
```


### Livros

#### Listar todos os livros
URL: /livros

Método: GET

##### Parâmetros de Consulta (Query Parameters):

pagina (opcional): Número da página para paginação (padrão: 1).
limite (opcional): Número de resultados por página (padrão: 5).
ordenacao (opcional): Ordena a exibição dos livros (padrão: _id crescente). Exemplos: [_id:1, _id:-1, nomeAutor:1]

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

#### Buscar livro com filtro
URL: /livros/busca

Método: GET

##### Parâmetros de Consulta (Query Parameters):

pagina (opcional): Número da página para paginação (padrão: 1).
limite (opcional): Número de resultados por página (padrão: 5).
ordenacao (opcional): Ordena a exibição dos livros (padrão: _id crescente). Exemplos: [_id:1, _id:-1, nomeAutor:1]
nomeAutor (opcional): Filtra os livros pelo autor.
editora (opcional): Filtra os livros pela editora.
minPaginas (opcional): Filtra os livros pela quantidade mínima de páginas.
maxPaginas (opcional): Filtra os livros pela quantidade máxima de páginas.

##### Exemplo de requisição
```
GET /livros/busca?page=2&limit=5&editora=Classicos
```

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

#### Obter detalhes de um livro
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
#### Adicionar um novo livro
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

#### Atualizar um livro existente
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

#### Remover um livro
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
