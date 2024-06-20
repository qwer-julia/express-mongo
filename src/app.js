import express from "express";
import conectaNoDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js"

const conexao = await conectaNoDatabase();

conexao.on("error", (err) => {
    console.error("Erro de conexao: ", err)
});

conexao.once("open", () => {
    console.log("Conexao com o banco feita com sucesso")
})

const app = express();
routes(app);

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

export default app;

