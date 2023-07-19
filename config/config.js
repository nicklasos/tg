import {config} from "dotenv";

config();

export default {
    open_api: {
        key: process.env.OPEN_API_KEY,
    },

    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },

    tg: {
        api_id: parseInt(process.env.API_ID, 10),
        api_hash: process.env.API_HASH,
    },
};