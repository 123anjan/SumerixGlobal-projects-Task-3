export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state-box" role="alert">
      <h2>Something went wrong</h2>
      <p className="muted">{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
