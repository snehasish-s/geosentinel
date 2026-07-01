import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Satellite, Zap, Cloud, Shield, Database, GitFork, ArrowRight } from 'lucide-react';

const techStack = [
  { name: 'React', color: 'bg-blue-500' },
  { name: 'Node.js', color: 'bg-green-600' },
  { name: 'Express', color: 'bg-gray-500' },
  { name: 'MongoDB', color: 'bg-green-600' },
  { name: 'Vite', color: 'bg-purple-500' },
  { name: 'Tailwind', color: 'bg-cyan-500' },
];

const features = [
  { icon: Cloud, title: 'Cloud-Native Architecture', desc: 'Containerized microservices designed for AWS EC2/ECS deployment with auto-scaling capabilities' },
  { icon: Zap, title: 'Real-time Processing', desc: 'Serverless NDVI calculation and water-body extent analysis with sub-minute latency' },
  { icon: Satellite, title: 'Multi-Source Ingestion', desc: 'Process Sentinel-2, Landsat, and MODIS data in TIF, GeoJSON, SHP, and CSV formats' },
  { icon: Shield, title: 'Enterprise Security', desc: 'JWT authentication, role-based access control, and comprehensive audit logging' },
  { icon: Database, title: 'Time-Series Storage', desc: '30+ days of historical NDVI and water extent data with efficient querying' },
  { icon: GitFork, title: 'Automated CI/CD', desc: 'GitHub Actions pipelines with automated testing and Docker container builds' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gov-light">
      {/* Header */}
      <div className="gov-header py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            About <span className="text-saffron">GeoSentinel</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Real-time satellite monitoring platform for disaster risk management across Northeast India
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="gov-card p-8 mb-8"
        >
          <h2 className="section-title">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            GeoSentinel is a disaster monitoring platform specifically designed for the eight states of Northeast India: 
            Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Tripura, and Sikkim. The platform 
            provides real-time satellite data ingestion, NDVI analysis, water body extent monitoring, and automated 
            disaster alerts to help protect communities across this ecologically diverse region.
          </p>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="gov-card p-8 mb-8"
        >
          <h2 className="section-title">Technology Stack</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map(({ name, color }) => (
              <span
                key={name}
                className={`px-4 py-2 rounded-lg ${color} text-white text-sm font-medium`}
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="section-title">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="gov-card p-6">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-saffron" />
                </div>
                <h3 className="font-semibold text-gov-blue mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* API Documentation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="gov-card p-8 mb-8"
        >
          <h2 className="section-title">API Endpoints</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Method</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Endpoint</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {[
                  { method: 'GET', path: '/api/alerts', desc: 'List all alerts with optional filters' },
                  { method: 'POST', path: '/api/alerts', desc: 'Create a new alert' },
                  { method: 'PATCH', path: '/api/alerts/:id/resolve', desc: 'Mark alert as resolved' },
                  { method: 'GET', path: '/api/districts', desc: 'Get all districts with risk levels' },
                  { method: 'GET', path: '/api/ndvi/latest', desc: 'Get latest NDVI readings' },
                  { method: 'POST', path: '/api/uploads', desc: 'Upload satellite data file' },
                  { method: 'GET', path: '/api/pipeline/status', desc: 'Get pipeline processing status' },
                ].map(({ method, path, desc }) => (
                  <tr key={path} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        method === 'GET' ? 'bg-green-100 text-green-700' :
                        method === 'POST' ? 'bg-blue-100 text-blue-700' :
                        method === 'PATCH' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {method}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-gov-blue">{path}</td>
                    <td className="py-3 px-4 text-gray-600">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="gov-card p-8 text-center"
        >
          <h2 className="text-xl font-bold text-gov-blue mb-4">Ready to Explore?</h2>
          <p className="text-gray-600 mb-6">
            Start monitoring disaster risks across Northeast India with real-time satellite data
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gov-btn-primary"
          >
            <Zap className="w-5 h-5" />
            <span>Launch Platform</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="footer-gov py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 GeoSentinel | Government of India | Developed by NIC
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;