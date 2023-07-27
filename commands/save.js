import {saveMessages} from "../src/save_messages.js";
import {saveMessage} from "../src/messages.js";

await saveMessages(async event => {
    let message = event.message;

    if (
        message.hasOwnProperty('peerId') &&
        message.peerId.hasOwnProperty('channelId') &&
        message.text.length > 20
    ) {
        console.log(message.peerId.channelId.toString(), message.text);
        await saveMessage(message.peerId.channelId.toString(), message.text);
    }
});