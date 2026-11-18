import { useCallback, useEffect, useState } from 'react';
import { Notice } from '../types';

const NOTICE_DURATION_MS = 3500;

// Shows a message and hides it again automatically after a few seconds.
export function useNotice() {
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    if (!notice) {
      return undefined;
    }
    const timer = setTimeout(() => setNotice(null), NOTICE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [notice]);

  const showNotice = useCallback((text: string, type: Notice['type'] = 'success') => {
    setNotice({ id: Date.now(), text, type });
  }, []);

  return { notice, showNotice };
}
