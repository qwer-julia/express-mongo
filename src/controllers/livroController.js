import {autores, livros} from "../models/index.js";
import NaoEncontrado from "../erros/NaoEcontrado.js";
class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();
      req.resultado = buscaLivros;
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultados !== null) {
        res.status(200).send(livroResultados);
      } else {
        next(new NaoEncontrado("Id do Livro não localizado"));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findByIdAndUpdate(id, {$set: req.body});
      
      if (livroResultados !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Livro não localizado"));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static deletarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findByIdAndDelete(id);

      if (livroResultados !== null) {
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Livro não localizado"));
      }
      
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livroRecebido = new livros(req.body);

      const livroResultado = await livroRecebido.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca) {
        const livrosResultado = livros
          .find(busca)
          .populate("autor");
        req.resultado = livrosResultado;
        next();
      } else{
        res.status(200).send([]);  
      }
    } catch (erro) {
      next(erro);
    }
  };

  
};

async function processaBusca(parametros){
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor} = parametros;
  let busca = {};

  if (editora) busca.editora = {$regex: editora, $options: "i"};
  if (titulo) busca.titulo = {$regex: titulo, $options: "i"};
  if (minPaginas || maxPaginas) busca.paginas = {};

  // gte = Greater Than or Equal
  if (minPaginas) busca.paginas.$gte = minPaginas;
  // lte = Less Than or Equal
  if (maxPaginas) busca.paginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({nome: nomeAutor});
    autor?._id ? busca.autor = autor._id : busca.autor = null;
  }

  return busca;
}

export default LivroController;
