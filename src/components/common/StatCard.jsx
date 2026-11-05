export default function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="panel stat-card">
      <Icon className="stat-icon" aria-hidden="true" />
      <div>
        <p className="stat-value">{value}</p>
        <p className="stat-label">{label}</p>
      </div>
    </div>
  );
}
