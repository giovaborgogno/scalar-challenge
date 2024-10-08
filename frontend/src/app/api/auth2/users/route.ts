export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const auth = request.headers.get('Authorization');

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/auth/users/`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${auth}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {

      return NextResponse.json({ error: data ?? 'Server responded with an error' }, { status: res.status });
    }


    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'There was an error with the network request' });
  }
}