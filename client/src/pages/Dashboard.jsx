import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Activity, Database, Droplets, Satellite } from 'lucide-react';
import Globe from '../components/Globe/Globe';
import StatCard from '../components/StatCard/StatCard';
import AlertTable from '../components/AlertTable/AlertTable';
import NDVIChart from '../components/NDVIChart/NDVIChart';
import PipelineStatus from '../components/PipelineStatus/PipelineStatus';
import { useAlerts } from '../hooks/useAlerts';
import { useDistricts } from '../hooks/useNDVI';
import { usePipeline } from '../hooks/useAuth';
import { alertsAPI, ndviAPI, pipelineAPI } from '../services/api';
import { format } from 'date-fns';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const [ndviLatest, setNdviLatest] = useState(null);
  const [waterExtentData, setWaterExtentData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [satelliteTimer, setSatelliteTimer] = useState(3600);
  const [liveAlerts, setLiveAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { summary: districts, loading: districtsLoading } = useDistricts();
  const { status: pipelineStatus, loading: pipelineLoading, trigger } = usePipeline();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ndviRes, alertsRes] = await Promise.all([
          ndviAPI.getLatest(),
          alertsAPI.getAll()
        ]);
        setNdviLatest(ndviRes.data.data[0] || { ndviValue: 0.5 });
        setAlerts(alertsRes.data.data);
        setLiveAlerts(alertsRes.data.data.slice(0, 5));

        const chartData = ndviRes.data.data.slice(0, 10).map(d => ({
          name: d.district?.substring(0, 8) || 'Unknown',
          water: d.waterExtentKm2 || 0,
          ndvi: d.ndviValue || 0
        }));
        setWaterExtentData(chartData);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const { data } = await alertsAPI.getAll();
        setAlerts(data.data);
        setLiveAlerts(data.data.slice(0, 5));
      } catch (err) {
        console.error('Live alert fetch error:', err);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSatelliteTimer(prev => (prev <= 1 ? 3600 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const activeAlerts = alerts.filter(a => a.status === 'Active').length;
  const criticalAlerts = alerts.filter(a => a.severity === 'Critical' && a.status === 'Active').length;
  const totalDataProcessed = waterExtentData.reduce((sum, d) => sum + d.water, 0);
  const avgFloodCoverage = waterExtentData.length > 0 
    ? (waterExtentData.reduce((sum, d) => sum + d.water, 0) / waterExtentData.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-space-black">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-display font-bold text-white">Mission Control</h1>
          <p className="text-gray-500">Real-time geospatial disaster monitoring dashboard</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <div className="glass-card p-4 mb-6" style={{ height: '400px' }}>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Global Alert Distribution</h2>
              <Globe alerts={liveAlerts.filter(a => a.coordinates)} />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard
                title="Active Alerts"
                value={activeAlerts}
                icon="alerts"
                color="alert"
                loading={loading}
              />
              <StatCard
                title="Districts at Risk"
                value={districts.filter(d => d.riskLevel === 'High' || d.riskLevel === 'Critical').length}
                icon="districts"
                color="cyan"
                loading={districtsLoading}
              />
              <StatCard
                title="Data Processed (GB)"
                value={totalDataProcessed.toFixed(0)}
                icon="data"
                color="data"
                loading={loading}
              />
              <StatCard
                title="Flood Coverage (%)"
                value={avgFloodCoverage}
                icon="flood"
                color="cyan"
                loading={loading}
              />
            </div>

            <div className="grid grid-cols-12 gap-6 mb-6">
              <div className="col-span-12 lg:col-span-6">
                <div className="glass-card p-6">
                  <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">NDVI Index Gauge</h2>
                  <NDVIChart value={ndviLatest?.ndviValue || 0.5} loading={loading} />
                </div>
              </div>

              <div className="col-span-12 lg:col-span-6">
                <div className="glass-card p-6">
                  <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Satellite Pass Countdown</h2>
                  <div className="flex flex-col items-center justify-center h-40">
                    <Satellite className="w-12 h-12 text-space-cyan mb-4 animate-pulse" />
                    <div className="text-4xl font-display font-bold text-space-cyan">
                      {formatTimer(satelliteTimer)}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">Next Sentinel-2 Pass</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 mb-6">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Water Body Extent (km²)</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={waterExtentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0D2137', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '8px' }}
                      labelStyle={{ color: '#00E5FF' }}
                    />
                    <Area type="monotone" dataKey="water" stroke="#00E5FF" fill="rgba(0,229,255,0.2)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="glass-card p-6 mb-6">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Pipeline Status</h2>
              <PipelineStatus
                status={pipelineStatus}
                loading={pipelineLoading}
                onTrigger={trigger}
              />
            </div>

            <div className="glass-card p-6 mb-6">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Live Alert Feed</h2>
              <div className="space-y-3">
                {liveAlerts.map((alert) => (
                  <div
                    key={alert._id}
                    className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-space-cyan/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-white text-sm">{alert.district}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        alert.severity === 'Critical' ? 'bg-space-alert/20 text-space-alert' :
                        alert.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{alert.alertType}</span>
                      <span>{format(new Date(alert.triggeredAt), 'HH:mm:ss')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">District Risk Heatmap</h2>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {districts.slice(0, 10).map((district) => (
                  <div
                    key={district._id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div>
                      <div className="text-sm text-white">{district.name}</div>
                      <div className="text-xs text-gray-500">{district.state}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      district.riskLevel === 'Critical' ? 'bg-space-alert/20 text-space-alert' :
                      district.riskLevel === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      district.riskLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-space-ndvi/20 text-space-ndvi'
                    }`}>
                      {district.riskLevel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;