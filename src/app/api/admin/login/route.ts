import { NextRequest, NextResponse } from 'next/server';
import { createHash, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { createAdminToken, isAuthConfigured } from '@/lib/auth';
import { isSameOriginRequest } from '@/lib/security';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const COOKIE_NAME = 'admin_token';
const COOKIE_MAX_AGE = 60 * 60 * 12; // 12 hours

function passwordsMatch(input: string, expected: string): boolean {
  const inputHash = createHash('sha256').update(input, 'utf8').digest();
  const expectedHash = createHash('sha256').update(expected, 'utf8').digest();
  return timingSafeEqual(inputHash, expectedHash);
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { success: false, error: 'Forbidden origin' },
      { status: 403, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    const body = await request.json();
    const password = typeof body?.password === 'string' ? body.password : '';

    // Check if auth is properly configured
    if (!ADMIN_PASSWORD || !isAuthConfigured()) {
      console.error('ADMIN_PASSWORD or AUTH_SECRET not configured');
      return NextResponse.json(
        { success: false, error: 'Authentication not configured' },
        { status: 500, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // Validate password
    if (!password || password.length > 1024 || !passwordsMatch(password, ADMIN_PASSWORD)) {
      return NextResponse.json(
        { success: false, error: 'Password non valida' },
        { status: 401, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // Password correct - create signed JWT token
    const token = await createAdminToken();

    // Set HTTP-only cookie with signed token
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });

    return NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Errore durante il login' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
