const BADGE_COLORS = {
  NORMAL: "green",
  ONLINE: "green",
  ACTIVE: "green",
  RESOLVED: "green",
  WARNING: "yellow",
  ACKNOWLEDGED: "yellow",
  CRITICAL: "red",
  OPEN: "red",
  OFFLINE: "red",
};

function StatusBadge({ value }) {
  const display = value === true ? "ACTIVE" : value === false ? "INACTIVE" : String(value ?? "UNKNOWN").toUpperCase();
  const color = BADGE_COLORS[display] || "gray";

  return <span className={`badge badge-${color}`}>{display}</span>;
}

export default StatusBadge;
