// Simple API client for the admin app

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('token') || null;
  } catch {
    return null;
  }
}

export async function apiFetch<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(init.headers || {}),
  };
  if (token) {
    (headers as Record<string,string>).Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, { ...init, headers });
  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      message = data?.error || data?.message || message;
    } catch {
      try { message = await res.text(); } catch {}
    }
    const err = new Error(message);
    (err as any).status = res.status;
    throw err;
  }
  return (await res.json()) as T;
}

export async function apiPost<T = any>(path: string, body: unknown): Promise<T> {
  return apiFetch<T>(path, { method: 'POST', body: JSON.stringify(body) });
}


