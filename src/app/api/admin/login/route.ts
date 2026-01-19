import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createAdminToken, isAuthConfigured } from '@/lib/auth';
import { checkRateLimit, recordFailedAttempt, clearAttempts } from '@/lib/rateLimit';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const COOKIE_NAME = 'admin_token';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// Get client IP from request headers
function getClientIP(request: NextRequest): string {
  // Vercel/Cloudflare provide these headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);

  // Check rate limit first
  const rateLimit = checkRateLimit(clientIP);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { 
        success: false, 
        error: `Troppi tentativi. Riprova tra ${Math.ceil(rateLimit.retryAfter! / 60)} minuti.` 
      },
      { 
        status: 429,
        headers: {
          'Retry-After': String(rateLimit.retryAfter),
        }
      }
    );
  }

  try {
    const { password } = await request.json();

    // Check if auth is properly configured
    if (!ADMIN_PASSWORD || !isAuthConfigured()) {
      console.error('ADMIN_PASSWORD or AUTH_SECRET not configured');
      return NextResponse.json(
        { success: false, error: 'Authentication not configured' },
        { status: 500 }
      );
    }

    // Validate password
    if (password !== ADMIN_PASSWORD) {
      recordFailedAttempt(clientIP);
      return NextResponse.json(
        { success: false, error: 'Password non valida' },
        { status: 401 }
      );
    }

    // Password correct - create signed JWT token
    const token = await createAdminToken();
    
    // Clear rate limit attempts on success
    clearAttempts(clientIP);

    // Set HTTP-only cookie with signed token
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    recordFailedAttempt(clientIP);
    return NextResponse.json(
      { success: false, error: 'Errore durante il login' },
      { status: 500 }
    );
  }
}
