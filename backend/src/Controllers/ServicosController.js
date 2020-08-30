const conn = require("../database/connecton");

module.exports = {
  async create(req, res) {
    const { name, info, img } = req.body;
    await conn("servicos").insert({
      name,
      info,
      img,
    });

    return res.json(req.body);
  },

  // listar SERVICOS
  async index(req, res) {
    const servicos = await conn("servicos").select("*");
    const serializedServicos = servicos.map((servico) => {
      return {
        ...servico,
        image_url: `http://192.168.1.8:3333/uploadsServs/${servico.img}`,
      };
    });
    return res.json(serializedServicos);
  },
  async indexId(req, res) {
    const { id } = req.params;

    const servicos = await conn("servicos").select("*").where("id", "=", id);
    const serializedServicos = servicos.map((servico) => {
      return {
        ...servico,
        // image_url: `http://192.168.1.8:3333/uploadsServs/${servico.img}`,
      };
    });
    return res.json(serializedServicos);
  },

  //editar
  async update(req, res) {
    const { id } = req.params;

    const { name, info, img } = req.body;
    await conn("servicos")
      .update({
        name,
        info,
        img,
      })
      .where("id", "=", id);

    return res.json(req.body);
  },
};
