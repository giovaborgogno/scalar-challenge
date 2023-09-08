import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug     
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/movie/detail/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    if (!res.ok) {
      
      return NextResponse.json({error: data ?? 'Server responded with an error'}, {status: res.status});
    }

    
    return NextResponse.json(data, {status: 200});
  } catch (error) {
    return NextResponse.json({ error: 'There was an error with the network request' });
  }
}