import knex from "knex";
import {config} from "dotenv";

config();

const db = knex({
    client: 'mysql',
    connection: {
        host : process.env.DB_HOST,
        port : process.env.DB_PORT,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_Name,
    }
});

export default db;
