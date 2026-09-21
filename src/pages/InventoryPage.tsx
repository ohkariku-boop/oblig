import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Boxes, Building2, Cpu, Plus, Search, Trash2, AlertTriangle, Bot, Shield,
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader, EmptyState } from '@/components/ui/Feedback';
import type { AiSystem, Vendor, RiskLevel, LifecycleStatus, AiInvolvement } from '@/types';
import { useAuth } from '@/lib/AuthContext';
import { useClient } from '@/lib/ClientContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/lib/ToastContext';
import { logError } from '@/lib/errorLogging';
import { cn, formatDate } from '@/utils/cn';

type Tab = 'systems' | 'vendors';

function mapVendor(r: any): Vendor {
  return {
    id: r.id,
    name: r.name,
    products: r.products ?? undefined,
    aiInvolvement: (r.ai_involvement ?? 'none') as AiInvolvement,
    dataAccess: r.data_access ?? undefined,
    jurisdictions: r.jurisdictions ?? undefined,
    criticality: (r.criticality ?? 'medium') as RiskLevel,
    certifications: r.certifications ?? undefined,
    notes: r.notes ?? undefined,
    reviewStatus: r.review_status ?? 'draft',
    updatedAt: r.updated_at,
  };
}

function mapSystem(r: any, vendors: Vendor[]): AiSystem {
  const vendor = vendors.find(v => v.id === r.vendor_id);
  return {
    id: r.id,
    name: r.name,
    purpose: r.purpose ?? undefined,
    ownerName: r.owner_name ?? undefined,
    businessUnit: r.business_unit ?? undefined,
    jurisdiction: r.jurisdiction ?? undefined,
    lifecycleStatus: (r.lifecycle_status ?? 'discovered') as LifecycleStatus,
    riskLevel: (r.risk_level ?? 'medium') as RiskLevel,
    modelName: r.model_name ?? undefined,
    vendorId: r.vendor_id,
    vendorName: vendor?.name,
    dataSources: r.data_sources ?? undefined,
    dataClassification: r.data_classification ?? undefined,
    processesCustomerData: !!r.processes_customer_data,
    humanOversight: r.human_oversight ?? undefined,
    isAgent: !!r.is_agent,
    agentAllowedActions: r.agent_allowed_actions ?? undefined,
    agentApprovalRequired: !!r.agent_approval_required,
    production: !!r.production,
    controlsNotes: r.controls_notes ?? undefined,
    controlRefs: r.control_refs ?? undefined,
    reviewDate: r.review_date ?? undefined,
    updatedAt: r.updated_at,
  };
}

const riskVariant: Record<RiskLevel, 'success' | 'warning' | 'error' | 'neutral'> = {
  low: 'success', medium: 'neutral', high: 'warning', critical: 'error',
};

export function InventoryPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { activeClient } = useClient();
  const { push } = useToast();
  const [tab, setTab] = useState<Tab>('systems');
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [systems, setSystems] = useState<AiSystem[]>([]);
  const [query, setQuery] = useState('');
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [showSystemForm, setShowSystemForm] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<AiSystem | null>(null);

  async function load() {
    if (!user || !supabase || !activeClient) {
      setVendors([]);
      setSystems([]);
      return;
    }
    const [vRes, sRes] = await Promise.all([
      supabase.from('vendors').select('*').eq('client_id', activeClient.id).order('updated_at', { ascending: false }),
      supabase.from('ai_systems').select('*').eq('client_id', activeClient.id).order('updated_at', { ascending: false }),
    ]);
    if (vRes.error) logError(`vendors load: ${vRes.error.message}`);
    if (sRes.error) logError(`ai_systems load: ${sRes.error.message}`);
    const vList = (vRes.data ?? []).map(mapVendor);
    setVendors(vList);
    setSystems((sRes.data ?? []).map(r => mapSystem(r, vList)));
  }

  useEffect(() => { load(); }, [user, activeClient]);

  const stats = useMemo(() => {
    const highRisk = systems.filter(s => s.riskLevel === 'high' || s.riskLevel === 'critical').length;
    const customerData = systems.filter(s => s.processesCustomerData).length;
    const agents = systems.filter(s => s.isAgent).length;
    const prod = systems.filter(s => s.production || s.lifecycleStatus === 'production').length;
    return { highRisk, customerData, agents, prod };
  }, [systems]);

  const filteredSystems = systems.filter(s =>
    !query || s.name.toLowerCase().includes(query.toLowerCase()) ||
    (s.purpose ?? '').toLowerCase().includes(query.toLowerCase()) ||
    (s.vendorName ?? '').toLowerCase().includes(query.toLowerCase()),
  );
  const filteredVendors = vendors.filter(v =>
    !query || v.name.toLowerCase().includes(query.toLowerCase()) ||
    (v.products ?? '').toLowerCase().includes(query.toLowerCase()),
  );

  async function createVendor(input: {
    name: string; products: string; aiInvolvement: AiInvolvement; criticality: RiskLevel; jurisdictions: string;
  }) {
    if (!user || !supabase || !activeClient) return;
    const { error } = await supabase.from('vendors').insert({
      user_id: user.id,
      client_id: activeClient.id,
      name: input.name,
      products: input.products || null,
      ai_involvement: input.aiInvolvement,
      criticality: input.criticality,
      jurisdictions: input.jurisdictions || null,
    });
    if (error) {
      logError(error.message);
      push('Could not create vendor. Run migration 0006 if tables are missing.', 'error');
      return;
    }
    setShowVendorForm(false);
    push('Vendor added.');
    await load();
  }

  async function createSystem(input: {
    name: string; purpose: string; ownerName: string; riskLevel: RiskLevel;
    vendorId: string; processesCustomerData: boolean; production: boolean;
    isAgent: boolean; modelName: string; humanOversight: string; controlRefs: string;
  }) {
    if (!user || !supabase || !activeClient) return;
    const { error } = await supabase.from('ai_systems').insert({
      user_id: user.id,
      client_id: activeClient.id,
      name: input.name,
      purpose: input.purpose || null,
      owner_name: input.ownerName || null,
      risk_level: input.riskLevel,
      vendor_id: input.vendorId || null,
      processes_customer_data: input.processesCustomerData,
      production: input.production,
      lifecycle_status: input.production ? 'production' : 'discovered',
      is_agent: input.isAgent,
      model_name: input.modelName || null,
      human_oversight: input.humanOversight || null,
      control_refs: input.controlRefs || null,
    });
    if (error) {
      logError(error.message);
      push('Could not create AI system. Run migration 0006 if tables are missing.', 'error');
      return;
    }
    setShowSystemForm(false);
    push('AI system added.');
    await load();
  }

  async function deleteVendor(id: string) {
    if (!supabase || !confirm('Delete this vendor? Systems will keep their other fields.')) return;
    const { error } = await supabase.from('vendors').delete().eq('id', id);
    if (error) { push(error.message, 'error'); return; }
    push('Vendor deleted.');
    await load();
  }

  async function deleteSystem(id: string) {
    if (!supabase || !confirm('Delete this AI system?')) return;
    const { error } = await supabase.from('ai_systems').delete().eq('id', id);
    if (error) { push(error.message, 'error'); return; }
    setSelectedSystem(null);
    push('AI system deleted.');
    await load();
  }

  if (!user) {
    return (
      <div>
        <PageHeader title="AI & Vendor Inventory" description="Catalogue AI systems and technology vendors — the foundation for continuous governance." />
        <Card>
          <EmptyState
            icon={<Boxes className="h-6 w-6" />}
            title="Sign in to build your inventory"
            description="Track AI systems (the unit of analysis), vendors, risk, and customer-data exposure."
          />
          <div className="pb-6 text-center">
            <button onClick={() => navigate('/login')} className="btn-primary">Sign in</button>
          </div>
        </Card>
      </div>
    );
  }

  if (showVendorForm) {
    return <VendorForm onCancel={() => setShowVendorForm(false)} onSave={createVendor} />;
  }
  if (showSystemForm) {
    return <SystemForm vendors={vendors} onCancel={() => setShowSystemForm(false)} onSave={createSystem} />;
  }

  return (
    <div>
      <PageHeader
        title="AI & Vendor Inventory"
        description="AI systems are the unit of analysis. Vendors, models, data, and controls attach to each system."
        action={
          <>
            <button className="btn-secondary" onClick={() => { setTab('vendors'); setShowVendorForm(true); }}>
              <Building2 className="h-4 w-4" /> Add vendor
            </button>
            <button className="btn-primary" onClick={() => { setTab('systems'); setShowSystemForm(true); }}>
              <Plus className="h-4 w-4" /> Add AI system
            </button>
          </>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="AI systems" value={systems.length} icon={Cpu} />
        <Stat label="Vendors" value={vendors.length} icon={Building2} />
        <Stat label="High / critical risk" value={stats.highRisk} icon={AlertTriangle} warn={stats.highRisk > 0} />
        <Stat label="Agents" value={stats.agents} icon={Bot} />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex rounded-lg border border-app p-0.5">
          <button
            type="button"
            onClick={() => setTab('systems')}
            className={cn('rounded-md px-3 py-1.5 text-sm font-medium', tab === 'systems' ? 'bg-navy text-cream' : 'text-muted')}
          >
            AI systems ({systems.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('vendors')}
            className={cn('rounded-md px-3 py-1.5 text-sm font-medium', tab === 'vendors' ? 'bg-navy text-cream' : 'text-muted')}
          >
            Vendors ({vendors.length})
          </button>
        </div>
        <div className="relative flex-1 min-w-[12rem]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input className="input w-full pl-9" placeholder="Search…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>

      {tab === 'systems' && (
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-3">
            {filteredSystems.length === 0 ? (
              <Card>
                <EmptyState
                  icon={<Cpu className="h-6 w-6" />}
                  title="No AI systems yet"
                  description="Add systems such as customer assistants, document analysis, or internal copilots. One vendor can power many systems with different risk."
                />
              </Card>
            ) : (
              filteredSystems.map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSystem(s)}
                  className={cn(
                    'w-full rounded-xl border border-app surface p-4 text-left transition hover:border-primary-300',
                    selectedSystem?.id === s.id && 'border-primary-400 ring-1 ring-primary-200',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-navy dark:text-cream">{s.name}</p>
                      <p className="mt-0.5 text-xs text-muted line-clamp-2">{s.purpose || 'No purpose set'}</p>
                    </div>
                    <Badge variant={riskVariant[s.riskLevel]}>{s.riskLevel}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
                    {s.isAgent && <span className="inline-flex items-center gap-1"><Bot className="h-3 w-3" /> Agent</span>}
                    {s.production && <span>Production</span>}
                    {s.processesCustomerData && <span>Customer data</span>}
                    {s.vendorName && <span>{s.vendorName}</span>}
                  </div>
                </button>
              ))
            )}
          </div>
          <div className="lg:col-span-2">
            {selectedSystem ? (
              <SystemDetail
                system={selectedSystem}
                onDelete={() => deleteSystem(selectedSystem.id)}
              />
            ) : (
              <Card>
                <CardBody>
                  <p className="text-sm text-muted">Select a system to see controls, vendor, and agent profile fields.</p>
                  <p className="mt-3 text-xs text-muted">
                    Tip: after assessment, add systems that process customer data or use third-party models — that feeds coverage and gaps.
                  </p>
                  <Link to="/app/assessment" className="mt-4 inline-block text-sm font-medium text-primary-600">Open assessment →</Link>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      )}

      {tab === 'vendors' && (
        <div className="grid gap-3 sm:grid-cols-2">
          {filteredVendors.length === 0 ? (
            <Card className="sm:col-span-2">
              <EmptyState icon={<Building2 className="h-6 w-6" />} title="No vendors yet" description="Register technology and AI providers (e.g. cloud, model APIs, SaaS)." />
            </Card>
          ) : (
            filteredVendors.map(v => (
              <Card key={v.id}>
                <CardBody>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-navy dark:text-cream">{v.name}</p>
                      <p className="mt-1 text-xs text-muted">{v.products || 'No products listed'}</p>
                    </div>
                    <button type="button" className="text-muted hover:text-error-600" onClick={() => deleteVendor(v.id)} aria-label="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="neutral">AI: {v.aiInvolvement}</Badge>
                    <Badge variant={riskVariant[v.criticality]}>{v.criticality}</Badge>
                  </div>
                  <p className="mt-2 text-xs text-muted">
                    {systems.filter(s => s.vendorId === v.id).length} linked system(s) · Updated {formatDate(v.updatedAt)}
                  </p>
                </CardBody>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, icon: Icon, warn }: { label: string; value: number; icon: typeof Cpu; warn?: boolean }) {
  return (
    <Card>
      <CardBody className="flex items-center gap-3">
        <div className={cn('rounded-lg p-2', warn ? 'bg-warning-50 text-warning-700' : 'bg-slate-100 text-navy dark:bg-slate-800 dark:text-cream')}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-navy dark:text-cream">{value}</p>
          <p className="text-xs text-muted">{label}</p>
        </div>
      </CardBody>
    </Card>
  );
}

function SystemDetail({ system, onDelete }: { system: AiSystem; onDelete: () => void }) {
  const refs = (system.controlRefs || '').split(/[,;\s]+/).map(s => s.trim()).filter(Boolean);
  return (
    <Card>
      <CardHeader title={system.name} subtitle={system.lifecycleStatus} icon={<Shield className="h-5 w-5" />} />
      <CardBody className="space-y-3 text-sm">
        <Row label="Purpose" value={system.purpose} />
        <Row label="Owner" value={system.ownerName} />
        <Row label="Vendor" value={system.vendorName} />
        <Row label="Model" value={system.modelName} />
        <Row label="Risk" value={system.riskLevel} />
        <Row label="Customer data" value={system.processesCustomerData ? 'Yes' : 'No'} />
        <Row label="Human oversight" value={system.humanOversight} />
        {system.isAgent && (
          <>
            <Row label="Agent" value="Yes" />
            <Row label="Allowed actions" value={system.agentAllowedActions} />
            <Row label="Approval required" value={system.agentApprovalRequired ? 'Yes' : 'No'} />
          </>
        )}
        <div>
          <p className="text-xs font-medium text-muted">Control refs</p>
          {refs.length ? (
            <div className="mt-1 flex flex-wrap gap-1">
              {refs.map(r => <Badge key={r} variant="neutral">{r}</Badge>)}
            </div>
          ) : (
            <p className="mt-1 text-xs text-muted">None yet — add MAS/BNM-style control IDs when mapping.</p>
          )}
        </div>
        <Row label="Controls notes" value={system.controlsNotes} />
        <div className="flex gap-2 pt-2">
          <Link to="/app/evidence" className="btn-secondary text-xs">Link evidence</Link>
          <button type="button" className="btn-secondary text-xs text-error-600" onClick={onDelete}>Delete</button>
        </div>
      </CardBody>
    </Card>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className="text-navy dark:text-cream">{value || '—'}</p>
    </div>
  );
}

function VendorForm({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: (input: { name: string; products: string; aiInvolvement: AiInvolvement; criticality: RiskLevel; jurisdictions: string }) => void;
}) {
  const [name, setName] = useState('');
  const [products, setProducts] = useState('');
  const [aiInvolvement, setAiInvolvement] = useState<AiInvolvement>('partial');
  const [criticality, setCriticality] = useState<RiskLevel>('medium');
  const [jurisdictions, setJurisdictions] = useState('');
  return (
    <div>
      <PageHeader title="Add vendor" description="Technology or AI provider." action={<button className="btn-secondary" onClick={onCancel}>Cancel</button>} />
      <Card>
        <CardBody className="space-y-4 max-w-lg">
          <Field label="Name" value={name} onChange={setName} required />
          <Field label="Products / services" value={products} onChange={setProducts} />
          <label className="block text-sm font-medium">AI involvement
            <select className="input mt-1 w-full" value={aiInvolvement} onChange={e => setAiInvolvement(e.target.value as AiInvolvement)}>
              <option value="none">None</option>
              <option value="partial">Partial</option>
              <option value="core">Core to product</option>
            </select>
          </label>
          <label className="block text-sm font-medium">Criticality
            <select className="input mt-1 w-full" value={criticality} onChange={e => setCriticality(e.target.value as RiskLevel)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </label>
          <Field label="Jurisdictions" value={jurisdictions} onChange={setJurisdictions} placeholder="e.g. SG, MY" />
          <button
            type="button"
            className="btn-primary"
            disabled={!name.trim()}
            onClick={() => onSave({ name: name.trim(), products, aiInvolvement, criticality, jurisdictions })}
          >
            Save vendor
          </button>
        </CardBody>
      </Card>
    </div>
  );
}

function SystemForm({
  vendors,
  onCancel,
  onSave,
}: {
  vendors: Vendor[];
  onCancel: () => void;
  onSave: (input: {
    name: string; purpose: string; ownerName: string; riskLevel: RiskLevel;
    vendorId: string; processesCustomerData: boolean; production: boolean;
    isAgent: boolean; modelName: string; humanOversight: string; controlRefs: string;
  }) => void;
}) {
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('medium');
  const [vendorId, setVendorId] = useState('');
  const [processesCustomerData, setProcessesCustomerData] = useState(false);
  const [production, setProduction] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [modelName, setModelName] = useState('');
  const [humanOversight, setHumanOversight] = useState('');
  const [controlRefs, setControlRefs] = useState('');
  return (
    <div>
      <PageHeader title="Add AI system" description="One use case = one system (even if the vendor is shared)." action={<button className="btn-secondary" onClick={onCancel}>Cancel</button>} />
      <Card>
        <CardBody className="space-y-4 max-w-lg">
          <Field label="Name" value={name} onChange={setName} required placeholder="e.g. Claims triage assistant" />
          <Field label="Purpose" value={purpose} onChange={setPurpose} />
          <Field label="Owner" value={ownerName} onChange={setOwnerName} />
          <Field label="Model" value={modelName} onChange={setModelName} placeholder="e.g. provider + model id" />
          <label className="block text-sm font-medium">Vendor
            <select className="input mt-1 w-full" value={vendorId} onChange={e => setVendorId(e.target.value)}>
              <option value="">— None yet —</option>
              {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </label>
          <label className="block text-sm font-medium">Risk level
            <select className="input mt-1 w-full" value={riskLevel} onChange={e => setRiskLevel(e.target.value as RiskLevel)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </label>
          <Field label="Human oversight" value={humanOversight} onChange={setHumanOversight} placeholder="e.g. Required before customer-facing send" />
          <Field label="Control refs" value={controlRefs} onChange={setControlRefs} placeholder="e.g. TPR, GOV, AI-oversight" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={processesCustomerData} onChange={e => setProcessesCustomerData(e.target.checked)} />
            Processes customer data
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={production} onChange={e => setProduction(e.target.checked)} />
            In production
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isAgent} onChange={e => setIsAgent(e.target.checked)} />
            AI agent (can take actions)
          </label>
          <button
            type="button"
            className="btn-primary"
            disabled={!name.trim()}
            onClick={() => onSave({
              name: name.trim(), purpose, ownerName, riskLevel, vendorId,
              processesCustomerData, production, isAgent, modelName, humanOversight, controlRefs,
            })}
          >
            Save AI system
          </button>
        </CardBody>
      </Card>
    </div>
  );
}

function Field({
  label, value, onChange, required, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        className="input mt-1 w-full"
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
      />
    </label>
  );
}
