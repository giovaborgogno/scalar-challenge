'use client'
import FloatingButton from "@/components/Chat/FloatingButton";
import Chat from "@/components/Chat/Chat";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ChatPop() {

    const [open, setOpen] = useState<boolean>(false)
    const { data: session } = useSession()


    return (
        <>
            {
                session?
                    <>

                        {
                            open ?
                                <div className="fixed top-0 left-0 h-screen z-50 bg-white dark:bg-neutral-900 w-full">
                                    <div className="flex h-screen sm:hidden ">

                                        <Chat setOpen={setOpen} />

                                    </div>
                                </div>
                                :
                                <></>
                        }



                        <FloatingButton
                            onClick={() => setOpen(true)}
                            className="sm:hidden">
                            Join Last Premiere&apos;s Chat
                        </FloatingButton>
                    </>
                    :
                    <></>
            }
        </>
    )
}