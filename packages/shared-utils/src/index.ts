import { v4 as uuidv4 } from 'uuid';

// ─── ID Utils ─────────────────────────────────────────────────────────────────
export const generateId = (): string => uuidv4();

export const generateRequestId = (): string => `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

// ─── Date Utils ───────────────────────────────────────────────────────────────
export const toISO = (date: Date = new Date()): string => date.toISOString();

export const daysAgo = (days: number): Date => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
};

export const formatDate = (iso: string, locale = 'en-US'): string =>
  new Date(iso).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });

// ─── Price Utils ──────────────────────────────────────────────────────────────
export const formatCurrency = (value: number, currency = 'USD'): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);

export const formatCompactPrice = (value: number): string => {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
};

// ─── String Utils ─────────────────────────────────────────────────────────────
export const slugify = (text: string): string =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const capitalize = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

export const titleCase = (text: string): string =>
  text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

export const truncate = (text: string, maxLength: number, suffix = '...'): string =>
  text.length <= maxLength ? text : text.slice(0, maxLength - suffix.length) + suffix;

// ─── Array Utils ──────────────────────────────────────────────────────────────
export const chunk = <T>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
};

export const unique = <T>(arr: T[]): T[] => [...new Set(arr)];

export const groupBy = <T>(arr: T[], key: keyof T): Record<string, T[]> =>
  arr.reduce((acc, item) => {
    const k = String(item[key]);
    (acc[k] = acc[k] || []).push(item);
    return acc;
  }, {} as Record<string, T[]>);

export const sortBy = <T>(arr: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] =>
  [...arr].sort((a, b) => {
    const [va, vb] = [a[key], b[key]];
    return order === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
  });

// ─── Object Utils ─────────────────────────────────────────────────────────────
export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((k) => delete result[k]);
  return result as Omit<T, K>;
};

export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> =>
  keys.reduce((acc, k) => ({ ...acc, [k]: obj[k] }), {} as Pick<T, K>);

export const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

// ─── Geo Utils ────────────────────────────────────────────────────────────────
export const haversineDistance = (
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number => {
  const R = 3959; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// ─── Validation Utils ─────────────────────────────────────────────────────────
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidZip = (zip: string): boolean =>
  /^\d{5}(-\d{4})?$/.test(zip);

export const isValidPhone = (phone: string): boolean =>
  /^\+?[1-9]\d{1,14}$/.test(phone.replace(/[\s\-().]/g, ''));

// ─── Retry Utils ──────────────────────────────────────────────────────────────
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const retry = async <T>(
  fn: () => Promise<T>,
  attempts = 3,
  delayMs = 1000
): Promise<T> => {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === attempts - 1) throw err;
      await sleep(delayMs * 2 ** i);
    }
  }
  throw new Error('Retry exhausted');
};

// ─── Environment Utils ────────────────────────────────────────────────────────
export const getEnv = (key: string, fallback?: string): string => {
  const val = process.env[key] ?? fallback;
  if (val === undefined) throw new Error(`Missing required env variable: ${key}`);
  return val;
};

export const isProd = (): boolean => process.env['NODE_ENV'] === 'production';
export const isDev = (): boolean => process.env['NODE_ENV'] === 'development';
export const isTest = (): boolean => process.env['NODE_ENV'] === 'test';
