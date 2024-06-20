import express from "express";
import conectaNoDatabase from "./config/dbConnect.js";
import livro from "./models/Livro.js";
import LivroController from "./controllers/livroController.js";

const conexao = await conectaNoDatabase();

conexao.on("error", (err) => {
    console.error("Erro de conexao: ", err)
});

conexao.once("open", () => {
    console.log("Conexao com o banco feita com sucesso")
})

const app = express();
app.use(express.json());


app.get("/", (req,res) => {
    res.status(200).send("Curso de Node.js")
});

app.get("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
});

app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200)
     .set('Content-Type', 'application/json')
     .json(livros);
})

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).json(livros);
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send("Livro cadastrado com sucesso!");
});

export default app;

