import { useSocket } from "@/contexts/SocketContext";
import React, { useRef, useState } from "react";
import { AiFillPlusCircle, AiFillLike } from "react-icons/ai";
import { BsImage, BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import IMessage from "@/interfaces/IMessage";
import { useSession } from "next-auth/react";

function ChatFooter({ roomId }: { roomId: string }) {
  const [message, setMessage] = useState<string>("");
  const { socket } = useSocket();
  const { data: session } = useSession();
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const inputRef = useRef<any | null>(null);

  const onEmojiPick = (emojiObj: any) => {
    setMessage((prevInput) => prevInput + emojiObj.emoji);
    inputRef.current.focus();
    setShowEmojiPicker(false);
  };

  const handleSendMessage = (e: any, message: string) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: IMessage = {
        text: message,
        userId: session?.user?.id!,
        name: session?.user?.firstName!,
        time: new Date().toString(),
        socketId: socket?.id ?? '',
        roomId: roomId,
      }
      socket?.emit("send_message", newMessage);
    }
    setMessage("");
  };

  const handleTyping = () => {
    socket?.emit("typing", message ? session?.user?.firstName! + " is typing ..." : "");
  };

  return (
    <>{
      session?
      <div className="w-full basis-[8%] border-t-2 p-2 flex items-center gap-4">

      <div className="relative w-full ">
        <div className="absolute -right-8 sm:right-0 bottom-12 ">
          {showEmojiPicker && (
            <Picker
              onEmojiClick={onEmojiPick}
              previewConfig={{ showPreview: false }}
            />
          )}
        </div>
        <BsEmojiSmileFill
          size={20}
          className="cursor-pointer absolute top-[6px] right-2 text-primary"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        />

        <form onSubmit={(e) => handleSendMessage(e, message)}>
          <input
            ref={inputRef}
            type="text"
            value={message}
            className="w-full h-8 p-2 transition-all bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none"
            placeholder="Aa"
            onKeyUp={handleTyping}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </form>
      </div>
      {message.length === 0 ? (
        <AiFillLike
          size={28}
          className="cursor-pointer text-primary"
          onClick={(e) => handleSendMessage(e, "👍")}
        />
      ) : (
        <IoMdSend
          size={28}
          className="cursor-pointer text-primary"
          onClick={(e) => handleSendMessage(e, message)}
        />
      )}
    </div>
      :
<div className="w-full basis-[8%] border-t-2 p-2 flex items-center gap-4">

<div className="relative w-full ">
        <BsEmojiSmileFill
          size={20}
          className="cursor-pointer absolute top-[6px] right-2 text-primary"
        />

        <form onSubmit={(e) => handleSendMessage(e, message)}>
          <input
            ref={inputRef}
            disabled
            type="text"
            value={message}
            className="w-full h-8 p-2 transition-all bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none"
            placeholder="Login to join the chat!"
            onKeyUp={handleTyping}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </form>
      </div>
</div>
    }
    </>
    
  );
}

export default ChatFooter;
