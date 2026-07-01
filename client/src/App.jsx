import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Alerts from './pages/Alerts';
import MapPage from './pages/Map';
import Login from './pages/Login';
import About from './pages/About';
import GamesPage from './pages/Games';
import NotFound from './pages/NotFound';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-gov-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gov-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gov-light">
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/games" element={<GamesPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Navbar />
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Navbar />
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <Navbar />
              <Alerts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <Navbar />
              <MapPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;