const conn = require('../database/connecton');

module.exports = {
    // criar
    async create(req, res) {
        const { 
            cpf,
            nome,
            email,
            senha,
            telefone,
            city,
            uf
        } = req.body;

        await conn("contratantes").insert({
            cpf,
            nome,
            email,
            senha,
            telefone,
            city,
            uf: 'MS'
        })
        
        return res.json(req.body)  
},
// listar todos
async index (req, res) {
    const users = await conn("contratantes").select('*');
    return res.json(users)
},
// listar por id
async detalhe(req, res) {
    const { id } = req.params;
    const user = await conn("contratantes").select('*').where("id", "=", id);
    return res.json(user)
},
    
//editar
async update (req, res) {
    const { id } = req.params;

    const { 
        nome,
        email,
        senha,
        telefone,
        city,
        uf
    } = req.body;
    await conn("contratantes").update({
        nome,
        email,
        senha,
        telefone,
        city,
        uf
    }).where("id", "=", id);
    
    return res.json(req.body)  
},

//excluir
async delete (req, res){
    const { id } = req.params;
    await conn("contratantes").delete('*').where("id", "=", id);
    return res.json("Usuário deletado com sucesso!")
},
}