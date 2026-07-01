import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Menu, X, Satellite, AlertTriangle, Upload, Map, Home, Info, LogOut, Gamepad2, Bell } from 'lucide-react';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t, currentLang, changeLanguage, languages } = useLanguage();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/upload', label: 'Upload', icon: Upload },
    { path: '/alerts', label: 'Alerts', icon: AlertTriangle },
    { path: '/map', label: 'Map', icon: Map },
    { path: '/games', label: 'Games', icon: Gamepad2 },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg gov-header flex items-center justify-center">
              <Satellite className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-gov-blue">GeoSentinel</span>
              <div className="text-xs text-gray-500">Northeast India</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                  isActive(path)
                    ? 'bg-gov-blue text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium text-sm">{label}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="language-selector relative">
              <select 
                value={currentLang}
                onChange={(e) => changeLanguage(e.target.value)}
                className="text-sm"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
            
            <span className="text-sm text-gray-600">{user?.name || 'Admin'}</span>
            <button
              onClick={logout}
              className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  isActive(path)
                    ? 'bg-gov-blue text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
            
            <div className="pt-4 border-t border-gray-200">
              <div className="language-selector w-full mb-4">
                <select 
                  value={currentLang}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="w-full"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="w-full px-4 py-3 rounded-lg flex items-center space-x-3 text-red-600 hover:bg-red-50 border-t border-gray-200 pt-4"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;