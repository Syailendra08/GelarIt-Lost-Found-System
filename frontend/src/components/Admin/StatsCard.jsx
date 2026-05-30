export default function StatsCard({title, value, icon: Icon, iconBg, iconColor}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-4">
        
        <div className={`p-3 rounded-xl ${iconBg}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>

        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="text-3xl font-bold text-gray-800">
            {value}
          </h2>
        </div>

      </div>
    </div>
  );
}