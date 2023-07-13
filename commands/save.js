import {saveMessages} from "../src/save_messages.js";
import {saveMessage} from "../src/messages.js";

await saveMessages(async event => {
    let message = event.message;

    if (message.hasOwnProperty('senderId')) {
        console.log(message.senderId.toString(), message.text);
        await saveMessage(message.senderId.toString(), message.text);
    } else {
        console.log('Info: no senderId', message);
    }
});