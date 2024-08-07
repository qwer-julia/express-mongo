import {livros} from "../models/index.js";
import NaoEncontrado from "../erros/NaoEcontrado.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();
    
      res.status(200).json(livrosResultado);
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
      const busca = processaBusca(req.query);
      const livrosResultado = await livros.find(busca);
      
      if (livrosResultado !== null) {
        res.status(200).send(livrosResultado);
      } else {
        next(new NaoEncontrado("Livro não encontrado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  
};

function processaBusca(parametros){
  const { editora, titulo, minPaginas, maxPaginas } = parametros;

  const busca = {};

  if (editora) busca.editora = {$regex: titulo, $options: "i"};
  if (titulo) busca.titulo = {$regex: titulo, $options: "i"};
  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  // gte = Greater Than or Equal
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  // lte = Less Than or Equal
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  return busca;
}

export default LivroController;
