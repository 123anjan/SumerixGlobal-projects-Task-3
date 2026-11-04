import { createContext, useContext, useCallback, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { STORAGE_KEYS } from "../utils/constants.js";

const AuthContext = createContext(null);

// Demo credentials only. Real authentication comes with the backend in later tasks.
const DEMO = { username: "admin", password: "admin123" };

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage(STORAGE_KEYS.auth, null);

  const login = useCallback(
    (username, password) => {
      if (username === DEMO.username && password === DEMO.password) {
        setUser(username);
        return true;
      }
      return false;
    },
    [setUser],
  );
  const logout = useCallback(() => setUser(null), [setUser]);

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, logout }),
    [user, login, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
