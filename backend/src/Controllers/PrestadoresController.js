const conn = require("../database/connecton");
const { request } = require("express");
const crypto = require("crypto");


module.exports = {
  // criar
  async create(req, res) {
    const {
      cpf,
      nome,
      img,
      email,
      senha,
      telefone,
      sobre,
      referencia,
      city,
      uf,
    } = req.body;


    await conn("prestadores").insert({
      cpf,
      nome,
      // img: req.file,
      // img: req.file,
      img,
      email,
      senha,
      telefone,
      sobre,
      referencia,
      city,
      uf,
    });

    return res.json(req.body);
   
  },

  // listar
  async index(req, res) {
    const users = await conn("prestadores").select("*");
    return res.json(users);
  },

  // listar por id
  async detalhe(req, res) {
    const { id } = req.params;
    const user = await conn("prestadores").select("*").where("id", "=", id);
    const serializesPrests = user.map((user) => {
      return {
        ...user,
        image_url: `http://192.168.42.110:3333/uploads/${user.img}`,
      };
    });
    return res.json(serializesPrests);
  },

  //editar
  async update(req, res) {
    const { cpf } = req.params;

    const {
      nome,
      // img,
      email,
      senha,
      telefone,
      sobre,
      referencia,
      city,
      uf,
    } = req.body;
    await conn("prestadores")
      .update({
        nome,
        img: req.file.filename,
        email,
        senha,
        telefone,
        sobre,
        referencia,
        city,
        uf,
      })
      .where("cpf", "=", cpf);

    return res.json(req.body);
  },

  //excluir
  async delete(req, res) {
    const { id } = req.params;
    await conn("prestadores").delete("*").where("id", "=", id);
    await conn("serv_prestado").delete("*").where("prestador_id", "=", id);
    return res.json("Usuário deletado com sucesso!");
  },

  //listar os serviços do preestador
  async show(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;

    const prestador = await conn("servicos").where("id", id).first();

    if (!prestador) {
      return res.status(400).json({ message: "prestador not found..." });
    }

    const [count] = await conn("serv_prestado")
      .join("prestadores", "serv_prestado.prestador_id", "=", "prestadores.id")
      // .limit(5)
      // .offset((page - 1) * 5)
      .where("prestadores.id", id)
      .count();

    const seervP = await conn("prestadores")
      .join(
        "serv_prestado",
        "prestadores.id",
        "=",
        "serv_prestado.prestador_id"
      )
      // .limit(5)
      // .offset((page - 1) * 5)
      .where("serv_prestado.prestador_id", id);

    const serv = await conn("servicos")
      .join("serv_prestado", "servicos.id", "=", "serv_prestado.servico_id")
      .where("serv_prestado.servico_id", seervP.id);

    const serializedServico = serv.map((servico) => {
      return {
        name: serv.name,
        info: serv.info,
      };
    });

    const serializedServPrest = seervP.map((serviPrestado) => {
      return {
        descricao: serviPrestado.descricao,
        img_url: serviPrestado.img_url,
      };
    });
    res.header("X-Total-Count", count["count(*)"]);

    return res.json({ servico: serializedServico, serializedServPrest });
  },
};