"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import RoomCard from "./RoomCard";
import IRoom from "@/interfaces/IRoom";
import { useRoom } from "@/contexts/RoomContext";
import { useSocket } from "@/contexts/SocketContext";

interface RoomSideBarProps {
  currentRoom: string;
  setCurrentRoom: Dispatch<SetStateAction<string>>
}

function RoomSideBar({currentRoom, setCurrentRoom}: RoomSideBarProps) {
  const { rooms, myRooms } = useRoom();
  const { roomUsers } = useSocket();


  return (
    <div className="overflow-y-scroll w-20 h-screen sm:h-full border-r-2 sm:w-1/4">
      <p className="px-2 py-5 sm:px-5 h-[56px] text-xl sm:text-2xl font-semibold">Rooms</p>
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

export default RoomSideBar;
