import { NextResponse } from 'next/server';

interface RequestBody {
    comment: string;
    rating: string;
}

export async function POST(request: Request, { params }: { params: { slug: string } }) {
    try {
        const auth = request.headers.get('Authorization');
        const body: RequestBody = await request.json();
        const slug = params.slug    

        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/review/create/${slug}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${auth}`
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();

        if (!res.ok) {
            // El servidor respondió con un código de estado de error

            return NextResponse.json({ error: data ?? 'Server responded with an error' }, { status: res.status });
        }


        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        // Hubo un error con la solicitud de red
        return NextResponse.json({ error: 'There was an error with the network request' });
    }
}