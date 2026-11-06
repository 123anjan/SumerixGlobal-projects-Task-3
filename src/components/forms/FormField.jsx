export default function FormField({
  id,
  label,
  error,
  children,
  labelFor = id,
}) {
  return (
    <div className="form-field">
      <label htmlFor={labelFor ?? undefined}>{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
