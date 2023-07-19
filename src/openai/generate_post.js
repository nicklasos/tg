import {getCryptoChannelIds} from "../tg/channels.js";

import {chat} from './openai.js';
import {arrayChunk} from "./../utils.js";
import {getMessagesByChannelIds} from "../messages.js";

let template = `
Ти експерт з криптовалют та телеграм каналів.
Результатом твоєї роботи буде огляд новин з різних джерел.
Твоя задача прочитати всі новини і зробити з них короткий витяг інформації.
Новини можуть містити рекламні повідомлення, або безмістовний текст, ти повинен ігнорувати такі новини,
зусередся на важливій інформації.

Розділитилем у нашій розмові слугуватимуть потрійні двійні кавички: """

Твоя відповідь повинна бути у форматі JSON:
"""
{
  "summary": "Строка, сюди треба помістити витяг ключової інформації"
}
"""

Мова відповіді має бути українською.
Мова новин, які я тобі надаватиму може бути українською, або російською.

Не видумуй самостійно новини і інформацію, користуйся тільки тим, що я тобі надам.

Ось новини:
"""
{post}
"""

Ось твої дії з цими новинами:

- Проаналізуй ці новини
- Якщо там є рекламний матеріал, то проігноруй його.
- Автори новин можуть додавати до новини якусь рекламну, або емоційну інформацію від себе,
намагайся визначити таку не суттєву інформацію і відкидай її.
- Ігноруй новини які роздають щось бескоштовно, різні airdrop та іншу рекламу
- Зроби короткий витяг з новин.
- Переведи результат своєї роботи на українську мову.
- Проаналізуй свою відповідь і пиши кожну окрему новину з нової строки.
- Дай мені відповідь у форматі JSON як я описував це раніше.
- Перевір свою відповідь у форматі JSON, це має бути правильний і валідний JSON,
якщо там є помилки в синтаксисі, то виправ їх.
`;

export async function generatePost() {
    let ids = getCryptoChannelIds();

    let summaries = [];

    let allMessages = (await getMessagesByChannelIds(ids)).map(
        msg => msg.message
    );

    let chunksMessages = arrayChunk(allMessages, 5);

    for (let chunk of chunksMessages) {

        let nextMessage = template
            .replaceAll('{post}', chunk.join("\n\n"));

        let result;

        try {
            result = await chat(nextMessage);
        } catch (e) {
            console.log(e.message);

            console.log('Result before error:', summaries.join("\n\n"));
            process.exit();
        }

        let resultSummary = JSON.parse(result).summary;

        if (resultSummary.length) {
            summaries.push(resultSummary);
        }

        console.log("\n\nMessage:\n", chunk.join("\n\n"));
        console.log("\n\nResult:\n", resultSummary);
    }

    console.log("\n\nResult summary:\n", summaries.join("\n\n"));
}
