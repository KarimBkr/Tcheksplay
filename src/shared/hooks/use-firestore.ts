import { useState, useEffect } from 'react';
import { fetchCollection, fetchDoc, subscribe } from '@/firebase/firestore';

export function useCollection<T>(path: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchCollection<T>(path)
      .then((items) => {
        if (!cancelled) {
          setData(items);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  return { data, loading, error };
}

export function useDocument<T>(path: string, id: string | undefined) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetchDoc<T>(path, id)
      .then((item) => {
        if (!cancelled) {
          setData(item);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [path, id]);

  return { data, loading, error };
}

export function useRealtimeCollection<T>(path: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribe<T>(path, (items) => {
      setData(items);
      setLoading(false);
    });
    return unsubscribe;
  }, [path]);

  return { data, loading };
}
