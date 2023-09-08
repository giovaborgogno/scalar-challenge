import ChatBody from "@/components/Chat/ChatBody";
import ChatFooter from "@/components/Chat/ChatFooter";
import ChatHeader from "@/components/Chat/ChatHeader";
import { useSocket } from "@/contexts/SocketContext";
import IMessage from "@/interfaces/IMessage";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ChatProps {
  setOpen?: Dispatch<SetStateAction<boolean>>
}

function Chat({ setOpen }: ChatProps) {
  const { socket, roomUsers } = useSocket();
  const { data: session } = useSession();

  const [currentRoom, setCurrentRoom] = useState<string>("1")

  useEffect(() => {
    if (session) {
      if (roomUsers[currentRoom]?.includes(session?.user?.id)) return;
      const newMessage: IMessage = {
        text: session?.user?.firstName! + " joined the room.",
        socketId: "kurakani",
        roomId: currentRoom,
        name: '',
        userId: '',
        time: new Date().toString()
      }
      socket?.emit("send_message", newMessage);
      socket?.emit("join_room", currentRoom, session?.user?.id);
    }
    
  }, [currentRoom, session?.user?.id]);

  return (
    <div className="flex relative flex-col w-full h-screen sm:h-full">
      <div className="flex justify-end sm:hidden p-2">
        <ButtonClose onClick={() => setOpen!(false)} />
      </div>
      <ChatHeader currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} />
      <ChatBody roomId={currentRoom} />
      <ChatFooter roomId={currentRoom} />
    </div>
  );
}

export default Chat;
