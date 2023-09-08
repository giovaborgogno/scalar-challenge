const { connectToDB } = require('./conn');

async function insertMessage(message, roomID) {
  const db = await connectToDB();
  const roomCollection = db.collection(`room_${roomID}`);
  
  try {
    await roomCollection.insertOne(message);
    console.log("Message inserted:", message);
  } catch (error) {
    console.error("Error inserting message:", error);
    throw error;
  }
}

async function getMessages(roomID) {
  const db = await connectToDB();
  const roomCollection = db.collection(`room_${roomID}`);
  
  try {
    const messages = await roomCollection.find().toArray();
    return messages;
  } catch (error) {
    console.error("Error getting messages:", error);
    throw error;
  }
}

module.exports = { insertMessage, getMessages };
