'use client'
import FloatingButton from "@/components/Chat/FloatingButton";
import Chat from "@/components/Chat/Chat";
import { useState } from "react";

export default function ChatSection() {

    const [open, setOpen] = useState<boolean>(false)


    return (
        <>
            <div className="flex h-screen sm:h-160 hidden sm:block">

                <Chat />

            </div>

            {/* {
                open ? 
                <div className="fixed top-0 left-0 h-screen z-30 bg-white dark:bg-gray-800 w-full">
                <div className="flex h-screen sm:hidden ">

                <Chat setOpen={setOpen} />

            </div>
            </div>
                :
                <></>
            }
            


            <FloatingButton
            onClick={()=>setOpen(true)}
            className="sm:hidden">
                Unite al Live Chat
            </FloatingButton> */}
        </>
    )
}