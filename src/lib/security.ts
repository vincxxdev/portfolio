import { createHash } from 'node:crypto';
import { isIP } from 'node:net';
import { NextRequest } from 'next/server';

function normalizeIP(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (isIP(trimmed) !== 0) {
    return trimmed;
  }

  if (trimmed.startsWith('::ffff:')) {
    const mappedIPv4 = trimmed.slice(7);
    if (isIP(mappedIPv4) !== 0) {
      return mappedIPv4;
    }
  }

  return null;
}

function getForwardedIP(headerValue: string | null): string | null {
  if (!headerValue) {
    return null;
  }

  const firstHop = headerValue.split(',')[0]?.trim() ?? null;
  return normalizeIP(firstHop);
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
  const platformIP = normalizeIP(
    request.headers.get('x-vercel-ip') ??
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('fly-client-ip')
  );
  if (platformIP) {
    return platformIP;
  }

  const trustProxyHeaders = process.env.TRUST_PROXY_HEADERS === 'true';
  if (trustProxyHeaders) {
    const forwardedIP = getForwardedIP(request.headers.get('x-forwarded-for'));
    if (forwardedIP) {
      return forwardedIP;
    }

    const realIP = normalizeIP(request.headers.get('x-real-ip'));
    if (realIP) {
      return realIP;
    }
  }

  const userAgent = request.headers.get('user-agent') ?? 'unknown';
  const acceptLanguage = request.headers.get('accept-language') ?? 'unknown';
  const uaHash = createHash('sha256')
    .update(`${userAgent}|${acceptLanguage}`)
    .digest('hex')
    .slice(0, 20);
  return `unknown:${uaHash}`;
}
