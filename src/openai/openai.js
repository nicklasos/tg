import { Configuration, OpenAIApi } from "openai";

import config from "./../../config/config.js";

const configuration = new Configuration({
    apiKey: config.open_api.key,
});

const openai = new OpenAIApi(configuration);

export async function chat(message) {
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: message}],
    });

    return chatCompletion.data.choices[0].message.content;
}
