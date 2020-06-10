import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedvalue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedvalue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
}
