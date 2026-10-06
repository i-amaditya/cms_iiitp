import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { googleLogin } from '../api/auth';
import { useAuth } from '../context/useAuth';

declare global {
  interface Window {
    google?: any;
  }
}

export const LoginPage: React.FC = () => {
  const { refreshUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate a random cryptographically secure nonce
    const nonce = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem('oauth_nonce', nonce);

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '61666690202-ccu6s98rg1irbqj6agau8phluv04i4pe.apps.googleusercontent.com';

    function initGoogle() {
      if (window.google?.accounts?.id && buttonRef.current) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          nonce: nonce,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          width: 280,
        });
      }
    }

    async function handleCredentialResponse(response: any) {
      if (!response.credential) {
        setError('No credential received from Google.');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const storedNonce = sessionStorage.getItem('oauth_nonce') || undefined;
        await googleLogin(response.credential, storedNonce);
        await refreshUser();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Google authentication failed';
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    if (window.google?.accounts?.id) {
      initGoogle();
    } else {
      const timer = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(timer);
          initGoogle();
        }
      }, 200);
      return () => clearInterval(timer);
    }
  }, [refreshUser]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9fafb',
      padding: '1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        padding: '2.5rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          backgroundColor: '#eff6ff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem',
          color: '#2563eb'
        }}>
          <ShieldCheck size={32} />
        </div>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: '0 0 0.5rem' }}>
          IIIT Pune CMS
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 2rem' }}>
          Sign in with your institute Google Workspace account to access the editorial management dashboard.
        </p>

        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            fontSize: '0.875rem',
            marginBottom: '1.5rem',
            textAlign: 'left'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{error}</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '44px' }}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563', fontSize: '0.875rem' }}>
              <Loader2 size={20} className="animate-spin" />
              <span>Verifying authorization...</span>
            </div>
          ) : (
            <div ref={buttonRef} />
          )}
        </div>

        <div style={{
          marginTop: '2.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #f3f4f6',
          fontSize: '0.75rem',
          color: '#9ca3af'
        }}>
          Protected by Role-Based Access Control & Google OAuth2. Nonce verified.
        </div>
      </div>
    </div>
  );
};
