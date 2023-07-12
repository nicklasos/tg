import {TelegramClient} from "telegram";
import {StoreSession} from "telegram/sessions/index.js";
import {NewMessage} from "telegram/events/index.js";
import input from "input";
import {config} from "dotenv";

config();

const apiId = parseInt(process.env.API_ID, 10);
const apiHash = process.env.API_HASH;

const stringSession = new StoreSession("tg_chat_session");

export async function saveMessages(handler) {
    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });

    try {
        await client.start({});
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

    client.addEventHandler(handler, new NewMessage({}));
}
