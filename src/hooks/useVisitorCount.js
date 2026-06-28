import { useEffect, useState } from 'react';

/**
 * Real visitor counter backed by Abacus (a free, CORS-enabled, CountAPI-compatible
 * service — no account, no backend). It increments once per browser session
 * (tracked via sessionStorage) and just reads the value on subsequent views.
 *
 * If the service is unreachable, `error` is set so the UI shows a clean
 * placeholder instead of a fake number.
 *
 * Change the namespace/key to reset or isolate the counter.
 */
const BASE = 'https://abacus.jasoncameron.dev';
const NAMESPACE = 'aissarak8-portfolio';
const KEY = 'visits';
const SESSION_FLAG = 'visit-counted';

export function useVisitorCount() {
  const [state, setState] = useState({ count: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        // Increment once per session; otherwise just read the current total.
        const counted = sessionStorage.getItem(SESSION_FLAG);
        const endpoint = counted ? 'get' : 'hit';
        const res = await fetch(`${BASE}/${endpoint}/${NAMESPACE}/${KEY}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('counter unavailable');
        const data = await res.json();
        if (!counted) sessionStorage.setItem(SESSION_FLAG, '1');
        setState({ count: data.value, loading: false, error: null });
      } catch (err) {
        if (err.name !== 'AbortError') {
          setState({ count: null, loading: false, error: err.message });
        }
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return state;
}
