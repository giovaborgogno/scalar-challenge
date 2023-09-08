'use client'

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Textarea from "@/shared/Textarea/Textarea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ReviewForm({slug}:{slug:string}){

    const router = useRouter()
    const {data: session} = useSession()

    const [formData, setFormData] = useState({
        rating: '',
        comment: '',
    });

    const { rating, comment } = formData;

    const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e: any) => {
        e.preventDefault();

        const res = await fetch(`/api/review/create/${slug}`, {
            // Esta es la ruta de tu manejador de registro
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${session?.user?.accessToken}`
            },
            body: JSON.stringify({
                rating,
                comment
            }),
        });

        const data = await res.json();
        
        if (!res.ok) {
            toast.error('Try Later')
            
        } else {
            toast.success('Success')
            setFormData({
                rating: '',
                comment: '',
            })
            router.refresh()
            // Aquí puedes manejar el error como mejor te parezca

        }
    }
    return (
        <div className="max-w-screen-md mx-auto pt-5">
          <h4 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
            Add review:
          </h4>
          <form onSubmit={onSubmit} className="nc-SingleCommentForm mt-5">
          <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                    Rating
                </span>
                <Input
                    type="number"
                    name="rating"
                    value={rating}
                    onChange={(e) => onChange(e)}
                    placeholder="4.5"
                    className="my-1"
                    required
                />
            </label>
            <Textarea
            name="comment"
            required
            value={comment}
            onChange={e => onChange(e)} />
            <div className="mt-2 space-x-3">
              <ButtonPrimary type="submit">Submit</ButtonPrimary>
            </div>
          </form>
        </div>
      );
}