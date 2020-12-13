import { useState, useEffect } from 'react';

export function useStatusChange(currentStatus) {
  const [status, setStatus] = useState(currentStatus);

  useEffect(() => {
    if (status) {
      setStatus(status);
    }
  }, [status]);

  return { setStatus, status };
}
