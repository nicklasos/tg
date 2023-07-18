import {saveMessages} from "../src/save_messages.js";
import {saveMessage} from "../src/messages.js";
import * as fs from "fs";

await saveMessages(async event => {
    let message = event.message;

    // console.dir(event, {depth: null});
    // console.log(message);
    // console.log(event.message);

    // fs.writeFile('messages.txt', JSON.stringify(event.message) + "\n", { flag: "a+" }, (err) => {
    //     if (err) console.error(err);
    // });

    if (message.hasOwnProperty('peerId') && message.peerId.hasOwnProperty('channelId')) {
        console.log(message.peerId.channelId, message.text);
        await saveMessage(message.peerId.channelId, message.text);
    }
});