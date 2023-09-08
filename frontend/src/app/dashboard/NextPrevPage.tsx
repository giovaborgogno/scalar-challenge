'use client'

import { Route } from "@/routers/types"
import NextPrev from "@/shared/NextPrev/NextPrev"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function NextPrevPage({prev_url, next_url}:{prev_url:string | null, next_url:string | null}){
    
    const router = useRouter()
    const url_1 = new URL(next_url?? 'http://url.com/?p=1');
    const url_2 = new URL(prev_url?? 'http://url.com/?p=1');

// Obtener los parámetros de la URL como un objeto
    const next_params = Object.fromEntries(url_1.searchParams.entries());
    const prev_params = Object.fromEntries(url_2.searchParams.entries());

    const onClickPrev = () =>{
        
        if (prev_url) router.replace(`/dashboard?p=${prev_params.p?? '1'}` as Route)
      }
    
      const onClickNext = () =>{
        
        if (next_url) router.replace(`/dashboard?p=${next_params.p?? '1'}` as Route)
      }
    return(
        <NextPrev onClickNext={() => onClickNext()} onClickPrev={() => onClickPrev()}/>
    )
}