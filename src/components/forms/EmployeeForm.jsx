import { useState, useRef, useEffect } from "react";
import FormField from "./FormField.jsx";
import { DEPARTMENTS } from "../../utils/constants.js";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  city: "",
  department: DEPARTMENTS[0],
  title: "",
  availability: "Available",
};

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 3)
    errors.name = "Name must be at least 3 characters.";
  if (!/^\S+@\S+\.\S+$/.test(values.email))
    errors.email = "Enter a valid email address.";
  if (!/^[\d\s()+-]{7,}$/.test(values.phone))
    errors.phone = "Enter a valid phone number (at least 7 characters).";
  if (!values.title.trim()) errors.title = "Job title is required.";
  return errors;
}

export default function EmployeeForm({
  initialValues,
  onSubmit,
  submitLabel,
  onCancel,
}) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValues });
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onSubmit({
        ...values,
        name: values.name.trim(),
        title: values.title.trim(),
      });
    }
  };

  const props = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    className: "control",
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form className="panel form" onSubmit={handleSubmit} noValidate>
      <FormField id="name" label="Full name" error={errors.name}>
        <input type="text" ref={nameRef} {...props("name")} />
      </FormField>
      <FormField id="email" label="Email" error={errors.email}>
        <input type="email" {...props("email")} />
      </FormField>
      <FormField id="phone" label="Phone" error={errors.phone}>
        <input type="tel" {...props("phone")} />
      </FormField>
      <FormField id="city" label="City" error={errors.city}>
        <input type="text" {...props("city")} />
      </FormField>
      <FormField id="department" label="Department">
        <select {...props("department")}>
          {DEPARTMENTS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </FormField>
      <FormField id="title" label="Job title" error={errors.title}>
        <input type="text" {...props("title")} />
      </FormField>
      <FormField id="availability" label="Availability">
        <select {...props("availability")}>
          <option>Available</option>
          <option>Out</option>
        </select>
      </FormField>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
