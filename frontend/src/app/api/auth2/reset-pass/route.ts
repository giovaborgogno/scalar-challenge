import { NextResponse } from 'next/server';

interface RequestBody {
  email: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/auth/users/reset_password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (!res.ok) {
      // El servidor respondió con un código de estado de error
      
      return NextResponse.json({error: data ?? 'Server responded with an error'}, {status: res.status});
    }

    
    return NextResponse.json(data, {status: 204});
  } catch (error) {
    // Hubo un error con la solicitud de red
    return NextResponse.json({ error: 'There was an error with the network request' });
  }
}