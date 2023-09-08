const { getMessages } = require("../db/client");

async function get_messages() {
    const messagesRoom1 = await getMessages('1');

    const messages = {
        '1': messagesRoom1,
    }

    return messages;
}
  module.exports = get_messages;
  