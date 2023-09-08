import { useRoom } from "@/contexts/RoomContext";
import IRoom from "@/interfaces/IRoom";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import Avatar from "react-avatar";
import { ImExit } from "react-icons/im";

interface RoomCardProps {
  currentRoom: string;
  setCurrentRoom: Dispatch<SetStateAction<string>>;
  room: IRoom; 
  users: string[]
}

function RoomCard({ room, users, currentRoom, setCurrentRoom }: RoomCardProps) {
  const  roomId  = currentRoom;
  // const { myRooms, setMyRooms } = useRoom();
  return (
    <div
    style={{cursor:'pointer'}}
    onClick={()=>{setCurrentRoom(room.id)}}
      className={`flex group relative gap-3 items-center p-2 flex-col sm:flex-row w-full ${
        room.id === roomId ? "bg-gray-100 dark:bg-gray-800" : ""
      }`}
    >
      <div>
        
          <Avatar
            name={room.title}
            round={true}
            size="50"
            className="text-sm"
          />
  
      </div>
      <div className="hidden sm:block">
        <p className="font-medium line-clamp-1">{room.title}</p>
        <p className="text-sm text-slate-400">
          <span className="text-xs">🟢</span> {users.length} online
        </p>
      </div>
      {/* {room.id !== "1" && (
        <span
          className="hidden absolute right-3 justify-center items-center p-2 bg-red-500 rounded-full group-hover:flex hover:bg-red-700"
          onClick={() => {
            setMyRooms(myRooms.filter((r) => r.id != room.id));
          }}
        >
          <ImExit className="text-white" />
        </span>
      )} */}
    </div>
  );
}

export default RoomCard;
