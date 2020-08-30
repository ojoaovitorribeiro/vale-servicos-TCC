const conn = require("../database/connecton");
const { request } = require("express");
const { index, show } = require("./PrestadoresController");

module.exports = {
  // listar todos os dados de um prestador especifico
  async index(req, res) {
    const cpf = req.headers.authorization;
    const dados = await conn("prestadores").select("*").where("prestadores.cpf",  cpf)
    
      
    return res.json(dados);
  },

  // listar todos os servicos de um prestador especifico
  async detalhe(req, res) {
    const prestador_id = req.headers.authorization;

    // if(serv.prestador_id != prestador_id){
    //     return res.status(401).json({error: "opercao nao permitida"})
    // }

    const servicos = await conn("serv_prestado")
      .where("prestador_id", prestador_id)
      .select("*");
    return res.json(servicos);
  },
};
