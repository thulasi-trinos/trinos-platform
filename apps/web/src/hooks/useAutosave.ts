'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

/**
 * Debounced autosave for the report form (FR-REP-02). Call `schedule()` on each
 * change; after `delay` ms of quiet the `save` callback fires and the returned
 * status drives the `.save-note` indicator.
 */
export function useAutosave<T>(
  save: (value: T) => Promise<void>,
  delay = 1200
): { status: SaveStatus; schedule: (value: T) => void } {
  const [status, setStatus] = useState<SaveStatus>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveRef = useRef(save);
  saveRef.current = save;

  const schedule = useCallback(
    (value: T) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setStatus('saving');
        saveRef
          .current(value)
          .then(() => setStatus('saved'))
          .catch(() => setStatus('error'));
      }, delay);
    },
    [delay]
  );

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return { status, schedule };
}
