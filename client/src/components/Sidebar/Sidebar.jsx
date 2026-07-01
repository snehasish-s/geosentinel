import { Link, useLocation } from 'react-router-dom';
import { Home, Upload, AlertTriangle, Map, Settings, BarChart3 } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/upload', label: 'Upload Center', icon: Upload },
    { path: '/alerts', label: 'Alert Center', icon: AlertTriangle },
    { path: '/map', label: 'Map View', icon: Map },
  ];

  return (
    <aside className="w-64 bg-space-navy/50 backdrop-blur-md border-r border-space-cyan/10 min-h-screen">
      <div className="p-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Navigation</h2>
        <nav className="space-y-1">
          {menuItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === path
                  ? 'bg-space-cyan/10 text-space-cyan border border-space-cyan/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-space-cyan/10">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Quick Stats</h2>
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-white/5">
            <div className="text-2xl font-bold text-space-cyan">24</div>
            <div className="text-xs text-gray-500">Active Alerts</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5">
            <div className="text-2xl font-bold text-space-ndvi">156</div>
            <div className="text-xs text-gray-500">Districts</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;