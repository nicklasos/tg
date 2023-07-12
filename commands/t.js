import db from "./../src/db.js";

await db('messages').insert({
    chat_id: '0',
    message: 'test',
});

await db.destroy();


