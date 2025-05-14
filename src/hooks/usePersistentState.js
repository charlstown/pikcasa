import { useState, useEffect } from "react";

export function usePersistentState(key, initialValue) {
  // Recupera el valor inicial de localStorage o usa el valor por defecto
  const [state, setState] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Guarda el estado en localStorage cada vez que cambie
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}