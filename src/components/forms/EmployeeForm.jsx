import { useState, useRef, useEffect } from "react";
import FormField from "./FormField.jsx";
import { DEPARTMENTS, JOB_TITLES } from "../../utils/constants.js";
import { COUNTRIES } from "../../utils/countries.js";
import { useEmployees } from "../../context/EmployeesContext.jsx";
import Avatar from "../common/Avatar.jsx";

const COUNTRY_CODES = [
  { value: "+91", label: "India (+91)" },
  { value: "+1", label: "US/Canada (+1)" },
  { value: "+44", label: "UK (+44)" },
  { value: "+61", label: "Australia (+61)" },
];

const EMPTY = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  phone: "",
  phoneCountryCode: "+91",
  photo: "",
  joiningDate: "",
  city: "",
  location: "",
  employeeType: "Full-time",
  role: "",
  department: DEPARTMENTS[0],
  title: "",
  availability: "Available",
};

function getInitialNames(employee) {
  if (
    employee?.firstName !== undefined ||
    employee?.middleName !== undefined ||
    employee?.lastName !== undefined
  ) {
    return {
      firstName: employee.firstName ?? "",
      middleName: employee.middleName ?? "",
      lastName: employee.lastName ?? "",
    };
  }

  const [firstName = "", ...remainingNames] = (employee?.name ?? "")
    .trim()
    .split(/\s+/);
  const lastName = remainingNames.length ? remainingNames.pop() : "";

  return {
    firstName,
    middleName: remainingNames.join(" "),
    lastName,
  };
}

function getFullName(values) {
  return [values.firstName, values.middleName, values.lastName]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ");
}

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createEmployeeId(employees) {
  let employeeId;
  do {
    employeeId = `EMP-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  } while (employees.some((employee) => employee.employeeId === employeeId));
  return employeeId;
}

function getInitialPhone(phone) {
  const phoneText = String(phone ?? "");
  const digits = phoneText.replace(/\D/g, "");
  const country = phoneText.startsWith("+")
    ? COUNTRY_CODES.find(({ value }) => phoneText.startsWith(value))
    : undefined;
  const countryCode = country?.value ?? EMPTY.phoneCountryCode;
  const localDigits = country
    ? digits.slice(countryCode.length - 1)
    : digits.length === 11 && digits.startsWith("1")
      ? digits.slice(1)
      : digits;

  return {
    phoneCountryCode: countryCode,
    phone: localDigits.slice(0, 10),
  };
}

function validate(values) {
  const errors = {};
  if (!values.firstName.trim()) errors.firstName = "First name is required.";
  if (!values.lastName.trim()) errors.lastName = "Last name is required.";
  if (values.dateOfBirth && values.dateOfBirth > getLocalDateString())
    errors.dateOfBirth = "Date of birth cannot be in the future.";
  if (!/^\S+@\S+\.\S+$/.test(values.email))
    errors.email = "Enter a valid email address.";
  if (!/^\d{10}$/.test(values.phone))
    errors.phone = "Enter exactly 10 digits.";
  if (!values.title.trim()) errors.title = "Job title is required.";
  return errors;
}

function readResizedPhoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the selected photo."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () =>
        reject(new Error("Could not process the selected photo."));
      image.onload = () => {
        const maxDimension = 512;
        const scale = Math.min(
          1,
          maxDimension / Math.max(image.naturalWidth, image.naturalHeight),
        );
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("Could not process the selected photo."));
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function EmployeeForm({
  initialValues,
  onSubmit,
  submitLabel,
  onCancel,
}) {
  const { employees } = useEmployees();
  const [values, setValues] = useState(() => ({
    ...EMPTY,
    ...initialValues,
    ...getInitialNames(initialValues),
    employeeId: initialValues?.employeeId ?? "",
    ...getInitialPhone(initialValues?.phone),
  }));
  const [errors, setErrors] = useState({});
  const [photoError, setPhotoError] = useState("");
  const [photoProcessing, setPhotoProcessing] = useState(false);
  const [showVacantOnly, setShowVacantOnly] = useState(false);
  const nameRef = useRef(null);
  const photoInputRef = useRef(null);
  const usedTitles = new Set(
    employees
      .filter(
        (employee) =>
          employee.department === values.department &&
          employee.id !== initialValues?.id,
      )
      .map((employee) => employee.title)
      .filter(Boolean),
  );
  const departmentTitles = [
    ...new Set([
      ...(JOB_TITLES[values.department] ?? []),
      ...employees
        .filter((employee) => employee.department === values.department)
        .map((employee) => employee.title)
        .filter(Boolean),
    ]),
  ];
  const titleSuggestions = showVacantOnly
    ? departmentTitles.filter((title) => !usedTitles.has(title))
    : departmentTitles;
  const today = getLocalDateString();

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPhotoError("Choose an image file.");
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("Choose an image smaller than 5 MB.");
      e.target.value = "";
      return;
    }

    setPhotoError("");
    setPhotoProcessing(true);
    try {
      const photo = await readResizedPhoto(file);
      setValues((prev) => ({ ...prev, photo }));
    } catch (error) {
      setPhotoError(
        error instanceof Error
          ? error.message
          : "Could not process the selected photo.",
      );
    } finally {
      setPhotoProcessing(false);
    }
  };

  const handleRemovePhoto = () => {
    setValues((prev) => ({ ...prev, photo: "" }));
    setPhotoError("");
    if (photoInputRef.current) photoInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (photoProcessing) return;
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      const { phoneCountryCode, ...employeeValues } = values;
      onSubmit({
        ...employeeValues,
        phone: `${phoneCountryCode} ${values.phone}`,
        firstName: values.firstName.trim(),
        middleName: values.middleName.trim(),
        lastName: values.lastName.trim(),
        name: getFullName(values),
        employeeId: values.employeeId || createEmployeeId(employees),
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
      <fieldset className="form-section">
        <legend>Personal Information</legend>
        <FormField id="photo" label="Employee photo" error={photoError}>
          <div className="employee-photo-field">
            <div className="employee-photo-preview">
              <Avatar name={getFullName(values)} photo={values.photo} />
            </div>
            <div className="employee-photo-controls">
              <input
                id="photo"
                name="photo"
                ref={photoInputRef}
                type="file"
                accept="image/*"
                className="control"
                aria-invalid={Boolean(photoError)}
                aria-describedby={photoError ? "photo-error" : undefined}
                onChange={handlePhotoChange}
              />
              <span className="muted">Images only, up to 5 MB.</span>
              {values.photo && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleRemovePhoto}
                >
                  Remove photo
                </button>
              )}
              {photoProcessing && <span role="status">Processing photo…</span>}
            </div>
          </div>
        </FormField>
        <div className="name-fields">
          <FormField
            id="firstName"
            label="First name"
            error={errors.firstName}
          >
            <input type="text" ref={nameRef} {...props("firstName")} />
          </FormField>
          <FormField id="middleName" label="Middle name">
            <input type="text" {...props("middleName")} />
          </FormField>
          <FormField id="lastName" label="Last name" error={errors.lastName}>
            <input type="text" {...props("lastName")} />
          </FormField>
        </div>
        <FormField id="dateOfBirth" label="Date of birth" error={errors.dateOfBirth}>
          <input
            type="date"
            max={today}
            {...props("dateOfBirth")}
          />
        </FormField>
        <FormField id="email" label="Email" error={errors.email}>
          <input type="email" {...props("email")} />
        </FormField>
        <FormField id="phone" label="Phone" error={errors.phone}>
          <div className="phone-input-group">
            <select
              id="phoneCountryCode"
              name="phoneCountryCode"
              value={values.phoneCountryCode}
              onChange={handleChange}
              className="control"
              aria-label="Country calling code"
            >
              {COUNTRY_CODES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              {...props("phone")}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                }))
              }
            />
          </div>
        </FormField>
        <FormField id="city" label="City" error={errors.city}>
          <select
            {...props("city")}
            className={`control${values.city ? "" : " control-placeholder"}`}
          >
            <option value="">Select a country</option>
            {values.city && !COUNTRIES.includes(values.city) && (
              <option value={values.city}>{values.city} (saved value)</option>
            )}
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </FormField>
      </fieldset>
      <fieldset className="form-section">
        <legend>Work Information</legend>
        <FormField id="employeeId" label="Employee ID">
          <input
            type="text"
            {...props("employeeId")}
            readOnly
            aria-readonly="true"
          />
        </FormField>
        <FormField id="joiningDate" label="Date of joining">
          <input type="date" {...props("joiningDate")} />
        </FormField>
        <FormField id="employeeType" label="Employee type">
          <select {...props("employeeType")}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Intern</option>
          </select>
        </FormField>
        <FormField id="location" label="Location">
          <input type="text" {...props("location")} />
        </FormField>
        <FormField id="department" label="Department">
          <select {...props("department")}>
            {DEPARTMENTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </FormField>
        <FormField id="role" label="Role">
          <input type="text" {...props("role")} />
        </FormField>
        <label className="vacant-positions-toggle">
          <input
            type="checkbox"
            checked={showVacantOnly}
            onChange={(event) => setShowVacantOnly(event.target.checked)}
          />
          Only Show Vacant Positions
        </label>
        <FormField id="title" label="Job title" error={errors.title}>
          <input
            type="text"
            list="job-title-suggestions"
            {...props("title")}
          />
          <datalist id="job-title-suggestions">
            {titleSuggestions.map((title) => (
              <option key={title} value={title} />
            ))}
          </datalist>
        </FormField>
        <FormField id="availability" label="Availability">
          <select {...props("availability")}>
            <option>Available</option>
            <option>Out</option>
          </select>
        </FormField>
      </fieldset>
      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={photoProcessing}
        >
          {submitLabel}
        </button>
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
