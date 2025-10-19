'use client';

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error only in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-primary-background px-4">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-bold text-primary-text mb-4">
              Qualcosa è andato storto
            </h2>
            <p className="text-secondary-text mb-8">
              Si è verificato un errore nel caricamento di questa sezione.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-2 bg-accent text-accent-text rounded-md hover:bg-accent-hover transition-colors"
            >
              Riprova
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
