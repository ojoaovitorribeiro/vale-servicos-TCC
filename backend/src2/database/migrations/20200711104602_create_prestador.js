
exports.up = function(knex) {
  return  knex.schema.createTable("prestadores", function (table) {
        table.increments("id").primary();
        table.string("cpf", 11).unique().notNullable();
        table.string("nome").notNullable();
        table.string("img").notNullable();
        table.string("email").unique().notNullable();
        table.string("senha").notNullable();
        table.string("telefone").notNullable();
        table.string("sobre").notNullable();
        table.string("referencia").notNullable();
        table.string("city").notNullable();
        table.string("uf", 2).notNullable();
      });
};

exports.down = function(knex) {
   return knex.schema.dropTable("prestadores");
};