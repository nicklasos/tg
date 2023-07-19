import {generatePost} from "../src/openai/generate_post.js";

import db from "./../src/db.js";

try {
    await generatePost();
} catch (e) {
    console.error(e);
} finally {
    await db.destroy();
}
