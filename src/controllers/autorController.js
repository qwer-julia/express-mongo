import { autor } from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await autor.find();
    
      res.status(200).json(autoresResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autor.findById(id);

      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        res.status(404).send({message: "Id do Autor não localizado."});
      }
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      await autor.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send({message: "Autor atualizado com sucesso"});
    } catch (erro) {
      next(erro);
    }
  };

  static deletarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      await autor.findByIdAndDelete(id);

      res.status(200).send({message: "Autor removido com sucesso"});
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autor(req.body);

      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };
};

export default AutorController;
