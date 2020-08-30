const conn = require("../database/connecton");
const { request } = require("express");
const { index, show } = require("./PrestadoresController");
const { servs } = require("./ProfileController");

module.exports = {
  // criar serivco prestado
  async create(req, res) {
    const { descricao, img_url, servico_id, prestador_id } = req.body;
    const prestador = req.params;
    const [serv] = await conn("serv_prestado").insert({
      descricao,
      img_url,
      prestador_id,
      servico_id,
    });

    return res.json({ serv });
  },

  //Editar serviço
  async update(req, res) {
    const { id } = req.params;

    const {
      descricao,
      img_url,
    } = req.body;
    await conn("serv_prestado")
      .update({
        descricao,
        img_url
      })
      .where("id", "=", id);

    return res.json(req.body);
  },
// listar todos os serviços de um prestador
    async list(req, res) {
    const prestador_id = req.headers.authorization;

    const serv_prestado = await conn("serv_prestado")
      .where("prestador_id", prestador_id)
      .select("*");
    return res.json(serv_prestado);
  },
  
  async detalhe(request, response){

    const prestador_id = request.headers.authorization;
  
    const serv_prestado = await conn('serv_prestado')
   .where("prestador_id", prestador_id)
   .join(
    "prestadores",
    "prestadores.id",
    "=",
    "serv_prestado.prestador_id"
  )
  .join(
    "servicos",
    "servicos.id",
    "=",
    "serv_prestado.servico_id"
  )
  .select(['serv_prestado.*', 
    'prestadores.nome',
    'servicos.name'
  ]);
  
    return response.json(serv_prestado);
  },

  // listar todos do servicos do prestador
  async index(req, res) {
    const servicos = await conn("serv_prestado").select("*");
    return res.json(servicos);
  },


  // apagar servico prestado
  async delete(req, res) {
    const { id } = req.params;
    const prestador_id = req.headers.authorization;
    const serv = await conn("serv_prestado")
      .where(`id`, id)
      .select("prestador_id")
      .first();

    if (serv.prestador_id != prestador_id) {
      return res.status(401).json({ error: "opereção não permitida" });
    }

    await conn("serv_prestado").where("id", id).delete();

    return res.status(204).send();
  },


  //listar um prestadores do serviço
  async show(req, res) {
    const { id } = req.params;
    // const { page = 1 } = req.query;

    const [count] = await conn("prestadores")
      .join(
        "serv_prestado",
        "prestadores.id",
        "=",
        "serv_prestado.prestador_id"
      )
      .where("serv_prestado.servico_id", id)
      .count();

    const prestadorS = await conn("prestadores")
      .join(
        "serv_prestado",
        "prestadores.id",
        "=",
        "serv_prestado.prestador_id"
      )
      // .limit(100)
      // .offset((page - 1) * 5)
      .where("serv_prestado.servico_id", id)
      .select("*");

    res.header("X-Total-Count", count["count(*)"]);
      
    return res.json(prestadorS);

    const serializedPrestador = prestadorS.map((prestador) => {
      return {
        nome: prestador.nome,
        telefone: prestador.telefone,
        sobre: prestador.sobre,
      };
    });
    res.header("X-Total-Count", count["count(*)"]);

    return res.json({ servico: serializedServico, serializedPrestador });
  },
};