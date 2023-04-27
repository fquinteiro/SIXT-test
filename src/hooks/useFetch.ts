import axios from 'axios';
import { useEffect, useState } from 'react';

export function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios.get(url)
      .then(response => setData(response.data.offers))
      .catch(err => setError(err))
      .finally(() => setIsFetching(false))
  }, [url]);

  return { data, error, isFetching }
}