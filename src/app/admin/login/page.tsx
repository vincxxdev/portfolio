'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, LogOut, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAdmin } from '@/app/components/providers/AdminProvider';
import Link from 'next/link';

export default function AdminLoginPage() {
  const { isAdmin, isLoading, login, logout } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center bg-primary-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-background px-4">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Back to home link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-secondary-text hover:text-accent transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Torna al portfolio</span>
        </Link>

        <div className="bg-secondary-background/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-secondary-text/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-4">
              <Lock className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-primary-text">
              {isAdmin ? 'Area Admin' : 'Accesso Admin'}
            </h1>
            <p className="text-secondary-text mt-2">
              {isAdmin 
                ? 'Sei autenticato come amministratore' 
                : 'Inserisci la password per accedere'}
            </p>
          </div>

          {isAdmin ? (
            /* Logged in view */
            <div className="space-y-4">
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-center font-medium">
                  ✓ Sessione attiva
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors font-semibold"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            /* Login form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-secondary-text mb-2">
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
                    className="w-full px-4 py-3 bg-primary-background border border-secondary-text/30 rounded-lg text-primary-text placeholder-secondary-text/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-text hover:text-accent transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <p className="text-red-400 text-sm text-center">{error}</p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !password}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-cyan-400/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
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
        <p className="text-center text-secondary-text/60 text-xs mt-6">
          Questa pagina è riservata all&apos;amministratore del sito
        </p>
      </motion.div>
    </div>
  );
}
