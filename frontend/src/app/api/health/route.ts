export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server';
const fs = require('fs').promises;

export async function GET(request: Request) {
    try {
        const version = await fs.readFile('VERSION', 'utf8');
        return NextResponse.json({ version }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'There was an error with the network request' });
    }
}