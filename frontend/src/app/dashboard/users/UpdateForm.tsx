'use client'

import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface User {
    id: string;
    get_photo: string
    email: string;
    first_name: string;
    last_name: string;
    get_full_name: string;
    role: string;
    is_active: string;
};

export default function UpdateForm({ user }: { user: User }) {

    const { data: session } = useSession()
    const router = useRouter()

    const onChangeRole = async (e: any) => {

        const res = await fetch(`/api/auth2/partial-update-user/${user?.id}`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${session?.user?.accessToken}`
            },
            body: JSON.stringify({
                role: e.target.value,
                is_active: user.is_active
            }),
        });

        if (!res.ok) {
            toast.error('Try Later')

        } else {
            toast.success('Success')
            router.replace('/dashboard/users')

        }
    }

    const onDelete = async () => {

        const res = await fetch(`/api/auth2/partial-update-user/${user?.id}`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${session?.user?.accessToken}`
            },
            body: JSON.stringify({
                role: user.role,
                is_active: false
            }),
        });

        if (!res.ok) {
            toast.error('Try Later')

        } else {
            toast.success('Success')
            router.replace('/dashboard/users')

        }
    }

    const onActive = async () => {

        const res = await fetch(`/api/auth2/partial-update-user/${user?.id}`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${session?.user?.accessToken}`
            },
            body: JSON.stringify({
                role: user.role,
                is_active: true
            }),
        });

        if (!res.ok) {
            toast.error('Try Later')

        } else {
            toast.success('Success')
            router.replace('/dashboard/users')

        }
    }

    return (
        <div className="w-auto " >
            <Select onChange={(e) => onChangeRole(e)} >
                <option value={user.role}>{user.role}</option>
                <option value="admin">admin</option>
                <option value="critic">critic</option>
                <option value="user">user</option>
            </Select>
            {user.is_active ?
            <div onClick={onDelete} className="w-20">
                <Input disabled value="Delete"  className="mt-2 cursor-pointer hover:text-red-600" />
            </div>
                
                :
                <div onClick={onActive} className="w-20">

                <Input disabled value="Active"  className="mt-2 cursor-pointer hover:text-green-600" />
                </div>
            }
        </div>
    )
}