import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { useEmployees } from "../context/EmployeesContext.jsx";
import { useDebounce } from "../hooks/useDebounce.js";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import EmployeeFilters from "../components/employees/EmployeeFilters.jsx";
import EmployeeCard from "../components/employees/EmployeeCard.jsx";
import Spinner from "../components/common/Spinner.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import EmptyState from "../components/common/EmptyState.jsx";

const DEFAULT_FILTERS = { query: "", department: "All", availability: "All" };

export default function EmployeesPage() {
  useDocumentTitle("Employees");
  const { employees, loading, error, reload, deleteEmployee } = useEmployees();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const query = useDebounce(filters.query.trim().toLowerCase(), 300);

  const visible = useMemo(
    () =>
      employees
        .filter(
          (e) =>
            e.name.toLowerCase().includes(query) &&
            (filters.department === "All" ||
              e.department === filters.department) &&
            (filters.availability === "All" ||
              e.availability === filters.availability),
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    [employees, query, filters.department, filters.availability],
  );

  const handleDelete = useCallback(
    (employee) => {
      if (window.confirm(`Delete ${employee.name}? This cannot be undone.`)) {
        deleteEmployee(employee.id);
      }
    },
    [deleteEmployee],
  );

  return (
    <>
      <div className="page-header">
        <h1>Employees</h1>
        <Link to="/employees/new" className="btn btn-primary">
          <FiPlus aria-hidden="true" /> Add employee
        </Link>
      </div>

      <EmployeeFilters filters={filters} onChange={setFilters} />

      {loading && <Spinner label="Loading employees…" />}
      {error && <ErrorMessage message={error} onRetry={reload} />}

      {!loading && !error && (
        <>
          <p className="muted" aria-live="polite">
            Showing {visible.length} of {employees.length} employees
          </p>
          {visible.length === 0 ? (
            <EmptyState
              title="No employees found"
              message="Try changing your search or filters."
            >
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setFilters(DEFAULT_FILTERS)}
              >
                Clear filters
              </button>
            </EmptyState>
          ) : (
            <ul className="employee-list">
              {visible.map((e) => (
                <EmployeeCard key={e.id} employee={e} onDelete={handleDelete} />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}

