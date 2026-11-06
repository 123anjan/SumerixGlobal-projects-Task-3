import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { useEmployees } from "../context/EmployeesContext.jsx";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { local } from "../services/storage.js";
import { STORAGE_KEYS } from "../utils/constants.js";
import Avatar from "../components/common/Avatar.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import Spinner from "../components/common/Spinner.jsx";

const ATTENDANCE_STATUSES = ["Present", "Absent", "On leave"];
const EMPTY_DAILY_RECORDS = {};

function getAttendanceStatus(record) {
  return typeof record === "string" ? record : (record?.status ?? "");
}

function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function AttendancePage() {
  useDocumentTitle("Attendance");
  const { employees, loading, error, reload } = useEmployees();
  const [selectedDate, setSelectedDate] = useState(getToday);
  const [records, setRecords] = useState(() =>
    local.get(STORAGE_KEYS.attendance, {}),
  );
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [attendanceForm, setAttendanceForm] = useState(null);
  const dailyRecords = records[selectedDate] ?? EMPTY_DAILY_RECORDS;

  useEffect(() => {
    local.set(STORAGE_KEYS.attendance, records);
  }, [records]);

  const summary = useMemo(
    () =>
      ATTENDANCE_STATUSES.reduce(
        (counts, status) => {
          counts[status] = employees.filter(
            (employee) =>
              getAttendanceStatus(dailyRecords[employee.id]) === status,
          ).length;
          return counts;
        },
        { Present: 0, Absent: 0, "On leave": 0 },
      ),
    [employees, dailyRecords],
  );

  const saveAttendance = (date, employeeId, entry) => {
    setRecords((previous) => {
      const dayRecords = { ...(previous[date] ?? {}) };
      if (entry) {
        const existing = dayRecords[employeeId];
        dayRecords[employeeId] = {
          ...(typeof existing === "object" ? existing : {}),
          ...entry,
        };
      }
      else delete dayRecords[employeeId];

      const next = { ...previous };
      if (Object.keys(dayRecords).length) next[date] = dayRecords;
      else delete next[date];
      return next;
    });
  };

  const openAttendanceForm = () => {
    setAttendanceForm({
      date: selectedDate,
      employeeId: employees[0]?.id ?? "",
      status: "Present",
      holidayHours: "",
      holidayMinutes: "",
      vacationHours: "",
      vacationMinutes: "",
      additionalHours: "",
      additionalMinutes: "",
      comments: "",
    });
    setShowAttendanceForm(true);
  };

  const handleAttendanceSubmit = (event) => {
    event.preventDefault();
    if (!attendanceForm?.employeeId || !attendanceForm.date) return;
    saveAttendance(attendanceForm.date, attendanceForm.employeeId, {
      ...attendanceForm,
      status: attendanceForm.status,
    });
    setSelectedDate(attendanceForm.date);
    setShowAttendanceForm(false);
  };

  if (loading) return <Spinner label="Loading attendance…" />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <>
      <div className="page-header">
        <h1>Employee attendance</h1>
        {employees.length > 0 && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={openAttendanceForm}
          >
            Add employee attendance
          </button>
        )}
      </div>

      <section className="panel attendance-panel" aria-label="Attendance by date">
        <div className="attendance-date form-field">
          <label htmlFor="attendance-date">Attendance date</label>
          <input
            id="attendance-date"
            className="control"
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
          />
        </div>
        <div className="attendance-summary" aria-live="polite">
          {ATTENDANCE_STATUSES.map((status) => (
            <span key={status}>
              {status}: <strong>{summary[status]}</strong>
            </span>
          ))}
          <span>
            Not marked:{" "}
            <strong>
              {Math.max(
                0,
                employees.length -
                  summary.Present -
                  summary.Absent -
                  summary["On leave"],
              )}
            </strong>
          </span>
        </div>
      </section>

      {employees.length === 0 ? (
        <EmptyState
          title="No employees to mark"
          message="Add employees before recording attendance."
        >
          <Link to="/employees/new" className="btn btn-primary">
            Add employee
          </Link>
        </EmptyState>
      ) : (
        <div className="panel attendance-table-wrap">
          <table className="attendance-table">
            <thead>
              <tr>
                <th scope="col">Employee</th>
                <th scope="col">Department</th>
                <th scope="col">
                  Attendance for{" "}
                  {new Date(`${selectedDate}T00:00:00`).toLocaleDateString()}
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <th scope="row">
                    <span className="attendance-employee">
                      <Avatar name={employee.name} photo={employee.photo} />
                      <Link to={`/employees/${employee.id}`}>
                        {employee.name}
                      </Link>
                    </span>
                  </th>
                  <td>{employee.department}</td>
                  <td>
                    <span
                      className={`attendance-status ${
                        getAttendanceStatus(dailyRecords[employee.id])
                          ? `attendance-status-${getAttendanceStatus(dailyRecords[employee.id]).toLowerCase().replace(/\s+/g, "-")}`
                          : "attendance-status-unmarked"
                      }`}
                    >
                      {getAttendanceStatus(dailyRecords[employee.id]) ||
                        "Not marked"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAttendanceForm && attendanceForm && (
        <div
          className="attendance-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget)
              setShowAttendanceForm(false);
          }}
        >
          <section
            className="attendance-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="attendance-modal-title"
          >
            <header className="attendance-modal-header">
              <h2 id="attendance-modal-title">Add employee attendance</h2>
              <button
                type="button"
                className="btn btn-ghost btn-icon"
                onClick={() => setShowAttendanceForm(false)}
                aria-label="Close attendance form"
              >
                <FiX aria-hidden="true" />
              </button>
            </header>
            <form
              className="attendance-modal-form"
              onSubmit={handleAttendanceSubmit}
            >
              <section className="attendance-modal-section">
                <h3>Details</h3>
                <div className="form-field">
                  <label htmlFor="entry-date">Attendance date *</label>
                  <input
                    id="entry-date"
                    className="control"
                    type="date"
                    required
                    value={attendanceForm.date}
                    onChange={(event) =>
                      setAttendanceForm((form) => ({
                        ...form,
                        date: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="entry-status">Schedule status *</label>
                  <select
                    id="entry-status"
                    className="control"
                    required
                    value={attendanceForm.status}
                    onChange={(event) =>
                      setAttendanceForm((form) => ({
                        ...form,
                        status: event.target.value,
                      }))
                    }
                  >
                    {ATTENDANCE_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status === "On leave" ? "Leave" : status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="entry-employee">Employee *</label>
                  <select
                    id="entry-employee"
                    className="control"
                    required
                    value={attendanceForm.employeeId}
                    onChange={(event) =>
                      setAttendanceForm((form) => ({
                        ...form,
                        employeeId: event.target.value,
                      }))
                    }
                  >
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                </div>
              </section>

              <section className="attendance-modal-section">
                <h3>Other hours</h3>
                {[
                  ["Holiday hours", "holidayHours", "holidayMinutes"],
                  ["Vacation hours", "vacationHours", "vacationMinutes"],
                  [
                    "Additional hours",
                    "additionalHours",
                    "additionalMinutes",
                  ],
                ].map(([label, hoursKey, minutesKey]) => (
                  <div className="attendance-hours-field" key={hoursKey}>
                    <span>{label}</span>
                    <div className="attendance-hours-inputs">
                      <label>
                        <span className="visually-hidden">{label} hours</span>
                        <input
                          className="control"
                          type="number"
                          min="0"
                          max="99"
                          placeholder="HH"
                          value={attendanceForm[hoursKey]}
                          onChange={(event) =>
                            setAttendanceForm((form) => ({
                              ...form,
                              [hoursKey]: event.target.value,
                            }))
                          }
                        />
                      </label>
                      <label>
                        <span className="visually-hidden">
                          {label} minutes
                        </span>
                        <input
                          className="control"
                          type="number"
                          min="0"
                          max="59"
                          placeholder="MM"
                          value={attendanceForm[minutesKey]}
                          onChange={(event) =>
                            setAttendanceForm((form) => ({
                              ...form,
                              [minutesKey]: event.target.value,
                            }))
                          }
                        />
                      </label>
                    </div>
                  </div>
                ))}
                <div className="form-field">
                  <label htmlFor="entry-comments">Comments</label>
                  <textarea
                    id="entry-comments"
                    className="control attendance-comments"
                    value={attendanceForm.comments}
                    onChange={(event) =>
                      setAttendanceForm((form) => ({
                        ...form,
                        comments: event.target.value,
                      }))
                    }
                  />
                </div>
              </section>

              <footer className="attendance-modal-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowAttendanceForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </footer>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
