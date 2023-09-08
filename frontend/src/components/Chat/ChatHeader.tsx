"use client";
import { useRoom } from "@/contexts/RoomContext";
import React, { Dispatch, SetStateAction, useState } from "react";
import Popup from "@/shared/Chat/Popup";
import { useSocket } from "@/contexts/SocketContext";
import RoomCard from "../Room/RoomCard";
import IRoom from "@/interfaces/IRoom";

interface ChatHeaderProps {
  currentRoom: string;
  setCurrentRoom: Dispatch<SetStateAction<string>>
}

function ChatHeader({ currentRoom, setCurrentRoom }: ChatHeaderProps) {
  const { roomUsers } = useSocket();

  const { rooms, myRooms } = useRoom();
  // const room = rooms.concat(myRooms).find((room) => room.id === roomId);
  return (
    // <div className="basis-[7%] border-b-2 flex items-center justify-between p-3 font-medium">
    <div className="flex items-center justify-between">

      {/* <p className="text-xl">{room?.title}</p> */}
      {rooms.map((room: IRoom, index) => {
        return (
          <RoomCard 
          room={room} 
          users={roomUsers[room.id] ?? []} 
          key={index} 
          currentRoom={currentRoom} 
          setCurrentRoom={setCurrentRoom}/>
        );
      })}
    </div>
  );
}

export default ChatHeader;
