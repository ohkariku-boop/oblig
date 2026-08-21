import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useAuth, hasSupabase } from '@/lib/AuthContext';

export function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setInfo(null); setBusy(true);
    const { error } = mode === 'signin' ? await signIn(email, password) : await signUp(email, password);
    setBusy(false);
    if (error) { setError(error); return; }
    if (mode === 'signup') {
      setInfo('Account created. Check your inbox to confirm your email, then sign in.');
      setMode('signin');
      return;
    }
    navigate('/app');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-[#080b16]">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex justify-center"><Logo /></Link>

        {!hasSupabase && (
          <div className="mb-4 rounded-md border border-warning-300 bg-warning-50 p-3 text-xs text-warning-800 dark:border-warning-700 dark:bg-warning-900/30 dark:text-warning-300">
            Backend isn't configured in this deploy yet, accounts aren't live here.
          </div>
        )}

        <div className="card p-6">
          <div className="mb-5 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-navy dark:text-cream" />
            <h1 className="text-lg font-bold text-navy dark:text-cream">
              {mode === 'signin' ? 'Sign in' : 'Create your account'}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-ink">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="input w-full" placeholder="you@company.com" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-ink">Password</label>
              <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} className="input w-full" placeholder="At least 6 characters" />
            </div>

            {error && <p className="text-xs font-medium text-error-600">{error}</p>}
            {info && <p className="text-xs font-medium text-success-600">{info}</p>}

            <button type="submit" disabled={busy} className="btn-primary w-full justify-center">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-muted">
            {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(null); setInfo(null); }} className="font-semibold text-navy hover:underline dark:text-cream">
              {mode === 'signin' ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          <Link to="/app" className="hover:underline">Continue without an account →</Link>
        </p>
      </div>
    </div>
  );
}
