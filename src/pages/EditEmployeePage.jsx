import { Link, useNavigate, useParams } from "react-router-dom";
import { useEmployees } from "../context/EmployeesContext.jsx";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import EmployeeForm from "../components/forms/EmployeeForm.jsx";
import Spinner from "../components/common/Spinner.jsx";
import EmptyState from "../components/common/EmptyState.jsx";

export default function EditEmployeePage() {
  useDocumentTitle("Edit employee");
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, getEmployee, updateEmployee } = useEmployees();
  const employee = getEmployee(id);

  if (loading) return <Spinner />;
  if (!employee) {
    return (
      <EmptyState
        title="Employee not found"
        message="There is nothing to edit."
      >
        <Link to="/employees" className="btn btn-primary">
          Back to employees
        </Link>
      </EmptyState>
    );
  }

  const handleSubmit = (data) => {
    updateEmployee(id, data);
    navigate(`/employees/${id}`);
  };

  return (
    <>
      <div className="page-header">
        <h1>Edit {employee.name}</h1>
      </div>
      <EmployeeForm
        key={employee.id}
        initialValues={employee}
        submitLabel="Save changes"
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/employees/${id}`)}
      />
    </>
  );
}
