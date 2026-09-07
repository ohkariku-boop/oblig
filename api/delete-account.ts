export const config = { runtime: 'edge' };

/**
 * Permanently deletes the authenticated user's auth.users row (and cascades
 * to their data via RLS / foreign keys). Requires SUPABASE_SERVICE_ROLE_KEY
 * to be set in the Vercel project environment.
 */
export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !serviceRoleKey || !anonKey) {
    return new Response(
      JSON.stringify({ error: 'Account deletion is not fully configured yet (missing service role key).' }),
      { status: 503 },
    );
  }

  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Sign in required' }), { status: 401 });
  }

  // Verify the caller is a real user using the anon key + their JWT.
  const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      Authorization: authHeader,
      apikey: anonKey,
    },
  });
  if (!userRes.ok) {
    return new Response(JSON.stringify({ error: 'Invalid session' }), { status: 401 });
  }
  const user = (await userRes.json()) as { id?: string };
  if (!user?.id) {
    return new Response(JSON.stringify({ error: 'Invalid session' }), { status: 401 });
  }

  // Delete with the service role.
  const deleteRes = await fetch(`${supabaseUrl}/auth/v1/admin/users/${user.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${serviceRoleKey}`,
      apikey: serviceRoleKey,
    },
  });

  if (!deleteRes.ok) {
    const text = await deleteRes.text().catch(() => '');
    return new Response(
      JSON.stringify({ error: 'Failed to delete account', detail: text.slice(0, 200) }),
      { status: 500 },
    );
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
