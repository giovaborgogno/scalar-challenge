export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const auth = request.headers.get('Authorization');

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const sort_by = searchParams.get('sort_by')
    const order = searchParams.get('order')
    const p = searchParams.get('p')
    const page_size = searchParams.get('page_size')

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/movie/private-list/?search=${search?? 'none'}&sort_by=${sort_by?? 'release_data'}&order=${order?? 'desc'}&p=${p?? '1'}&page_size=${page_size?? '5'}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${auth}`
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