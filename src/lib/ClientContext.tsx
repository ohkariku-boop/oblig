import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/AuthContext';
import type { ChecklistState } from '@/data/assessment';

export interface Client { id: string; name: string; created_at: string }

interface ClientContextValue {
  clients: Client[];
  activeClient: Client | null;
  setActiveClientId: (id: string) => void;
  addClient: (name: string) => Promise<void>;
  assessmentState: ChecklistState;
  setAssessmentState: (updater: ChecklistState | ((prev: ChecklistState) => ChecklistState)) => void;
  loading: boolean;
}

const ClientContext = createContext<ClientContextValue | null>(null);

const ANON_KEY = 'oblig_scorecard_v1'; // unchanged, so existing anonymous users keep their local progress
const clientKey = (id: string) => `oblig_scorecard_client_${id}`;
const activeClientStorageKey = (userId: string) => `oblig_active_client_${userId}`;

export function ClientProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [activeClientId, setActiveClientIdState] = useState<string | null>(null);
  const [assessmentState, setAssessmentStateRaw] = useState<ChecklistState>(() => {
    try { return JSON.parse(localStorage.getItem(ANON_KEY) ?? '{}'); } catch { return {}; }
  });
  const [loading, setLoading] = useState(true);

  // Load this user's clients on sign-in; reset to anonymous mode on sign-out.
  useEffect(() => {
    if (!user || !supabase) {
      setClients([]);
      setActiveClientIdState(null);
      try { setAssessmentStateRaw(JSON.parse(localStorage.getItem(ANON_KEY) ?? '{}')); } catch { setAssessmentStateRaw({}); }
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase.from('clients').select('*').eq('user_id', user.id).order('created_at', { ascending: true })
      .then(({ data }) => {
        const list = data ?? [];
        setClients(list);
        const stored = localStorage.getItem(activeClientStorageKey(user.id));
        const initial = (stored && list.some(c => c.id === stored)) ? stored : list[0]?.id ?? null;
        setActiveClientIdState(initial);
        setLoading(false);
      });
  }, [user]);

  // Load the active client's assessment whenever it changes.
  useEffect(() => {
    if (!user || !supabase || !activeClientId) return;
    localStorage.setItem(activeClientStorageKey(user.id), activeClientId);
    // Show the cached copy immediately, then reconcile with the server.
    try { setAssessmentStateRaw(JSON.parse(localStorage.getItem(clientKey(activeClientId)) ?? '{}')); } catch { setAssessmentStateRaw({}); }
    supabase.from('assessments').select('answers').eq('client_id', activeClientId).maybeSingle()
      .then(({ data }) => { if (data?.answers) setAssessmentStateRaw(data.answers as ChecklistState); });
  }, [user, activeClientId]);

  function setActiveClientId(id: string) {
    setActiveClientIdState(id);
  }

  async function addClient(name: string) {
    if (!user || !supabase) return;
    const { data, error } = await supabase.from('clients').insert({ user_id: user.id, name }).select().single();
    if (error || !data) return;
    setClients(prev => [...prev, data]);
    setActiveClientId(data.id);
  }

  function setAssessmentState(updater: ChecklistState | ((prev: ChecklistState) => ChecklistState)) {
    setAssessmentStateRaw(prev => {
      const next = typeof updater === 'function' ? (updater as (p: ChecklistState) => ChecklistState)(prev) : updater;
      if (user && activeClientId && supabase) {
        localStorage.setItem(clientKey(activeClientId), JSON.stringify(next));
        supabase.from('assessments').upsert({ client_id: activeClientId, user_id: user.id, answers: next, updated_at: new Date().toISOString() }).then();
      } else {
        localStorage.setItem(ANON_KEY, JSON.stringify(next));
      }
      return next;
    });
  }

  const activeClient = clients.find(c => c.id === activeClientId) ?? null;

  return (
    <ClientContext.Provider value={{ clients, activeClient, setActiveClientId, addClient, assessmentState, setAssessmentState, loading }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const ctx = useContext(ClientContext);
  if (!ctx) throw new Error('useClient must be used within ClientProvider');
  return ctx;
}
