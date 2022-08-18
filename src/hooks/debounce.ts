import { useEffect, useState } from "react";

export function useDebounce (value: string, delay: number = 360){
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);

    return () => clearTimeout(handler)
  }, [value, delay])

  return debounced
};
