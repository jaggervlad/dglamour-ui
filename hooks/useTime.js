import { getCurrentTime } from '@/utils/formatDate';
import { useEffect, useState } from 'react';

export function useTime(refreshCycle = 100) {
  const [now, setNow] = useState(getCurrentTime());

  useEffect(() => {
    const intervalId = setInterval(
      () => setNow(getCurrentTime()),
      refreshCycle
    );
    return () => clearInterval(intervalId);
  }, [refreshCycle, setInterval, clearInterval, setNow, getCurrentTime]);

  return now;
}
