import {TelegramClient} from "telegram";
import {StoreSession} from "telegram/sessions/index.js";
import {NewMessage} from "telegram/events/index.js";
import input from "input";

const apiId = 29429489;
const apiHash = "e4d483c87651cb3b5a313296f92be1b3";
const stringSession = new StoreSession("tg_chat_session");

console.log("Loading interactive example...");
const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
});

try {
    await client.start();
} catch (e) {
    if (e.message.includes('BotToken is required')) {
        await client.start({
            phoneNumber: async () => await input.text("Number:"),
            password: async () => await input.text("Password:"),
            phoneCode: async () => await input.text("Code:"),
        });
    } else {
        console.error(e);
        process.exit();
    }
}

console.log("You should now be connected.");
client.session.save();
stringSession.save();

async function handler(event) {
    let message = event.message;
    console.log(message.senderId.toString(), 'message text: ', message.text);
}

client.addEventHandler(handler, new NewMessage({}));

// const result = await client.invoke(
//     new Api.channels.GetFullChannel({
//         channel: "liganet",
//     })
// );
//
// console.dir(result, {depth: null});