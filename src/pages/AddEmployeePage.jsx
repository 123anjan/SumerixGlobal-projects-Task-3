import { useNavigate } from "react-router-dom";
import { useEmployees } from "../context/EmployeesContext.jsx";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import EmployeeForm from "../components/forms/EmployeeForm.jsx";

export default function AddEmployeePage() {
  useDocumentTitle("Add employee");
  const { addEmployee } = useEmployees();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    const created = addEmployee(data);
    navigate(`/employees/${created.id}`);
  };

  return (
    <>
      <div className="page-header">
        <h1>Add employee</h1>
      </div>
      <EmployeeForm
        submitLabel="Add employee"
        onSubmit={handleSubmit}
        onCancel={() => navigate("/employees")}
      />
    </>
  );
}
