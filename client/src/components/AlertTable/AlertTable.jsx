import { useState } from 'react';
import { ChevronUp, ChevronDown, ExternalLink, Check, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const severityColors = {
  Critical: 'bg-space-alert/20 text-space-alert border-space-alert/30',
  High: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Low: 'bg-space-ndvi/20 text-space-ndvi border-space-ndvi/30',
};

const typeColors = {
  Flood: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Drought: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Fire: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const AlertTable = ({ alerts, onResolve, onDelete, loading }) => {
  const [sortField, setSortField] = useState('triggeredAt');
  const [sortDir, setSortDir] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const sortedAlerts = [...alerts].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (sortField === 'triggeredAt') {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }
    if (sortDir === 'asc') return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-white/5 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            {[
              { key: 'district', label: 'District' },
              { key: 'alertType', label: 'Type' },
              { key: 'severity', label: 'Severity' },
              { key: 'ndviValue', label: 'NDVI' },
              { key: 'triggeredAt', label: 'Triggered' },
              { key: 'status', label: 'Status' },
            ].map(({ key, label }) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
              >
                <div className="flex items-center space-x-1">
                  <span>{label}</span>
                  {sortField === key && (sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                </div>
              </th>
            ))}
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {sortedAlerts.map((alert) => (
            <tr key={alert._id} className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-4">
                <div className="font-medium text-white">{alert.district}</div>
                <div className="text-xs text-gray-500">{alert.state}</div>
              </td>
              <td className="px-4 py-4">
                <span className={`px-2 py-1 rounded-full text-xs border ${typeColors[alert.alertType]}`}>
                  {alert.alertType}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className={`px-2 py-1 rounded-full text-xs border ${severityColors[alert.severity]}`}>
                  {alert.severity}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-gray-300">
                {alert.ndviValue ? alert.ndviValue.toFixed(3) : '-'}
              </td>
              <td className="px-4 py-4 text-sm text-gray-400">
                {format(new Date(alert.triggeredAt), 'dd MMM yyyy HH:mm')}
              </td>
              <td className="px-4 py-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  alert.status === 'Active' ? 'bg-space-ndvi/20 text-space-ndvi' : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {alert.status}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center justify-end space-x-2">
                  {alert.status === 'Active' && (
                    <button
                      onClick={() => onResolve(alert._id)}
                      className="p-1.5 rounded-lg bg-space-ndvi/20 text-space-ndvi hover:bg-space-ndvi/30 transition-colors"
                      title="Mark Resolved"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(alert._id)}
                    className="p-1.5 rounded-lg bg-space-alert/20 text-space-alert hover:bg-space-alert/30 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {sortedAlerts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No alerts found
        </div>
      )}
    </div>
  );
};

export default AlertTable;