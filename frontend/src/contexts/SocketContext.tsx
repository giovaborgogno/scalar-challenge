"use client";
import IMessage from "@/interfaces/IMessage";
import ISocketContext from "@/interfaces/ISocketContext";
import { createContext, useContext, useEffect, useState } from "react";
import * as socketIO from "socket.io-client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getSocketUrl } from "./actions";

const intialData: ISocketContext = {
  socket: undefined,
  roomUsers: {},
  messages: {},
};

const SocketContext = createContext<ISocketContext>(intialData);

export function useSocket() {
  return useContext(SocketContext);
}

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [roomUsers, setRoomUsers] = useState({});
  const [socket, setSocket] = useState<socketIO.Socket>();
  const [messages, setMessages] = useState<{ [key: string]: IMessage[] }>({});

  const { data: session } = useSession()
  const router = useRouter();

  useEffect(() => {
    // if (session?.user?.group != 'Dimode' && session?.user?.group != 'Admin') {
    //   return;
    // }
    const startSocketConnection = async () => {
      const url = await getSocketUrl()
      let socket = socketIO.connect(url!);
      socket.on("set_messages", (data) => {
        setMessages(data.messages)

      });
      socket.on("receive_message", (data: IMessage) => {
        setMessages((prev) => {
          const newMessages = { ...prev };
          newMessages[data.roomId] = [...(newMessages[data.roomId] ?? []), data];
          return newMessages;
        });
      });
      socket.on("users_response", (data) => setRoomUsers(data));
      setSocket(socket);
    }
    startSocketConnection()
  }, []);

  return (
    <SocketContext.Provider value={{ socket, roomUsers, messages }}>
      {children}
    </SocketContext.Provider>
  );
}
