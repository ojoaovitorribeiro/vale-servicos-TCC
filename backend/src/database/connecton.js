const knex = require('knex');
const config = require("../../knexfile");

const con = knex(config.development);
module.exports = con;