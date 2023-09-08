import { NextResponse } from 'next/server';

interface RequestBody {
    status: string;
}

export async function PUT(request: Request,  { params }: { params: { userId: string } }) {
    try {
        const auth = request.headers.get('Authorization');
        const body: RequestBody = await request.json();
        const userId = params.userId     


        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/auth/partial-update-user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${auth}`
            },
            body: JSON.stringify(body),
        });
        
        if (!res.ok) {
            // El servidor respondió con un código de estado de error
            const data = await res.json();
            
            return NextResponse.json({ error: data ?? 'Server responded with an error' }, { status: res.status });
        }

        return new Response(null,{status: 204});
    } catch (error) {
        // Hubo un error con la solicitud de red
        return NextResponse.json({ error: 'There was an error with the network request' });
    }
}