
exports.up = function(knex) {
    return knex.schema.createTable("contratantes", function (table){
        table.increments("id").primary();
        table.string("cpf").notNullable();
        table.string("nome").notNullable();
        table.string("email").notNullable();
        table.string("senha").notNullable();
        table.string("telefone").notNullable();
        table.string("city").notNullable();
        table.string("uf", 2).notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.createTable("contratantes")
  
};
