"use client";
import { useSocket } from "@/contexts/SocketContext";
import IMessage from "@/interfaces/IMessage";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";

function ChatBody({ roomId }: { roomId: string }) {
  const [typing, setTyping] = useState<string>("");
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { messages, socket } = useSocket();
  const { data: session } = useSession();

  useEffect(() => {

    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    scrollTo(0,0)
  }, [messages, roomId]);

  useEffect(() => {
    socket?.on("typing_response", (data) => {
      setTyping(data);
    });
  }, []);

  return (
    <div className="basis-[85%] overflow-y-scroll p-5 w-full flex flex-col gap-2" >
      {messages[roomId]?.map((message: IMessage, index: number) =>
        message.socketId === "kurakani" ? (
          <div className="flex self-center" key={index}>
            <div className="flex justify-center items-center">
              <p>{message.text}</p>
            </div>
          </div>
        ) : message.userId === session?.user?.id ? (
          <div className="flex self-end" key={index}>
            <div className="flex justify-center items-center px-3 py-1 text-white rounded-full rounded-br-none bg-green-500 ">
              <p className="font-sans">{message.text}</p>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 self-start" key={index}>
            <div className="self-center">
              <Avatar
                name={`${message.name}__ID:${message.userId}` }
                // src={`${process.env.NEXT_PUBLIC_APP_API_URL}${session?.user.photo}`}
                round={true}
                size="30"
                className="text-sm"
              />
            </div>
            <div>
              <p className="pl-2 text-sm font-semibold align-bottom">{message.name}</p>
              <div className="flex justify-center items-center px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full rounded-tl-none">
                <p className="font-sans">{message.text}</p>
              </div>
              <p className="py-2 pl-2 text-xs font-light">
                {new Date(message.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        )
      )}
      <div ref={lastMessageRef} className="mt-auto text-slate-500">
        {typing}
      </div>
    </div>
  );
}

export default ChatBody;
