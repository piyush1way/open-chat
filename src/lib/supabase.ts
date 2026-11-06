/**
 * Reusable Supabase browser client.
 *
 * Credentials come from environment variables — never hardcode keys here:
 *   VITE_SUPABASE_URL             e.g. https://<project-ref>.supabase.co
 *   VITE_SUPABASE_PUBLISHABLE_KEY the anon/publishable key (safe for browsers;
 *                                 it is protected by Supabase Row Level Security)
 *
 * The client is a module-level singleton so the whole app shares one
 * connection and one session. Session persistence to localStorage is on by
 * default, which is what restores the anonymous user across page refreshes.
 */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
const supabaseKey = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] as string | undefined;

/**
 * The shared client, or null when the environment variables are not
 * configured yet. Null instead of a throw so the UI keeps working (the auth
 * provider surfaces the problem as a readable error state).
 */
export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: true, // keep the anonymous session in localStorage
          autoRefreshToken: true, // silently refresh before expiry
          detectSessionInUrl: true,
        },
      })
    : null;

if (!supabase) {
  // Surfaced loudly in dev so a missing env var is obvious instead of
  // failing later with a confusing network error.
  console.error(
    "[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY. " +
      "Add them to your environment before using authentication.",
  );
}
