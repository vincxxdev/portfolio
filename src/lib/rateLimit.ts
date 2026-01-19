/**
 * Simple in-memory rate limiter for login attempts
 * In production with multiple instances, use Redis instead
 */

interface RateLimitEntry {
  attempts: number;
  firstAttempt: number;
  blockedUntil: number | null;
}

// Store attempts by IP address
const attempts = new Map<string, RateLimitEntry>();

// Configuration
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes block

/**
 * Check if an IP is rate limited
 * Returns { allowed: true } if request is allowed
 * Returns { allowed: false, retryAfter: seconds } if blocked
 */
export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = attempts.get(ip);

  // No previous attempts
  if (!entry) {
    return { allowed: true };
  }

  // Currently blocked
  if (entry.blockedUntil && now < entry.blockedUntil) {
    const retryAfter = Math.ceil((entry.blockedUntil - now) / 1000);
    return { allowed: false, retryAfter };
  }

  // Block expired, reset
  if (entry.blockedUntil && now >= entry.blockedUntil) {
    attempts.delete(ip);
    return { allowed: true };
  }

  // Window expired, reset
  if (now - entry.firstAttempt > WINDOW_MS) {
    attempts.delete(ip);
    return { allowed: true };
  }

  // Within window, check attempts
  if (entry.attempts >= MAX_ATTEMPTS) {
    // Block the IP
    entry.blockedUntil = now + BLOCK_DURATION_MS;
    const retryAfter = Math.ceil(BLOCK_DURATION_MS / 1000);
    return { allowed: false, retryAfter };
  }

  return { allowed: true };
}

/**
 * Record a failed login attempt
 */
export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || now - entry.firstAttempt > WINDOW_MS) {
    // Start new window
    attempts.set(ip, {
      attempts: 1,
      firstAttempt: now,
      blockedUntil: null,
    });
  } else {
    // Increment attempts in current window
    entry.attempts++;
  }
}

/**
 * Clear attempts for an IP (on successful login)
 */
export function clearAttempts(ip: string): void {
  attempts.delete(ip);
}

/**
 * Clean up old entries (call periodically)
 */
export function cleanupRateLimiter(): void {
  const now = Date.now();
  for (const [ip, entry] of attempts.entries()) {
    // Remove if window expired and not blocked
    if (now - entry.firstAttempt > WINDOW_MS && !entry.blockedUntil) {
      attempts.delete(ip);
    }
    // Remove if block expired
    if (entry.blockedUntil && now >= entry.blockedUntil) {
      attempts.delete(ip);
    }
  }
}
