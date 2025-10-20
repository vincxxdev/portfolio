'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Button from './ui/Button';
import { useSound } from './hooks/useSound';
import { Confetti } from './ui/Confetti';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  privacyConsent: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  privacyConsent?: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    privacyConsent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [showConfetti, setShowConfetti] = useState(false);
  const { playSound } = useSound();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Il nome è obbligatorio';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Il nome deve contenere almeno 2 caratteri';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "L'email è obbligatoria";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "L'email non è valida";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "L'oggetto è obbligatorio";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Il messaggio è obbligatorio';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Il messaggio deve contenere almeno 10 caratteri';
    }

    // Privacy consent validation
    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'Devi accettare la privacy policy per continuare';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      playSound('pop');
      return;
    }

    setStatus('loading');

    try {
      // TODO: Implement actual email sending logic here
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate success
      setStatus('success');
      playSound('success');
      setShowConfetti(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          privacyConsent: false,
        });
        setStatus('idle');
        setShowConfetti(false);
      }, 5000);

    } catch (error) {
      setStatus('error');
      playSound('pop');
      console.error('Error sending message:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses = (hasError: boolean) => `
    w-full px-4 py-3 rounded-lg
    bg-secondary-background/50 backdrop-blur-lg
    border ${hasError ? 'border-red-500' : 'border-secondary-text/20'}
    text-primary-text placeholder-secondary-text/50
    focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent
    transition-all duration-300
  `;

  return (
    <>
      <Confetti trigger={showConfetti} />
      
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        {/* Success Message */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
          >
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            <div>
              <p className="text-green-500 font-semibold">Messaggio inviato con successo! 🎉</p>
              <p className="text-secondary-text text-sm">Ti risponderò il prima possibile.</p>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
          >
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div>
              <p className="text-red-500 font-semibold">Errore nell&apos;invio del messaggio</p>
              <p className="text-secondary-text text-sm">Riprova più tardi o contattami direttamente via email.</p>
            </div>
          </motion.div>
        )}

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-primary-text mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={status === 'loading' || status === 'success'}
            className={inputClasses(!!errors.name)}
            placeholder="Es: Mario Rossi"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-primary-text mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={status === 'loading' || status === 'success'}
            className={inputClasses(!!errors.email)}
            placeholder="Es: mario.rossi@esempio.it"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-primary-text mb-2">
            Oggetto *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={status === 'loading' || status === 'success'}
            className={inputClasses(!!errors.subject)}
            placeholder="Es: Richiesta collaborazione"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-primary-text mb-2">
            Messaggio *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={status === 'loading' || status === 'success'}
            rows={6}
            className={inputClasses(!!errors.message)}
            placeholder="Scrivi qui il tuo messaggio..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
        </div>

        {/* Privacy Consent - GDPR Compliance */}
        <div className="bg-secondary-background/30 backdrop-blur-lg border border-secondary-text/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="privacyConsent"
              name="privacyConsent"
              checked={formData.privacyConsent}
              onChange={handleChange}
              disabled={status === 'loading' || status === 'success'}
              className="mt-1 w-4 h-4 rounded border-secondary-text/30 text-accent focus:ring-2 focus:ring-accent/50 cursor-pointer"
            />
            <label htmlFor="privacyConsent" className="text-sm text-secondary-text cursor-pointer">
              Acconsento al trattamento dei miei dati personali secondo l&apos;
              <a 
                href="/privacy-policy" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover underline font-semibold ml-1"
              >
                informativa privacy
              </a>
              . I dati forniti saranno utilizzati esclusivamente per rispondere alla tua richiesta e non saranno condivisi con terze parti. *
            </label>
          </div>
          {errors.privacyConsent && (
            <p className="mt-2 text-sm text-red-500">{errors.privacyConsent}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            disabled={status === 'loading' || status === 'success'}
            className={`min-w-[200px] ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Invio in corso...
              </span>
            ) : status === 'success' ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Inviato!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Invia Messaggio
              </span>
            )}
          </Button>
        </div>

        {/* Required fields note */}
        <p className="text-xs text-secondary-text text-center">
          * Campi obbligatori
        </p>
      </motion.form>
    </>
  );
};
