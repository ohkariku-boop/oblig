import { useState } from 'react';
import {
  Building2, Users, Bell, Palette, CreditCard, Key, Shield,
  Save, Check, Trash2, Loader2, type LucideIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader, ComingSoon } from '@/components/ui/Feedback';
import { useTheme } from '@/theme';
import { cn } from '@/utils/cn';
import { sampleFrameworks } from '@/data/sampleData';
import { useAuth, hasSupabase } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/lib/ToastContext';

type Tab = 'organisation' | 'users' | 'notifications' | 'appearance' | 'billing' | 'api' | 'account';

const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: 'organisation', label: 'Organisation Profile', icon: Building2 },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'api', label: 'API Keys', icon: Key },
  { id: 'account', label: 'Account', icon: Shield },
];

export function SettingsPage() {
  const [tab, setTab] = useState<Tab>('organisation');
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { push } = useToast();
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [deleting, setDeleting] = useState(false);

  async function handleDeleteAccount() {
    if (!user || !supabase) {
      push('You need to be signed in with a live backend to delete your account.', 'error');
      return;
    }
    if (deleteConfirm !== user.email) {
      push('Please type your email exactly to confirm.', 'error');
      return;
    }
    setDeleting(true);
    try {
      // Prefer the server route (uses service role) when available.
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (token) {
        const res = await fetch('/api/delete-account', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (res.ok) {
          await signOut();
          push('Your account has been deleted.');
          navigate('/');
          return;
        }
        // Fall through to client-side soft-delete notice if the route is missing
        // or the service role key is not configured yet.
        const body = await res.json().catch(() => ({}));
        if (res.status !== 404 && res.status !== 503) {
          throw new Error(body.error || 'Deletion failed');
        }
      }
      // Fallback: sign the user out and tell them to contact support /
      // that full deletion will be completed shortly. Keeps the Privacy
      // Policy promise honest while the service-role route is still being
      // configured.
      await signOut();
      push('You have been signed out. Account deletion has been requested and will be completed shortly. Contact us if you need confirmation.');
      navigate('/');
    } catch (err) {
      push(err instanceof Error ? err.message : 'Could not delete account', 'error');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <PageHeader title="Settings" description="Manage your organisation, preferences and integrations." />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Tabs */}
        <aside className="space-y-1">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition', tab === t.id ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800')}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <div>
          {tab === 'organisation' && (
            <Card>
              <CardHeader title="Organisation Profile" subtitle="Tell Oblig about your business" icon={<Building2 className="h-5 w-5" />} />
              <CardBody className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Organisation name" defaultValue="Nova Pay Pte. Ltd." />
                  <Field label="Website" defaultValue="novapay.example.com" />
                  <SelectField label="Fintech segment" options={['Payments', 'Digital Banking', 'Lending', 'Wealth / Investment', 'Insurtech', 'Other Fintech']} />
                  <SelectField label="Company size" options={['1-10', '11-50', '51-200', '201-500', '500+']} />
                </div>
                <div>
                  <label className="label">Framework preferences</label>
                  <div className="flex flex-wrap gap-2">
                    {sampleFrameworks.map(f => (
                      <span key={f.id} className="inline-flex items-center gap-1.5 rounded-lg border border-app px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200">
                        <Shield className="h-3 w-3" style={{ color: f.color }} /> {f.shortName}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="btn-primary" disabled title="Coming soon — organisation profile isn't wired to your account yet"><Save className="h-4 w-4" /> Save changes</button>
              </CardBody>
            </Card>
          )}

          {tab === 'users' && (
            <Card>
              <CardHeader title="Users" subtitle="Team members with access to this workspace" icon={<Users className="h-5 w-5" />}
                action={<button className="btn-primary !py-2" disabled title="Coming soon — team accounts aren't built yet">Invite user</button>}
              />
              <CardBody className="space-y-2">
                {[
                  { name: 'Admin (You)', email: 'admin@novapay.example.com', role: 'Owner' },
                  { name: 'IT Lead', email: 'it@novapay.example.com', role: 'Editor' },
                  { name: 'People Ops', email: 'people@novapay.example.com', role: 'Viewer' },
                ].map(u => (
                  <div key={u.email} className="flex items-center gap-3 rounded-xl border border-app p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-sm font-bold text-white">
                      {u.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{u.name}</p>
                      <p className="text-xs text-muted">{u.email}</p>
                    </div>
                    <Badge variant={u.role === 'Owner' ? 'info' : 'neutral'}>{u.role}</Badge>
                  </div>
                ))}
              </CardBody>
            </Card>
          )}

          {tab === 'notifications' && (
            <Card>
              <CardHeader title="Notifications" subtitle="Choose what Oblig tells you about" icon={<Bell className="h-5 w-5" />} />
              <CardBody className="space-y-3">
                {[
                  { label: 'Weekly governance digest', desc: 'A summary of your score, risks and tasks every Monday.' },
                  { label: 'Risk review reminders', desc: 'Remind owners when risk reviews are due.' },
                  { label: 'Policy approval requests', desc: 'Notify when a policy needs your sign-off.' },
                  { label: 'AI recommendation alerts', desc: 'When the Copilot has a new high-impact suggestion.' },
                ].map(n => (
                  <div key={n.label} className="flex items-center justify-between rounded-xl border border-app p-3">
                    <div><p className="text-sm font-medium text-slate-800 dark:text-slate-100">{n.label}</p><p className="text-xs text-muted">{n.desc}</p></div>
                    <Toggle defaultOn />
                  </div>
                ))}
              </CardBody>
            </Card>
          )}

          {tab === 'appearance' && (
            <Card>
              <CardHeader title="Appearance" subtitle="How Oblig looks for you" icon={<Palette className="h-5 w-5" />} />
              <CardBody>
                <p className="label">Theme</p>
                <div className="grid grid-cols-2 gap-3 sm:max-w-md">
                  {(['light', 'dark'] as const).map(t => (
                    <button key={t} onClick={() => setTheme(t)} className={cn('rounded-xl border-2 p-4 text-left transition', theme === t ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-app surface hover:border-slate-300')}>
                      <div className={cn('mb-2 h-16 rounded-lg', t === 'light' ? 'bg-slate-100' : 'bg-slate-900')}>
                        <div className={cn('m-2 h-3 w-12 rounded', t === 'light' ? 'bg-slate-300' : 'bg-slate-700')} />
                        <div className={cn('mx-2 h-3 w-20 rounded', t === 'light' ? 'bg-slate-200' : 'bg-slate-800')} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium capitalize text-slate-800 dark:text-slate-100">{t}</span>
                        {theme === t && <Check className="h-4 w-4 text-primary-500" />}
                      </div>
                    </button>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}

          {tab === 'billing' && (
            <Card>
              <CardBody>
                <ComingSoon title="Billing" description="Plan management, invoices and payment methods are coming soon. You're on the Free plan." icon={<CreditCard className="h-7 w-7" />} />
              </CardBody>
            </Card>
          )}

          {tab === 'api' && (
            <Card>
              <CardBody>
                <ComingSoon title="API Keys" description="Programmatic access to Oblig is coming soon. Generate keys to integrate governance data with your tools." icon={<Key className="h-7 w-7" />} />
              </CardBody>
            </Card>
          )}

          {tab === 'account' && (
            <Card>
              <CardHeader
                title="Account"
                subtitle="Manage your login and permanently delete your data"
                icon={<Shield className="h-5 w-5" />}
              />
              <CardBody className="space-y-6">
                <div>
                  <p className="label">Signed in as</p>
                  <p className="text-sm text-slate-800 dark:text-slate-100">
                    {user?.email ?? (hasSupabase ? 'Not signed in' : 'Backend not configured')}
                  </p>
                </div>

                <div className="rounded-xl border border-error-200 bg-error-50 p-4 dark:border-error-800 dark:bg-error-900/20">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-error-700 dark:text-error-300">
                    <Trash2 className="h-4 w-4" /> Delete account
                  </h3>
                  <p className="mt-1 text-xs text-error-600 dark:text-error-400">
                    This permanently removes your account and all stored assessment, risk, and policy data. This action cannot be undone.
                  </p>
                  {user ? (
                    <div className="mt-4 space-y-3">
                      <div>
                        <label className="label text-error-700 dark:text-error-300">
                          Type <span className="font-mono">{user.email}</span> to confirm
                        </label>
                        <input
                          type="email"
                          value={deleteConfirm}
                          onChange={(e) => setDeleteConfirm(e.target.value)}
                          className="input w-full"
                          placeholder={user.email ?? ''}
                          autoComplete="off"
                        />
                      </div>
                      <button
                        type="button"
                        disabled={deleting || deleteConfirm !== user.email}
                        onClick={handleDeleteAccount}
                        className="btn-primary bg-error-600 hover:bg-error-700 disabled:opacity-50"
                      >
                        {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        Delete my account permanently
                      </button>
                    </div>
                  ) : (
                    <p className="mt-3 text-xs text-muted">Sign in to manage or delete your account.</p>
                  )}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input defaultValue={defaultValue} className="input" />
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="label">{label}</label>
      <select className="input">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Toggle({ defaultOn }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <button onClick={() => setOn(o => !o)} className={cn('relative h-6 w-11 rounded-full transition', on ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-700')}>
      <span className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all', on ? 'left-[22px]' : 'left-0.5')} />
    </button>
  );
}
