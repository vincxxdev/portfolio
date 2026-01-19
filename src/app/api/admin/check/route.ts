import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';

const COOKIE_NAME = 'admin_token';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get(COOKIE_NAME);

    if (!tokenCookie?.value) {
      return NextResponse.json({ isAdmin: false });
    }

    // Verify the JWT token
    const payload = await verifyAdminToken(tokenCookie.value);
    
    if (!payload || !payload.isAdmin) {
      return NextResponse.json({ isAdmin: false });
    }

    return NextResponse.json({ isAdmin: true });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ isAdmin: false });
  }
}
