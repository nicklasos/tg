import db from "./../src/db.js";

export async function saveMessage(chatId, message) {
    return db('messages').insert({
        chat_id: chatId,
        message,
    });
}