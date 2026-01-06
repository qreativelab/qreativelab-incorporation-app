// localStorage utilities for auto-save

import { FormData, initialFormData } from './types';

const STORAGE_KEY = 'qreativelab-incorporation-data';

export function saveFormData(data: FormData): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      data,
      lastSaved: Date.now()
    }));
  }
}

export function loadFormData(): FormData {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.data || initialFormData;
      } catch {
        return initialFormData;
      }
    }
  }
  return initialFormData;
}

export function clearFormData(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function getLastSaved(): number | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.lastSaved || null;
      } catch {
        return null;
      }
    }
  }
  return null;
}
