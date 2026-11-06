import { Link, useParams, useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useEmployees } from "../context/EmployeesContext.jsx";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import Avatar from "../components/common/Avatar.jsx";
import Spinner from "../components/common/Spinner.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import EmptyState from "../components/common/EmptyState.jsx";

const Row = ({ label, value }) => (
  <div>
    <dt>{label}</dt>
    <dd>{value || "—"}</dd>
  </div>
);

export default function EmployeeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, reload, getEmployee, deleteEmployee } =
    useEmployees();
  const employee = getEmployee(id);
  useDocumentTitle(employee ? employee.name : "Employee");

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;
  if (!employee) {
    return (
      <EmptyState
        title="Employee not found"
        message="This employee may have been deleted."
      >
        <Link to="/employees" className="btn btn-primary">
          Back to employees
        </Link>
      </EmptyState>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Delete ${employee.name}? This cannot be undone.`)) {
      deleteEmployee(id);
      navigate("/employees");
    }
  };

  return (
    <>
      <div className="page-header">
        <Link to="/employees">← Back to employees</Link>
        <div className="form-actions">
          <Link to={`/employees/${id}/edit`} className="btn btn-outline">
            <FiEdit2 aria-hidden="true" /> Edit
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            <FiTrash2 aria-hidden="true" /> Delete
          </button>
        </div>
      </div>

      <article className="panel">
        <div className="profile-head">
          <Avatar name={employee.name} photo={employee.photo} />
          <div>
            <h1 style={{ margin: 0, fontSize: "1.4rem" }}>{employee.name}</h1>
            <p>{employee.title}</p>
          </div>
        </div>
        <div className="details-grid">
          <section aria-labelledby="contact-h">
            <h2 id="contact-h">Contact information</h2>
            <dl className="details-list">
              <Row
                label="Date of birth"
                value={
                  employee.dateOfBirth
                    ? new Date(
                        `${employee.dateOfBirth}T00:00:00`,
                      ).toLocaleDateString()
                    : ""
                }
              />
              <Row label="Gender" value={employee.gender} />
              <Row label="Marital status" value={employee.maritalStatus} />
              <Row label="Email" value={employee.email} />
              <Row label="Phone" value={employee.phone} />
              <Row label="City" value={employee.city} />
            </dl>
          </section>
          <section aria-labelledby="work-h">
            <h2 id="work-h">Work information</h2>
            <dl className="details-list">
              <Row label="Employee ID" value={employee.employeeId} />
              <Row label="Employee type" value={employee.employeeType} />
              <Row label="Location" value={employee.location} />
              <Row label="ZIP / Postal code" value={employee.postalCode} />
              <Row label="Role" value={employee.role} />
              <Row label="Department" value={employee.department} />
              <Row label="Job title" value={employee.title} />
              <Row
                label="Date of joining"
                value={
                  employee.joiningDate
                    ? new Date(
                        `${employee.joiningDate}T00:00:00`,
                      ).toLocaleDateString()
                    : ""
                }
              />
              <Row label="Availability" value={employee.availability} />
            </dl>
          </section>
        </div>
      </article>
    </>
  );
}
