import db from "./../src/db.js";

export async function saveMessage(chatId, message) {
    return db('messages').insert({
        chat_id: chatId,
        message,
    });
}

/**
 * @param channelIds
 * @param date
 * @returns {Promise<array>}
 */
export async function getMessagesByChannelIds(channelIds, date) {
    return db('messages')
        .whereIn('chat_id', channelIds)
        .where('created_at', '>=', date);
}