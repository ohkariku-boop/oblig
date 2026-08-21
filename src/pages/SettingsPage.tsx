import { useState } from 'react';
import {
  Building2, Users, Bell, Palette, CreditCard, Key, Shield,
  Save, Check, type LucideIcon,
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader, ComingSoon } from '@/components/ui/Feedback';
import { useTheme } from '@/theme';
import { cn } from '@/utils/cn';
import { sampleFrameworks } from '@/data/sampleData';

type Tab = 'organisation' | 'users' | 'notifications' | 'appearance' | 'billing' | 'api';

const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: 'organisation', label: 'Organisation Profile', icon: Building2 },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'api', label: 'API Keys', icon: Key },
];

export function SettingsPage() {
  const [tab, setTab] = useState<Tab>('organisation');
  const { theme, setTheme } = useTheme();

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
                  <Field label="Organisation name" defaultValue="Acme Growth Co." />
                  <Field label="Website" defaultValue="acme.example.com" />
                  <SelectField label="Industry" options={['Technology / SaaS', 'Financial Services', 'Healthcare', 'Retail', 'Manufacturing', 'Other']} />
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
                  { name: 'Admin (You)', email: 'admin@acme.example.com', role: 'Owner' },
                  { name: 'IT Lead', email: 'it@acme.example.com', role: 'Editor' },
                  { name: 'People Ops', email: 'people@acme.example.com', role: 'Viewer' },
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
