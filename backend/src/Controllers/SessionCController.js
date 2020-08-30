const conn = require("../database/connecton");

module.exports = {
  // criar sessao
  async create(req, res) {
    const { email, senha } = req.body;

    const user = await conn("contratantes")
      .where("email", email)
      .where("senha", senha)
      .select("*")
      .first();

    if (!user) {
      return res.status(400).json({ error: 'Não foi encontrado contratante com estes dados' });
    }
    return res.json(user);

  },
};
