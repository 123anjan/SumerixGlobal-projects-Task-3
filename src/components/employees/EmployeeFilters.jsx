import { useRef, useEffect } from "react";
import { DEPARTMENTS } from "../../utils/constants.js";

export default function EmployeeFilters({ filters, onChange }) {
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  return (
    <section className="panel filters" aria-label="Search and filters">
      <div className="form-field">
        <label htmlFor="search">Search by name</label>
        <input
          id="search"
          ref={searchRef}
          type="search"
          className="control"
          placeholder="Type a name..."
          value={filters.query}
          onChange={set("query")}
        />
      </div>
      <div className="form-field">
        <label htmlFor="department">Department</label>
        <select
          id="department"
          className="control"
          value={filters.department}
          onChange={set("department")}
        >
          {["All", ...DEPARTMENTS].map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="availability">Availability</label>
        <select
          id="availability"
          className="control"
          value={filters.availability}
          onChange={set("availability")}
        >
          {["All", "Available", "Out"].map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>
    </section>
  );
}
