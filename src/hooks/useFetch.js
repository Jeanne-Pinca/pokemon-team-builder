import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;
    setLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!cancel) {
          console.log("Fetched data:", json);
          setData(json);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancel) {
          console.error("Fetch error:", err.message);
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancel) setLoading(false);
      });

    return () => { cancel = true };
  }, [url]);

  return { data, loading, error };
}
