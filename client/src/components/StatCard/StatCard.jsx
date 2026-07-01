import { Activity, AlertTriangle, Database, Droplets } from 'lucide-react';

const iconMap = {
  alerts: AlertTriangle,
  districts: Activity,
  data: Database,
  flood: Droplets,
};

const colorMap = {
  cyan: 'from-space-cyan/20 to-blue-600/20 border-space-cyan/30',
  alert: 'from-space-alert/20 to-red-600/20 border-space-alert/30',
  ndvi: 'from-space-ndvi/20 to-green-600/20 border-space-ndvi/30',
  data: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
};

const StatCard = ({ title, value, change, changeType, icon, color = 'cyan', loading }) => {
  const Icon = iconMap[icon] || Activity;
  const colorClass = colorMap[color] || colorMap.cyan;

  if (loading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="h-4 bg-white/10 rounded w-24 mb-4" />
        <div className="h-8 bg-white/10 rounded w-20" />
      </div>
    );
  }

  return (
    <div className={`glass-card p-6 border ${colorClass} hover:scale-[1.02] transition-transform`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-400">{title}</span>
        <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClass}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="text-3xl font-bold font-display text-white mb-1">{value}</div>
      {change && (
        <div className={`text-sm ${changeType === 'positive' ? 'text-space-ndvi' : 'text-space-alert'}`}>
          {change}
        </div>
      )}
    </div>
  );
};

export default StatCard;