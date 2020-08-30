
exports.up = function(knex) {
    return knex.schema.createTable("serv_prestado", function (table) {
        table.increments("id").primary();

        table.string("img_url").notNullable();
        table.string("descricao").notNullable();
        table.string("prestador_id").notNullable();
        table.string("servico_id").notNullable();

        table.foreign('prestador_id').references('id').inTable("prestadores");
        table.foreign("servico_id").references("id").inTable("servicos")
           })
          };

exports.down = function(knex) {
    return knex.schema.dropTable("serv_prestado");
};
