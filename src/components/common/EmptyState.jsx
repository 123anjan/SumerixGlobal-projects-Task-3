export default function EmptyState({ title, message, children }) {
  return (
    <div className="state-box">
      <h2>{title}</h2>
      <p className="muted">{message}</p>
      {children}
    </div>
  );
}
