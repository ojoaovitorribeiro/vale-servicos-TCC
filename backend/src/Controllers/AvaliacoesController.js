const conn = require("../database/connecton");
const { detalhe } = require("./PrestadoresController");

module.exports = {
  // criar avaliação
  async create(req, res) {
    const {
      nota,
      comentario,
      prestador_id,
      contratante_id,
      servprestado_id,
    } = req.body;
    const contratante = req.params;
    const [avaliacao] = await conn("avaliacoes").insert({
      nota,
      comentario,
      prestador_id,
      contratante_id,
      servprestado_id,
    });

    return res.json({ avaliacao });
  },

  // listar todas avaliações
  // async index (req, res) {
  //   const avaliacoes = await conn("avaliacoes").select('*');
  //   return res.json(avaliacoes)
  // },

  async index(request, response) {
    const avaliacoes = await conn("avaliacoes")
      .join("contratantes", "contratantes.id", "=", "avaliacoes.contratante_id")
      .select(["avaliacoes.*", "contratantes.nome"]);

    return response.json(avaliacoes);
  },
  async notas(req, res) {
    const { idserv } = req.params;

    const [count] = await conn("avaliacoes")
      .join("serv_prestado", "id", "=", "avaliacao.servprestado_id")
      .where("serv_prestado.id", "avaliacao.servprestado_id")
      .count();

    res.header("X-Total-Count", count["count(*)"]);
    return console.log(count);
  },

  //Editar avaliação
  async update(req, res) {
    const { id } = req.params;
    const { nota, comentario } = req.body;
    await conn("avaliacoes")
      .update({
        nota,
        comentario,
      })
      .where("id", "=", id);

    return res.json(req.body);
  },

  //excluir avaliação
  async delete(req, res) {
    const { id } = req.params;
    await conn("avaliacoes").delete("*").where("id", "=", id);
    return res.json("Avaliação deletada com sucesso!");
  },

  //listar avaliações de um serviço
  // async detalhe(req, res) {
  //   const servprestado_id = req.headers.authorization;

  //   const avaliacoes = await conn("avaliacoes")
  //     .where("servprestado_id", servprestado_id)
  //     .select("*");
  //   return res.json(avaliacoes);
  // },

  async detalhe(request, response) {
    const { page = 1 } = request.query;

    const servprestado_id = request.headers.authorization;
    const [count] = await conn("avaliacoes").count();

    const avaliacoes = await conn("avaliacoes")
      .where("servprestado_id", servprestado_id)
      .join("contratantes", "contratantes.id", "=", "avaliacoes.contratante_id")
      .select(["avaliacoes.*", "contratantes.nome"]);

    response.header("X-Total-Count", count["count(*)"]);

    return response.json(avaliacoes);
  },
};
