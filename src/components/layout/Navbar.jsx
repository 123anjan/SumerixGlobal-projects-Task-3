import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FiMenu, FiX, FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./Navbar.module.css";

const linkClass = ({ isActive }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link to="/" className={styles.brand}>
          Employee Dashboard
        </Link>

        <button
          type="button"
          className={`btn btn-ghost btn-icon ${styles.menuButton}`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>

        <nav
          id="main-nav"
          className={open ? `${styles.nav} ${styles.open}` : styles.nav}
          aria-label="Main"
        >
          <NavLink to="/" end className={linkClass} onClick={close}>
            Dashboard
          </NavLink>
          <NavLink to="/employees" end className={linkClass} onClick={close}>
            Employees
          </NavLink>
          <NavLink to="/attendance" className={linkClass} onClick={close}>
            Attendance
          </NavLink>
          <NavLink to="/employees/new" className={linkClass} onClick={close}>
            Add Employee
          </NavLink>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
          >
            {theme === "dark" ? (
              <FiSun aria-hidden="true" />
            ) : (
              <FiMoon aria-hidden="true" />
            )}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={logout}>
            <FiLogOut aria-hidden="true" /> Logout ({user})
          </button>
        </nav>
      </div>
    </header>
  );
}
