export default interface IMessage {
  socketId: string; 
  userId: string; // user-id for message, room-id for new user joined the room
  name: string; 
  roomId: string;
  time: string;
  text?: string;
  photo?: any;
  video?: any;
}
