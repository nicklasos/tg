import knex from "knex";
import config from "./../config/config.js";

const db = knex({
    client: 'mysql2',
    connection: {
        host : config.db.host,
        port : config.db.port,
        user : config.db.user,
        password : config.db.password,
        database : config.db.database,
    }
});

export default db;
