'use client'
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ResetForm(){

    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch('/api/auth2/reset-pass', {
            // Esta es la ruta de tu manejador de registro
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
            }),
        });

        if (!res.ok) {
            // Manejar el error

            const err = 'Error del servidor. Por favor intenta más tarde.'


            toast.error(err)
        } else {
            // Procesar la respuesta de registro exitoso
            // Tal vez redirigir al usuario a la página de inicio de sesión
            toast.success(`Te enviamos un link de recuperacion a tu correo electronico.`)
        }
    };

    return(
        <form className="grid grid-cols-1 gap-6" onSubmit={onSubmit}>
        <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">
            Email
          </span>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e)=>onChange(e)}
            placeholder="example@example.com"
            className="mt-1"
          />
        </label>
        <ButtonPrimary type="submit">Continuar</ButtonPrimary>
      </form>
    )
}