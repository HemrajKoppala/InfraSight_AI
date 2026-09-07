function RiskBadge({ risk }) {

  let style = "bg-green-100 text-green-700";
  let label = "Low";

  if (risk >= 70) {
    style = "bg-red-100 text-red-700";
    label = "High";
  } else if (risk >= 40) {
    style = "bg-orange-100 text-orange-700";
    label = "Medium";
  }

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${style}`}
    >
      {label} · {risk}%
    </span>
  );
}

export default RiskBadge;