import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import FormField from "../components/forms/FormField.jsx";

export default function LoginPage() {
  useDocumentTitle("Login");
  const { login, isAuthenticated } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? "/";
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  if (isAuthenticated) return <Navigate to={from} replace />;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login(form.username.trim(), form.password)) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login-wrap">
      <form
        className="panel login-card form"
        onSubmit={handleSubmit}
        noValidate
      >
        <h1>Employee Dashboard</h1>
        <p className="muted">
          Demo login: <strong>admin</strong> / <strong>admin123</strong>
        </p>
        <FormField id="username" label="Username">
          <input
            id="username"
            name="username"
            className="control"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
          />
        </FormField>
        <FormField id="password" label="Password" error={error}>
          <input
            id="password"
            name="password"
            type="password"
            className="control"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "password-error" : undefined}
          />
        </FormField>
        <button type="submit" className="btn btn-primary">
          Log in
        </button>
      </form>
    </div>
  );
}
