import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';

const COOKIE_NAME = 'admin_token';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get(COOKIE_NAME);

    if (!tokenCookie?.value) {
      return NextResponse.json({ isAdmin: false }, { headers: { 'Cache-Control': 'no-store' } });
    }

    // Verify the JWT token
    const payload = await verifyAdminToken(tokenCookie.value);
    
    if (!payload || !payload.isAdmin) {
      cookieStore.set(COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
      });
      return NextResponse.json({ isAdmin: false }, { headers: { 'Cache-Control': 'no-store' } });
    }

    return NextResponse.json({ isAdmin: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ isAdmin: false }, { headers: { 'Cache-Control': 'no-store' } });
  }
}
