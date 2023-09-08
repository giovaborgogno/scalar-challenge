'use client'
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignUpForm() {

    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: '',
    });

    const { firstName, lastName, email, password, rePassword } = formData;

    const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        const res = await fetch('/api/auth2/register', {
            // Esta es la ruta de tu manejador de registro
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                first_name: firstName,
                last_name: lastName,
                password,
                re_password: rePassword,
            }),
        });

        const data = await res.json();

        setLoading(false)

        if (res.status !== 201) {
            // Manejar el error

            let err
            res.status === 400 ? 
            data.error.password ? err = data.error.password :
            data.error.email ? err = data.error.email  :
            data.error.non_field_errors ? err = data.error.non_field_errors :
            err = 'Error when signup'
            :
            err = 'Internal Server Error. Please try later.'


            toast.error(err)
        } else {
            // Procesar la respuesta de registro exitoso
            // Tal vez redirigir al usuario a la página de inicio de sesión
            toast.success(`Congrats ${data.first_name} your account has been created`)
            router.push('/auth/login')
        }
    };

    return (
        <form className="grid grid-cols-1 gap-6" onSubmit={onSubmit}>

            <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                   First Name
                </span>
                <Input
                    required
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => onChange(e)}
                    placeholder="Jhon"
                    className="mt-1"
                />
            </label>
            <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                    Last Name
                </span>
                <Input
                    required
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => onChange(e)}
                    placeholder="Doe"
                    className="mt-1"
                />
            </label>
            <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                    Email
                </span>
                <Input
                    required
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
                </span>
                <Input
                    required
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    className="mt-1" />
            </label>
            <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                   Confirm Password
                </span>
                <Input
                    required
                    type="password"
                    name="rePassword"
                    value={rePassword}
                    onChange={(e) => onChange(e)}
                    className="mt-1" />
            </label>
            {loading ? <ButtonPrimary disabled >loading...</ButtonPrimary> : <ButtonPrimary type="submit">Register</ButtonPrimary>}
        </form>
    )
}