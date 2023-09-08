'use client'
import Label from "@/components/Label/Label";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Textarea from "@/shared/Textarea/Textarea";

const genres = [
    {name: 'Action'},
    {name: 'Comedy'},
    {name: 'Drama'},
    {name: 'Fantasy'},
    {name: 'Horror'},
    {name: 'Mystery'},
    {name: 'Romance'},
    {name: 'Thriller'},
    {name: 'Western'},
    {name: 'Crime'},
    {name: 'Disaster'},
    {name: 'Psychological'},
    {name: 'Techno'},
  ]


export default function AddMovieForm() {

    const router = useRouter()

    const {data: session} = useSession()

    const [formData, setFormData] = useState({
        title: '',
        release_date: '',
        genre: '',
        plot: '',
        trailer_url: '',
        status: '',

    });

    const { 
        title,
        release_date,
        genre,
        plot,
        trailer_url,
        status
     } = formData;

    const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e:any) => {
        e.preventDefault();
        const res = await fetch(`/api/movie/create/`, {
            // Esta es la ruta de tu manejador de registro
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${session?.user?.accessToken!}`
            },
            body: JSON.stringify({
                title,
                release_date,
                genre,
                plot,
                trailer_url,
                status
            }),
        });

        const data = await res.json();

        if (!res.ok) {


            toast.error('Error')
        } else {

            toast.success(`Success`)
            setFormData({
                title: '',
                release_date: '',
                genre: '',
                plot: '',
                trailer_url: '',
                status: '',
        
            })
        }
    };
    return (
        <div className="flex flex-col md:flex-row" >
            <div className="flex-shrink-0 flex items-start">
                {/* AVATAR */}
            </div>
            <form className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6" onSubmit={onSubmit}>

                {/* ---- */}

                    <div>
                        <Label>Title</Label>
                        <Input required className="mt-1.5" 
                        name={'title'}  
                        value={title} 
                        onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div>
                        <Label>Plot</Label>
                        <Textarea required className="mt-1.5" 
                        name={'plot'} 
                        onChange={(e) => onChange(e)} 
                        value={plot} />
                    </div>

                <div>
                    <Label>Trailer - Youtube Embebed URL</Label>
                    <div className="mt-1.5 flex">
                        <Input 
                            className=""
                            onChange={(e) => onChange(e)} 
                            type="url"
                            name={'trailer_url'} 
                            value={trailer_url}
                        />
                    </div>
                </div>
                <div className="grid sm:grid-flow-col sm:justify-stretch gap-5 sm:gap-3">
                <div>
                    <Label>Genre</Label>
                    <Select className="mt-1.5" 
                    required
                    name={'genre'}
                    defaultValue={''}
                    onChange={(e) => onChange(e)}>
                        <option value=""></option>
                        {
                        genres.map((genre, index) => (
                                                <option key={index} value={genre.name}>
                                                    {genre.name}
                                                </option>
                                            ))
                        }
                    </Select>
                </div>
                <div>
                    <Label>Release Date</Label>
                    <Input required className="mt-1.5" 
                    onChange={(e) => onChange(e)} 
                    type="date"
                    name={'release_date'} 
                    value={release_date} />
                </div>
                <div>
                    <Label>Status</Label>
                    <Select className="mt-1.5" 
                    required
                    name={'status'}
                    onChange={(e) => onChange(e)}>
                        
                    <option value='Draft'>Draft</option>
                    <option value='Published'>Published</option>
                                           
                    </Select>
                </div>

                {/* ---- */}
                
                </div>

                {/* ---- */}

                <div className="pt-2">
                    <ButtonPrimary type="submit">Add Movie</ButtonPrimary>
                </div>
            </form>
        </div>
    )
}