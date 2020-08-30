const conn = require("../database/connecton");
const { request } = require("express");

module.exports = {
  // listar todos os dados do contratante
  async index(req, res) {
    const cpf = req.headers.authorization;

    const dados = await conn("contratantes").select("*").where("cpf", "=", cpf)
    return res.json(dados);
  }
};
