import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { type: mongoose.Schema.Types.String, required: [true, "O título do livro é obrigatório"] },
  editora: { type: mongoose.Schema.Types.String },
  preco: { type: mongoose.Schema.Types.Number },
  paginas: {
    type: mongoose.Schema.Types.Number,
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000;
      },
      message: "O numero de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
    }
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O(a) autor(a) é obrigatório"]
  },
}, {versionKey: false});

const livro = mongoose.model("livro", livroSchema);
export default livro;