'use client'
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  params: { uid: string; token: string };
}

export default function ResetForm({params}: Props){

  const router = useRouter()

    const uid = params.uid
    const token = params.token

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
    });

    const { new_password, re_new_password } = formData;

    const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch('/api/auth2/reset-pass-confirm', {
            // Esta es la ruta de tu manejador de registro
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                new_password,
                re_new_password,
                uid,
                token,
            }),
        });

        const data = await res.json();


        if (!res.ok) {
            // Manejar el error
            let err
            res.status === 400 ? 
            data.error.token ? err = 'Link de recuperacion invalido o ya utilizado' :
            data.error.uid ? err = 'Link de recuperacion invalido o ya utilizado' :
            data.error.new_password ? err = 'La contraseña debe tener al menos 8 caracteres e incluir letras y numeros.\n No debe ser ser similar al email, nombre o apellido.' :
            data.error.non_field_errors ? err = 'Las contraseñas no coinciden.' :
            err = 'Error al actualizar contraseñas.'
            :
            err = 'Error del servidor. Por favor intenta más tarde.'


            toast.error(err)
        } else {
            // Procesar la respuesta de registro exitoso
            // Tal vez redirigir al usuario a la página de inicio de sesión
            toast.success(`Tu nueva contraseña ha sido creada, ahora puedes iniciar sesion.`)
            router.push('/auth/login')
        }
    };

    return(
        <form className="grid grid-cols-1 gap-6" onSubmit={onSubmit}>
        <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">
            Nueva Contraseña
          </span>
          <Input
            type="password"
            name="new_password"
            value={new_password}
            onChange={(e)=>onChange(e)}
            placeholder="example@example.com"
            className="mt-1"
          />
        </label>
        <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">
            Repite la Nueva Contraseña
          </span>
          <Input
            type="password"
            name="re_new_password"
            value={re_new_password}
            onChange={(e)=>onChange(e)}
            placeholder="example@example.com"
            className="mt-1"
          />
        </label>
        <ButtonPrimary type="submit">Continuar</ButtonPrimary>
      </form>
    )
}