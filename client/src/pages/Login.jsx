import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Satellite, Eye, EyeOff, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('admin@geosentinel.com');
  const [password, setPassword] = useState('GeoSentinel@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting login...');
      await login(email, password);
      console.log('Login successful, navigating...');
      toast.success('Access granted to satellite network');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-space-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-space-navy via-space-black to-space-navy" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-space-cyan/10 via-transparent to-transparent" />

      <div className="relative w-full max-w-md">
        <div className="glass-card p-8 glow-cyan">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-space-cyan to-blue-600 flex items-center justify-center mx-auto mb-4">
              <Satellite className="w-8 h-8 text-space-black" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white">GeoSentinel</h1>
            <p className="text-sm text-gray-500 mt-1">Satellite Network Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-space-cyan focus:outline-none transition-colors"
                placeholder="admin@geosentinel.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-space-cyan focus:outline-none transition-colors pr-12"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-space-cyan to-blue-600 text-space-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Accessing Satellite Network...</span>
                </>
              ) : (
                <span>Connect</span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            Demo: admin@geosentinel.com / GeoSentinel@2026
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;