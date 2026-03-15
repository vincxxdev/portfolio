import { createHash } from 'node:crypto';
import { isIP } from 'node:net';
import { NextRequest } from 'next/server';

function isValidIP(value: string | null): value is string {
  return !!value && isIP(value.trim()) !== 0;
}

function buildExpectedOrigin(request: NextRequest): string | null {
  const forwardedProto = request.headers.get('x-forwarded-proto');
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');

  if (!host) {
    return null;
  }

  const protocol = forwardedProto ?? request.nextUrl.protocol.replace(':', '');
  return `${protocol}://${host}`;
}

export function isSameOriginRequest(request: NextRequest): boolean {
  const originHeader = request.headers.get('origin');

  if (!originHeader) {
    return process.env.NODE_ENV !== 'production';
  }

  const expectedOrigin = buildExpectedOrigin(request);
  if (!expectedOrigin) {
    return false;
  }

  try {
    const origin = new URL(originHeader).origin;
    return origin === expectedOrigin;
  } catch {
    return false;
  }
}

export function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const firstForwardedIP = forwarded?.split(',')[0]?.trim() ?? null;

  if (isValidIP(firstForwardedIP)) {
    return firstForwardedIP;
  }

  const realIP = request.headers.get('x-real-ip')?.trim() ?? null;
  if (isValidIP(realIP)) {
    return realIP;
  }

  const userAgent = request.headers.get('user-agent') ?? 'unknown';
  const uaHash = createHash('sha256').update(userAgent).digest('hex').slice(0, 16);
  return `unknown:${uaHash}`;
}
