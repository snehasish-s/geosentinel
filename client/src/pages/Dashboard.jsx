import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Activity, Database, Droplets, Satellite, MapPin, Clock, TrendingUp, Zap, Mountain, Waves, Trees, Sun, Moon, Cloud, Bell, FileText, ArrowRight, Settings } from 'lucide-react';
import StatCard from '../components/StatCard/StatCard';
import { useAlerts } from '../hooks/useAlerts';
import { useDistricts } from '../hooks/useNDVI';
import { usePipeline } from '../hooks/useAuth';
import { alertsAPI, ndviAPI } from '../services/api';
import { format } from 'date-fns';

const northeastStates = [
  { name: 'Arunachal Pradesh', color: '#228B22', icon: Mountain },
  { name: 'Assam', color: '#FF9933', icon: Waves },
  { name: 'Manipur', color: '#9D00FF', icon: Sun },
  { name: 'Meghalaya', color: '#00D4FF', icon: Cloud },
  { name: 'Mizoram', color: '#ADFF2F', icon: Trees },
  { name: 'Nagaland', color: '#FF10F0', icon: Moon },
  { name: 'Tripura', color: '#FF6600', icon: Zap },
];

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

  return (
    <div className="min-h-screen bg-gov-light">
      {/* Header Bar */}
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gov-blue">Mission Control</h1>
            <p className="text-sm text-gray-500">Real-time geospatial disaster monitoring for Northeast India</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-800">{format(new Date(), 'PPP')}</div>
              <div className="text-xs text-gray-500">{format(new Date(), 'p')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="stat-card">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <div className="text-3xl font-bold">{activeAlerts}</div>
                <div className="text-xs opacity-80">Active Alerts</div>
              </div>
              <div className="stat-card-alt">
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <div className="text-3xl font-bold">{criticalAlerts}</div>
                <div className="text-xs opacity-80">Critical</div>
              </div>
              <div className="stat-card-green">
                <Database className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <div className="text-3xl font-bold">{districts.filter(d => d.riskLevel === 'High' || d.riskLevel === 'Critical').length}</div>
                <div className="text-xs opacity-80">High Risk Districts</div>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-xl p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <div className="text-3xl font-bold">{((ndviLatest?.ndviValue || 0.5) * 100).toFixed(0)}</div>
                <div className="text-xs opacity-80">NDVI Index</div>
              </div>
            </div>

            {/* State Overview */}
            <div className="gov-card p-6">
              <h2 className="font-bold text-gov-blue mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-saffron" />
                State Overview
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {northeastStates.map((state) => {
                  const stateDistricts = districts.filter(d => d.state === state.name);
                  const highRisk = stateDistricts.filter(d => d.riskLevel === 'High' || d.riskLevel === 'Critical').length;
                  
                  return (
                    <div key={state.name} className="p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-gov-blue transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <state.icon className="w-5 h-5" style={{ color: state.color }} />
                        <span className="font-semibold text-sm text-gray-800">{state.name.split(' ')[0]}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {stateDistricts.length} districts | {highRisk > 0 ? `${highRisk} at risk` : 'Stable'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Satellite Pass */}
            <div className="gov-card p-6">
              <h2 className="font-bold text-gov-blue mb-4 flex items-center gap-2">
                <Satellite className="w-5 h-5 text-saffron" />
                Satellite Pass Countdown
              </h2>
              <div className="flex items-center justify-center py-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gov-blue font-mono">
                    {formatTimer(satelliteTimer)}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">Next Sentinel-2 Pass</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Pipeline Status */}
            <div className="gov-card p-6">
              <h2 className="font-bold text-gov-blue mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-saffron" />
                Pipeline Status
              </h2>
              <div className="space-y-3">
                {['NDVI Processing', 'Water Extent', 'Alert Engine'].map((item, i) => (
                  <div key={item} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-xs text-green-600 font-medium">Active</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Alert Feed */}
            <div className="gov-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gov-blue flex items-center gap-2">
                  <Bell className="w-5 h-5 text-red-500" />
                  Live Alert Feed
                </h2>
                <Link to="/alerts" className="text-sm text-gov-blue hover:underline">View All →</Link>
              </div>
              <div className="space-y-3">
                {liveAlerts.map((alert) => (
                  <motion.div
                    key={alert._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 bg-gray-50 rounded-lg border-l-4 border-saffron"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-gray-800">{alert.district}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                        alert.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                        alert.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{alert.alertType}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {format(new Date(alert.triggeredAt), 'HH:mm')}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="gov-card p-6">
              <h2 className="font-bold text-gov-blue mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link to="/upload" className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <FileText className="w-5 h-5 text-gov-blue" />
                  <span className="text-sm font-medium text-gray-700">Upload Data</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link to="/map" className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">View Map</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link to="/games" className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Play Games</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;