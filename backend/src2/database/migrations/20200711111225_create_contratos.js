
exports.up = function(knex) {
    return knex.schema.createTable("contratos", function (table) {
        table.increments("id").primary();
        table.date("data").notNullable();
        table.string("email").notNullable();
        table.string("status").notNullable();
        table.integer("avaliacao").notNullable();
        table.integer("contratante_id").notNullable();
        table.integer("servico_id").notNullable();
        table.integer("prestador_id").notNullable();

        table
          .foreign("contratante_id")
          .references("id")
          .inTable("contratantes");

        table
          .foreign("servico_id")
          .references("id")
          .inTable("servicos");
        table
          .foreign("prestador_id")
          .references("id")
          .inTable("prestadores");

        table.string("rua").notNullable();
        table.string("numero").notNullable();
        table.decimal("latitude").notNullable();
        table.decimal("longitude").notNullable();
        table.string("city").notNullable();
        table.string("uf", 2).notNullable();
      });
    };

exports.down = function(knex) {
    return knex.schema.dropTable("contratos");
  
};
