import { memo } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Avatar from "../common/Avatar.jsx";
import styles from "./EmployeeCard.module.css";

function EmployeeCard({ employee, onDelete }) {
  const { id, name, title, department, availability, photo } = employee;
  const available = availability === "Available";

  return (
    <li className={styles.card}>
      <Avatar name={name} photo={photo} />
      <div className={styles.info}>
        <h3 className={styles.name}>
          <Link to={`/employees/${id}`}>{name}</Link>
        </h3>
        <p className={styles.meta}>
          {title} · {department}
        </p>
        <p
          className={`${styles.status} ${available ? styles.available : styles.out}`}
        >
          ● {availability}
        </p>
      </div>
      <div className={styles.actions}>
        <Link
          to={`/employees/${id}/edit`}
          className="btn btn-ghost btn-icon"
          aria-label={`Edit ${name}`}
        >
          <FiEdit2 aria-hidden="true" />
        </Link>
        <button
          type="button"
          className="btn btn-ghost btn-icon"
          onClick={() => onDelete(employee)}
          aria-label={`Delete ${name}`}
        >
          <FiTrash2 aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}

export default memo(EmployeeCard);
