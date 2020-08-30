
exports.up = function(knex) {
    return knex.schema.createTable("servicos", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("info").notNullable();
    table.string("img").notNullable();
})
};
exports.down = function(knex) {
    return knex.schema.dropTable("servicos");
  };
