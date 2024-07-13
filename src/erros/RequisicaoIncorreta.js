/* eslint-disable linebreak-style */
import Errobase from "./ErroBase.js";

class RequisicaoIncorreta extends Errobase {
  constructor(mensagem="Um ou mais dados fornecidos estao incorretos") {
    super(mensagem, 400);
  }
}

export default RequisicaoIncorreta;