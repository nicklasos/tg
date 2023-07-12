import {saveMessages} from "../src/save_messages.js";
import {saveMessage} from "../src/messages.js";

await saveMessages(async event => {
    let message = event.message;

    console.log(message.senderId.toString(), message.text);

    await saveMessage(message.senderId.toString(), message.text);
});