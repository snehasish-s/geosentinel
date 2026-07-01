import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Download, CheckCircle, Trash2, X, MapPin } from 'lucide-react';
import AlertTable from '../components/AlertTable/AlertTable';
import MapView from '../components/MapView/MapView';
import { useAlerts } from '../hooks/useAlerts';
import { alertsAPI } from '../services/api';
import toast from 'react-hot-toast';

const AlertsPage = () => {
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const { alerts, loading, resolveAlert, deleteAlert, refetch } = useAlerts(filters);

  const [stats, setStats] = useState({
    active: 0,
    resolvedToday: 0,
    critical: 0,
    avgResponse: '0h',
  });

  useEffect(() => {
    const active = alerts.filter(a => a.status === 'Active').length;
    const today = new Date().setHours(0, 0, 0, 0);
    const resolvedToday = alerts.filter(a => a.status === 'Resolved' && a.resolvedAt && new Date(a.resolvedAt) >= today).length;
    const critical = alerts.filter(a => a.severity === 'Critical' && a.status === 'Active').length;

    setStats({
      active,
      resolvedToday,
      critical,
      avgResponse: '2.4h',
    });
  }, [alerts]);

  const handleResolve = async (id) => {
    try {
      await resolveAlert(id);
      toast.success('Alert resolved');
    } catch (err) {
      toast.error('Failed to resolve alert');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAlert(id);
      toast.success('Alert deleted');
    } catch (err) {
      toast.error('Failed to delete alert');
    }
  };

  const handleBulkResolve = async () => {
    const activeAlerts = alerts.filter(a => a.status === 'Active').slice(0, 10);
    for (const alert of activeAlerts) {
      await alertsAPI.resolve(alert._id);
    }
    toast.success(`Resolved ${activeAlerts.length} alerts`);
    refetch();
  };

  const handleExportCSV = async () => {
    try {
      const { data } = await alertsAPI.exportCSV();
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'alerts.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Alerts exported');
    } catch (err) {
      toast.error('Failed to export');
    }
  };

  return (
    <div className="min-h-screen bg-space-black p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-display font-bold text-white">Alert Center</h1>
          <p className="text-gray-500 mt-1">Monitor and manage disaster alerts across all districts</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Active Alerts', value: stats.active, color: 'text-space-alert' },
            { label: 'Resolved Today', value: stats.resolvedToday, color: 'text-space-ndvi' },
            { label: 'Critical', value: stats.critical, color: 'text-space-alert' },
            { label: 'Avg Response', value: stats.avgResponse, color: 'text-space-cyan' },
          ].map(({ label, value, color }) => (
            <div key={label} className="glass-card p-4">
              <div className="text-sm text-gray-500">{label}</div>
              <div className={`text-2xl font-bold font-display ${color}`}>{value}</div>
            </div>
          ))}
        </div>

        <div className="glass-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <div className="flex items-center space-x-2">
                <select
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-space-cyan outline-none"
                >
                  <option value="">All Types</option>
                  <option value="Flood">Flood</option>
                  <option value="Drought">Drought</option>
                  <option value="Fire">Fire</option>
                </select>

                <select
                  onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-space-cyan outline-none"
                >
                  <option value="">All Severity</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                <select
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-space-cyan outline-none"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleBulkResolve}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-space-ndvi/20 text-space-ndvi hover:bg-space-ndvi/30 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Mark Resolved</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-space-cyan/20 text-space-cyan hover:bg-space-cyan/30 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <AlertTable
            alerts={alerts}
            onResolve={handleResolve}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </div>

      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Alert Details</h3>
              <button
                onClick={() => setSelectedAlert(null)}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">District</div>
                  <div className="text-white font-medium">{selectedAlert.district}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">State</div>
                  <div className="text-white font-medium">{selectedAlert.state}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Type</div>
                  <div className="text-white font-medium">{selectedAlert.alertType}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Severity</div>
                  <div className={`font-medium ${
                    selectedAlert.severity === 'Critical' ? 'text-space-alert' :
                    selectedAlert.severity === 'High' ? 'text-orange-400' :
                    selectedAlert.severity === 'Medium' ? 'text-yellow-400' :
                    'text-space-ndvi'
                  }`}>
                    {selectedAlert.severity}
                  </div>
                </div>
              </div>

              <div className="h-48 rounded-lg overflow-hidden">
                <MapView
                  districts={[{ name: selectedAlert.district, coordinates: selectedAlert.coordinates, riskLevel: selectedAlert.severity }]}
                  selectedDistrict={{ name: selectedAlert.district, coordinates: selectedAlert.coordinates }}
                  onSelectDistrict={() => {}}
                />
              </div>

              <div className="p-3 rounded-lg bg-white/5">
                <div className="text-xs text-gray-500 mb-1">Message</div>
                <div className="text-sm text-white">{selectedAlert.message || 'No message'}</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AlertsPage;