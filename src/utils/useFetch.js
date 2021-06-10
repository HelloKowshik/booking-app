import { useEffect, useState } from 'react';
import getData from './api';

export default function useFetch(URL) {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    let doUpdate = true;
    setStatus('loading');
    setError(null);
    setData(undefined);
    getData(URL)
      .then((data) => {
        if (doUpdate) {
          setData(data);
          setStatus('success');
        }
      })
      .catch((err) => {
        if (doUpdate) {
          setError(err);
          setStatus('Error');
        }
      });
    return () => (doUpdate = false);
  }, [URL]);
  return { data, status, error };
}
