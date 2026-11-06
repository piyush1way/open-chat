/**
 * Anonymous authentication for StrangerConnect.
 *
 * Every visitor gets an anonymous Supabase user — no email, no password.
 * The session is stored in localStorage by the Supabase client, so the same
 * anonymous user is restored after a refresh instead of creating a new one.
 *
 * Usage:
 *   - Wrap the app once in <AuthProvider> (done in src/routes/__root.tsx).
 *   - Read state anywhere with `const { user, session, loading, error } = useAuth()`.
 *
 * The sign-in itself is guarded by a module-level promise so it runs at most
 * once per page load, even if React StrictMode mounts the provider twice or
 * the user navigates between routes.
 */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export interface AuthState {
  /** The anonymous user, or null while signing in / after an error. */
  user: User | null;
  /** The full session (contains the access token). Null when signed out. */
  session: Session | null;
  /** True until the initial session restore / anonymous sign-in settles. */
  loading: boolean;
  /** Human-readable auth error, or null when everything is fine. */
  error: string | null;
}

const AuthContext = createContext<AuthState | null>(null);

/**
 * Ensures there is a session: restores an existing one or signs in
 * anonymously. Module-level so the in-flight promise is shared — React can
 * mount the provider any number of times and this still only runs once.
 */
let initPromise: Promise<{ session: Session | null; error: string | null }> | null = null;

function ensureSession() {
  initPromise ??= (async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      if (session) return { session, error: null };

      const { data, error: signInError } = await supabase.auth.signInAnonymously();
      if (signInError) throw signInError;
      return { session: data.session, error: null };
    } catch (err) {
      return {
        session: null,
        error: err instanceof Error ? err.message : "Could not start an anonymous session.",
      };
    }
  })();
  return initPromise;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    // 1. Restore the saved session, or create an anonymous one.
    ensureSession().then(({ session, error }) => {
      if (cancelled) return;
      setState({ user: session?.user ?? null, session, loading: false, error });
    });

    // 2. Keep state in sync with later auth events (token refresh, sign-out).
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState((prev) =>
        prev.loading
          ? prev // initial ensureSession() above owns the first settle
          : { user: session?.user ?? null, session, loading: false, error: null },
      );
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(() => state, [state]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Read the current auth state. Must be used inside <AuthProvider>. */
export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
