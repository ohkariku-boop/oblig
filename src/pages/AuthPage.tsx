import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useAuth, hasSupabase } from '@/lib/AuthContext';

type Mode = 'signin' | 'signup' | 'forgot' | 'update-password';

export function AuthPage() {
  const [searchParams] = useSearchParams();
  const initialMode = (searchParams.get('mode') as Mode) || 'signin';
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { signIn, signUp, resetPassword, updatePassword } = useAuth();
  const navigate = useNavigate();

  // Supabase recovery links land here with tokens in the hash; once the
  // session is recovered the user can set a new password.
  useEffect(() => {
    if (searchParams.get('mode') === 'update-password') {
      setMode('update-password');
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);

    if (mode === 'forgot') {
      const { error } = await resetPassword(email);
      setBusy(false);
      if (error) {
        setError(error);
        return;
      }
      setInfo('If an account exists for that email, a reset link has been sent. Check your inbox.');
      return;
    }

    if (mode === 'update-password') {
      if (password.length < 6) {
        setBusy(false);
        setError('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setBusy(false);
        setError('Passwords do not match.');
        return;
      }
      const { error } = await updatePassword(password);
      setBusy(false);
      if (error) {
        setError(error);
        return;
      }
      setInfo('Password updated. You can now sign in.');
      setMode('signin');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    const { error } = mode === 'signin' ? await signIn(email, password) : await signUp(email, password);
    setBusy(false);
    if (error) {
      setError(error);
      return;
    }
    if (mode === 'signup') {
      setInfo('Account created. Check your inbox to confirm your email, then sign in.');
      setMode('signin');
      return;
    }
    navigate('/app');
  }

  const titles: Record<Mode, string> = {
    signin: 'Sign in',
    signup: 'Create your account',
    forgot: 'Reset your password',
    'update-password': 'Choose a new password',
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-[#080b16]">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex justify-center">
          <Logo />
        </Link>

        {!hasSupabase && (
          <div className="mb-4 rounded-md border border-warning-300 bg-warning-50 p-3 text-xs text-warning-800 dark:border-warning-700 dark:bg-warning-900/30 dark:text-warning-300">
            Backend isn't configured in this deploy yet, accounts aren't live here.
          </div>
        )}

        <div className="card p-6">
          <div className="mb-5 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-navy dark:text-cream" />
            <h1 className="text-lg font-bold text-navy dark:text-cream">{titles[mode]}</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {(mode === 'signin' || mode === 'signup' || mode === 'forgot') && (
              <div>
                <label className="mb-1 block text-xs font-medium text-ink">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input w-full"
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>
            )}

            {(mode === 'signin' || mode === 'signup' || mode === 'update-password') && (
              <div>
                <label className="mb-1 block text-xs font-medium text-ink">
                  {mode === 'update-password' ? 'New password' : 'Password'}
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-full"
                  placeholder="At least 6 characters"
                  autoComplete={mode === 'update-password' ? 'new-password' : 'current-password'}
                />
              </div>
            )}

            {mode === 'update-password' && (
              <div>
                <label className="mb-1 block text-xs font-medium text-ink">Confirm new password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input w-full"
                  placeholder="Repeat the new password"
                  autoComplete="new-password"
                />
              </div>
            )}

            {error && <p className="text-xs font-medium text-error-600">{error}</p>}
            {info && <p className="text-xs font-medium text-success-600">{info}</p>}

            <button type="submit" disabled={busy} className="btn-primary w-full justify-center">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === 'signin' && 'Sign in'}
              {mode === 'signup' && 'Create account'}
              {mode === 'forgot' && 'Send reset link'}
              {mode === 'update-password' && 'Update password'}
            </button>
          </form>

          {mode === 'signin' && (
            <p className="mt-3 text-center text-xs text-muted">
              <button
                type="button"
                onClick={() => {
                  setMode('forgot');
                  setError(null);
                  setInfo(null);
                }}
                className="font-semibold text-navy hover:underline dark:text-cream"
              >
                Forgot password?
              </button>
            </p>
          )}

          {(mode === 'forgot' || mode === 'update-password') && (
            <p className="mt-5 text-center text-xs text-muted">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError(null);
                  setInfo(null);
                  setPassword('');
                  setConfirmPassword('');
                }}
                className="inline-flex items-center gap-1 font-semibold text-navy hover:underline dark:text-cream"
              >
                <ArrowLeft className="h-3 w-3" /> Back to sign in
              </button>
            </p>
          )}

          {(mode === 'signin' || mode === 'signup') && (
            <p className="mt-5 text-center text-xs text-muted">
              {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'signin' ? 'signup' : 'signin');
                  setError(null);
                  setInfo(null);
                }}
                className="font-semibold text-navy hover:underline dark:text-cream"
              >
                {mode === 'signin' ? 'Create one' : 'Sign in'}
              </button>
            </p>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          <Link to="/app" className="hover:underline">
            Continue without an account →
          </Link>
        </p>
      </div>
    </div>
  );
}
