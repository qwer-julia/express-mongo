import express from "express";
import conectaNoDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";

const conexao = await conectaNoDatabase();

conexao.on("error", (err) => {
  console.error("Erro de conexao: ", err);
});

conexao.once("open", () => {
  console.log("Conexao com o banco feita com sucesso");
});

const app = express();
routes(app);

 
app.use(manipuladorDeErros);

export default app;

