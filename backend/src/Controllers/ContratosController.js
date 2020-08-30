const conn = require('../database/connecton');

module.exports = {
    // criar
    async create(req, res) {
        const { 
            data,
            email,
            contratante_id,
            servico_id,
            prestador_id,
            rua,
            numero,
            latitude,
            longitude,
            city,
            uf,
        } = req.body;
        await conn("contratos").insert({
            cpf,
            nome,
            email,
            senha,
            telefone,
            city,
            uf
        })
        
        return res.json(req.body)  
},
// listar
    async index (req, res) {
        const users = await conn("contratos").select('*');
        return res.json(users)
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
    await conn("contratos").update({
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
    await conn("contratos").delete('*').where("id", id);
    return res.json("Usuário deletado com sucesso!")
},
}