import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gov-light flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto rounded-full bg-gov-blue flex items-center justify-center">
            <span className="text-6xl font-bold text-white">404</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gov-blue mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gov-btn-primary"
        >
          <Home className="w-5 h-5" />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;