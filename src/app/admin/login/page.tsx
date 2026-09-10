'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, LogOut, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAdmin } from '@/app/components/providers/AdminProvider';
import Link from 'next/link';
import { usePauseOffscreen } from '@/app/components/hooks/usePauseOffscreen';

export default function AdminLoginPage() {
  const { isAdmin, isLoading, login, logout } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { ref: containerRef, isInView } = usePauseOffscreen<HTMLDivElement>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(password);
    
    if (!result.success) {
      setError(result.error || 'Login fallito');
    } else {
      // Redirect to home on successful login
      window.location.href = '/';
    }
    
    setIsSubmitting(false);
  };

  const handleLogout = async () => {
    await logout();
    setPassword('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-signal border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-canvas px-4">
      {/* Background decorations */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-sunken animate-blob"
        style={{ animationPlayState: isInView ? 'running' : 'paused' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sunken animate-blob animation-delay-2000"
        style={{ animationPlayState: isInView ? 'running' : 'paused' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Back to home link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-ink-2 hover:text-signal-ink transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Torna al portfolio</span>
        </Link>

        <div className="bg-raised p-8 rounded-sm shadow-lifted border border-hairline-strong">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-signal/15 rounded-sm mb-4">
              <Lock className="w-8 h-8 text-signal-ink" />
            </div>
            <h1 className="text-2xl font-bold text-ink">
              {isAdmin ? 'Area Admin' : 'Accesso Admin'}
            </h1>
            <p className="text-ink-2 mt-2">
              {isAdmin 
                ? 'Sei autenticato come amministratore' 
                : 'Inserisci la password per accedere'}
            </p>
          </div>

          {/* TODO: green-500 / red-500 below are raw Tailwind, not system
              tokens. The palette has `moss` for positive status and nothing
              for error — adding a danger token is a design-system decision. */}
          {isAdmin ? (
            /* Logged in view */
            <div className="space-y-4">
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-sm">
                <p className="text-green-400 text-center font-medium">
                  ✓ Sessione attiva
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-sm hover:bg-red-500/30 transition-colors font-semibold"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            /* Login form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-ink-2 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 bg-canvas border border-hairline-strong rounded-sm text-ink placeholder-ink-3 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-2 hover:text-signal-ink transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/30 rounded-sm"
                >
                  <p className="text-red-400 text-sm text-center">{error}</p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !password}
                className="w-full px-6 py-3 bg-signal text-on-signal rounded-sm font-semibold hover:bg-signal-hover transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-on-signal border-t-transparent rounded-full"
                    />
                    Accesso in corso...
                  </span>
                ) : (
                  'Accedi'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Security notice */}
        <p className="text-center text-ink-3 text-xs mt-6">
          Questa pagina è riservata all&apos;amministratore del sito
        </p>
      </motion.div>
    </div>
  );
}
