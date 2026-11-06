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
      <div className="login-card">
        <section className="login-brand" aria-label="Employee dashboard">
          <div className="login-brand-copy">
            <p className="login-brand-name">Sumerix<span>Global</span></p>
            <p>People first. Work smarter.</p>
          </div>
          <div className="login-brand-art" aria-hidden="true" />
          <p className="login-brand-caption">
            Your people, projects, and progress — all in one place.
          </p>
        </section>
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-form-heading">
            <p className="login-eyebrow">EMPLOYEE PORTAL</p>
            <h1>Account Login</h1>
            <p className="muted">
              Welcome back. Sign in to manage your employee dashboard.
            </p>
          </div>
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
          <button type="submit" className="btn btn-primary login-submit">
            Log in
          </button>
          <p className="login-demo">
            Demo credentials: <strong>admin</strong> / <strong>admin123</strong>
          </p>
        </form>
      </div>
    </div>
  );
}
