'use client'

import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import Input from "@/shared/Input/Input"
import { getSession, signIn } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation';
import { Route } from "@/routers/types"
import { toast } from "react-hot-toast"

const LoginForm = () => {

    

    const router = useRouter();
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')
    // const err = searchParams.get('error')
    const [err, setErr] = useState('')

    useEffect(()=>{
        const err = searchParams.get('error')
        err == null ? setErr('') : setErr(err)
    },[])

    useEffect(()=>{
        if (err !== '') {
            toast.error('Incorrect User or Password')
        }
    },[err])

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e: any) => {
        e.preventDefault();

        // Llamar a signIn para iniciar una sesión con las credenciales proporcionadas
        const res = await signIn('credentials', {
            redirect: true,
            email: email,
            password: password,
            callbackUrl: callbackUrl! ?? '/'
        });
        
        // Get session after signing in
        const session = await getSession();
        
        if (!res?.error && session?.user) {
            toast.success('Welcome!')
            
        } else {
            // Aquí puedes manejar el error como mejor te parezca
            toast.error('Incorrect User or Password')
            if (err) {
                toast.error('Incorrect User or Password')
            }
        }
    }

    return (
        <>
        <form className="grid grid-cols-1 gap-6" onSubmit={onSubmit}>
            <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                    Email
                </span>
                <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    placeholder="example@example.com"
                    className="mt-1"
                />
            </label>
            <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                    Password
                    <Link href="/auth/password/reset" className="text-sm text-green-600">
                        Forgot password?
                    </Link>
                </span>
                <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    className="mt-1" />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
        </form>
        </>
    )
}

export default LoginForm;