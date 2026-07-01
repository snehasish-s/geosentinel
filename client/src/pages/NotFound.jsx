import { Link } from 'react-router-dom';
import { Home, Rocket } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-space-black flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <svg
            viewBox="0 0 200 200"
            className="w-48 h-48 mx-auto"
            fill="none"
          >
            <circle cx="100" cy="100" r="80" stroke="#00E5FF" strokeWidth="2" strokeDasharray="8 8" opacity="0.3" />
            <circle cx="100" cy="100" r="50" stroke="#0D2137" strokeWidth="40" />
            <circle cx="100" cy="70" r="15" fill="#00E5FF" opacity="0.8" />
            <rect x="85" y="90" width="30" height="40" rx="5" fill="#0D2137" stroke="#00E5FF" strokeWidth="2" />
            <ellipse cx="100" cy="145" rx="25" ry="8" fill="#0D2137" stroke="#00E5FF" strokeWidth="2" />
            <circle cx="140" cy="60" r="4" fill="#00E5FF" opacity="0.5" />
            <circle cx="60" cy="80" r="3" fill="#00E5FF" opacity="0.3" />
            <circle cx="150" cy="120" r="2" fill="#00E5FF" opacity="0.4" />
          </svg>
        </div>

        <h1 className="text-4xl font-display font-bold text-white mb-4">Lost in Space</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for has drifted into the void. Our satellites can't locate it.
        </p>

        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-space-cyan text-space-black font-semibold hover:bg-space-cyan/90 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Return to Earth</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;