import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isSameOriginRequest } from '@/lib/security';

const COOKIE_NAME = 'admin_token';

export async function POST(request: NextRequest) {
  try {
    if (!isSameOriginRequest(request)) {
      return NextResponse.json(
        { success: false, error: 'Forbidden origin' },
        { status: 403, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const cookieStore = await cookies();
    
    // Delete the auth cookie
    cookieStore.set(COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expire immediately
      path: '/',
    });

    return NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Errore durante il logout' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
