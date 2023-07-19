import db from "./../src/db.js";

export async function saveMessage(chatId, message) {
    return db('messages').insert({
        chat_id: chatId,
        message,
    });
}

/**
 * @param channelIds
 * @returns {Promise<array>}
 */
export async function getMessagesByChannelIds(channelIds) {
    return db('messages').whereIn('chat_id', channelIds);
}