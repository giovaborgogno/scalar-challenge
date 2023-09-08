'use client'

import { IMovie } from "@/interfaces/Movie"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function StatusButton({movie}:{movie:IMovie}){
    const {data: session} = useSession()
    const router = useRouter()
    const onClick =  async() => {

        const res = await fetch(`/api/movie/change-status/${movie?.slug}`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${session?.user?.accessToken}`
            },
            body: JSON.stringify({
                status: movie?.status == 'Published' ? 'Draft' : 'Published'
            }),
        });
        
        if (!res.ok) {
            toast.error('Try Later')
            
        } else {
            toast.success('Success')
            router.refresh()

        }
    }

    
    return(
        <button
                type="button"
                className="font-medium text-indigo-600 dark:text-primary-500 "
                onClick={onClick}
              >
                {session?.user?.role == 'admin' && 
                <>{movie?.status == 'Published' ? 'Delete Movie' : 'Publish'}</> 
                }
              </button>
    )

}