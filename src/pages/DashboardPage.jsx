import { useMemo } from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiUserCheck, FiUserX, FiGrid } from "react-icons/fi";
import { useEmployees } from "../context/EmployeesContext.jsx";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { DEPARTMENTS } from "../utils/constants.js";
import StatCard from "../components/common/StatCard.jsx";
import Spinner from "../components/common/Spinner.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import Avatar from "../components/common/Avatar.jsx";

export default function DashboardPage() {
  useDocumentTitle("Dashboard");
  const { employees, loading, error, reload, resetData } = useEmployees();

  const stats = useMemo(() => {
    const available = employees.filter(
      (e) => e.availability === "Available",
    ).length;
    return {
      total: employees.length,
      available,
      out: employees.length - available,
      byDepartment: DEPARTMENTS.map((name) => ({
        name,
        count: employees.filter((e) => e.department === name).length,
      })),
    };
  }, [employees]);

  if (loading) return <Spinner label="Loading dashboard…" />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <>
      <div className="page-header">
        <h1>Dashboard</h1>
        <button type="button" className="btn btn-outline" onClick={resetData}>
          Reset demo data
        </button>
      </div>

      <section className="stats" aria-label="Summary">
        <StatCard icon={FiUsers} label="Total employees" value={stats.total} />
        <StatCard
          icon={FiUserCheck}
          label="Available"
          value={stats.available}
        />
        <StatCard icon={FiUserX} label="Out of office" value={stats.out} />
        <StatCard
          icon={FiGrid}
          label="Departments"
          value={DEPARTMENTS.length}
        />
      </section>

      <div className="two-col">
        <section className="panel" aria-labelledby="dept-heading">
          <h2 id="dept-heading">Employees by department</h2>
          <ul className="plain-list">
            {stats.byDepartment.map((d) => (
              <li key={d.name} className="bar-row">
                <span>{d.name}</span>
                <span className="bar">
                  <span
                    className="bar-fill"
                    style={{
                      width: `${stats.total ? (d.count / stats.total) * 100 : 0}%`,
                    }}
                  />
                </span>
                <span>{d.count}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel" aria-labelledby="recent-heading">
          <h2 id="recent-heading">Recently listed</h2>
          {employees.length === 0 ? (
            <p className="muted">No employees yet.</p>
          ) : (
            <ul className="plain-list">
              {employees.slice(0, 5).map((e) => (
                <li
                  key={e.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.4rem 0",
                  }}
                >
                  <Avatar name={e.name} photo={e.photo} />
                  <Link to={`/employees/${e.id}`}>{e.name}</Link>
                  <span className="muted">{e.department}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
