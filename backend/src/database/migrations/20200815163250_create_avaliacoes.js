exports.up = function (knex) {
    return knex.schema.createTable("avaliacoes", function (table) {
        table.increments("id").primary();

        table.string("nota").notNullable();
        table.string("comentario").notNullable();
        
        table.string("prestador_id").notNullable();
        table.string("contratante_id").notNullable();
        table.string("servprestado_id").notNullable();

        table.foreign('prestador_id').references('id').inTable("prestadores");
        table.foreign('contratante_id').references('id').inTable("contratantes");
        table.foreign("servprestado_id").references("id").inTable("serv_prestado")
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("avaliacoes");

};