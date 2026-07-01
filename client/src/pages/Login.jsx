import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Satellite, Eye, EyeOff, Loader } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('admin@geosentinel.com');
  const [password, setPassword] = useState('GeoSentinel@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Access granted to satellite network');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gov-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="gov-header p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <Satellite className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">GeoSentinel</h1>
            <p className="text-white/80 text-sm mt-1">Northeast India Disaster Monitoring</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gov-blue focus:border-transparent"
                  placeholder="admin@geosentinel.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gov-blue focus:border-transparent pr-12"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gov-btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Accessing...</span>
                  </>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                <strong>Demo Credentials:</strong><br />
                Email: admin@geosentinel.com<br />
                Password: GeoSentinel@2026
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          © 2026 GeoSentinel | Government of India
        </p>
      </div>
    </div>
  );
};

export default Login;