import { useState, useEffect } from "react";
import { local } from "../services/storage.js";

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => local.get(key, initial));
  useEffect(() => {
    local.set(key, value);
  }, [key, value]);
  return [value, setValue];
}
