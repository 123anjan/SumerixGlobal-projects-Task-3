import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { loadInitialEmployees } from "../services/employeeService.js";
import { local } from "../services/storage.js";
import { STORAGE_KEYS } from "../utils/constants.js";

const EmployeesContext = createContext(null);

export function EmployeesProvider({ children }) {
  // null = not loaded yet; an array (even empty) = loaded
  const [employees, setEmployees] = useState(() =>
    local.get(STORAGE_KEYS.employees, null),
  );
  const [error, setError] = useState(null);
  const loading = employees === null && error === null; // derived state

  const load = useCallback(async () => {
    setError(null);
    try {
      setEmployees(await loadInitialEmployees());
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Lifecycle: fetch once on mount when nothing is saved yet
  useEffect(() => {
    if (employees === null) load();
  }, [employees, load]);

  // Persist every change
  useEffect(() => {
    if (employees !== null) local.set(STORAGE_KEYS.employees, employees);
  }, [employees]);

  const addEmployee = useCallback((data) => {
    const employee = {
      ...data,
      id: crypto.randomUUID(),
      photo: data.photo ?? "",
    };
    setEmployees((prev) => [employee, ...(prev ?? [])]);
    return employee;
  }, []);

  const updateEmployee = useCallback((id, data) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...data } : e)),
    );
  }, []);

  const deleteEmployee = useCallback((id) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const resetData = useCallback(() => {
    setEmployees(null); // triggers a fresh fetch
  }, []);

  const value = useMemo(
    () => ({
      employees: employees ?? [],
      loading,
      error,
      reload: load,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      resetData,
      getEmployee: (id) => employees?.find((e) => e.id === id),
    }),
    [
      employees,
      loading,
      error,
      load,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      resetData,
    ],
  );

  return (
    <EmployeesContext.Provider value={value}>
      {children}
    </EmployeesContext.Provider>
  );
}

export function useEmployees() {
  const ctx = useContext(EmployeesContext);
  if (!ctx)
    throw new Error("useEmployees must be used inside EmployeesProvider");
  return ctx;
}
