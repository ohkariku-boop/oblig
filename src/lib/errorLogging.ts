import { supabase } from '@/lib/supabase';

let userId: string | null = null;
export function setErrorLogUser(id: string | null) { userId = id; }

export async function logError(message: string, stack?: string) {
  // Always surface it in the browser console too, so local dev isn't
  // silently swallowed if Supabase isn't configured.
  console.error('[oblig]', message, stack);
  if (!supabase) return;
  try {
    await supabase.from('error_logs').insert({
      user_id: userId,
      message: message.slice(0, 2000),
      stack: stack?.slice(0, 4000),
      path: typeof window !== 'undefined' ? window.location.pathname : null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    });
  } catch {
    // Logging the error must never itself throw and break the app further.
  }
}

export function initGlobalErrorLogging() {
  if (typeof window === 'undefined') return;
  window.addEventListener('error', (e) => {
    logError(e.message, e.error?.stack);
  });
  window.addEventListener('unhandledrejection', (e) => {
    const reason = e.reason;
    logError(
      reason instanceof Error ? reason.message : String(reason),
      reason instanceof Error ? reason.stack : undefined,
    );
  });
}
