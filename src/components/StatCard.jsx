function StatCard({
  title,
  value,
  subtitle,
  icon,
  type = "normal"
}) {

  const iconBackground =
    type === "warning"
      ? "bg-orange-50 text-orange-600"
      : type === "danger"
      ? "bg-red-50 text-red-600"
      : "bg-blue-50 text-blue-600";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="text-2xl font-bold text-gray-800 mt-2">
            {value}
          </h3>

          <p className="text-xs text-gray-500 mt-2">
            {subtitle}
          </p>

        </div>

        <div className={`p-3 rounded-lg ${iconBackground}`}>
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;