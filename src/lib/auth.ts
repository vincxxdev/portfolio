import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

const AUTH_SECRET = process.env.AUTH_SECRET;

// Get the secret key as Uint8Array for jose
function getSecretKey(): Uint8Array {
  if (!AUTH_SECRET) {
    throw new Error('AUTH_SECRET environment variable is not set');
  }
  return new TextEncoder().encode(AUTH_SECRET);
}

export interface AdminTokenPayload extends JWTPayload {
  isAdmin: boolean;
  iat: number;
  exp: number;
}

/**
 * Create a signed JWT token for admin authentication
 * Token expires in 7 days
 */
export async function createAdminToken(): Promise<string> {
  const secretKey = getSecretKey();
  
  const token = await new SignJWT({ isAdmin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey);
  
  return token;
}

/**
 * Verify and decode an admin JWT token
 * Returns the payload if valid, null if invalid or expired
 */
export async function verifyAdminToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const secretKey = getSecretKey();
    const { payload } = await jwtVerify(token, secretKey);
    
    return payload as AdminTokenPayload;
  } catch (error) {
    // Token is invalid or expired
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Check if AUTH_SECRET is configured
 */
export function isAuthConfigured(): boolean {
  return !!AUTH_SECRET && AUTH_SECRET.length >= 32;
}
