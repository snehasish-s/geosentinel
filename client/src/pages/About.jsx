import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Satellite, Zap, Cloud, Shield, Database, GitFork, Award, Users } from 'lucide-react';

const techStack = [
  { name: 'React', color: 'from-cyan-400 to-blue-500' },
  { name: 'Node.js', color: 'from-green-400 to-emerald-500' },
  { name: 'Express', color: 'from-gray-400 to-gray-500' },
  { name: 'MongoDB', color: 'from-green-500 to-green-600' },
  { name: 'Three.js', color: 'from-orange-400 to-red-500' },
  { name: 'Tailwind', color: 'from-cyan-400 to-blue-600' },
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
    <div className="min-h-screen bg-space-black">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-space-navy/50 to-space-black" />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4">
              About <span className="text-space-cyan">GeoSentinel</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Cloud-native disaster risk platform ingesting multisource raster/vector satellite data
              via containerised pipelines with serverless NDVI & water-body extent modules triggering
              automated district-level flood alerts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider text-center mb-8">Tech Stack</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map(({ name, color }) => (
                <span
                  key={name}
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${color} text-white text-sm font-medium`}
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="glass-card p-6 hover:scale-105 transition-transform">
                <div className="w-12 h-12 rounded-xl bg-space-cyan/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-space-cyan" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400">{desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8 mb-16"
          >
            <h2 className="text-xl font-display font-bold text-white mb-6">API Documentation</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Method</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Endpoint</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {[
                    { method: 'GET', path: '/api/alerts', desc: 'List all alerts with optional filters' },
                    { method: 'POST', path: '/api/alerts', desc: 'Create a new alert' },
                    { method: 'PATCH', path: '/api/alerts/:id/resolve', desc: 'Mark alert as resolved' },
                    { method: 'GET', path: '/api/districts', desc: 'Get all districts with risk levels' },
                    { method: 'GET', path: '/api/ndvi/latest', desc: 'Get latest NDVI readings' },
                    { method: 'POST', path: '/api/uploads', desc: 'Upload satellite data file' },
                    { method: 'GET', path: '/api/pipeline/status', desc: 'Get pipeline processing status' },
                  ].map(({ method, path, desc }) => (
                    <tr key={path} className="border-b border-white/5">
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-xs font-mono ${
                          method === 'GET' ? 'bg-green-500/20 text-green-400' :
                          method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                          method === 'PATCH' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {method}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-space-cyan">{path}</td>
                      <td className="py-3 px-4 text-gray-400">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <h2 className="text-xl font-display font-bold text-white mb-4">Ready to Explore?</h2>
            <p className="text-gray-400 mb-6">
              Start monitoring disaster risks across Indian districts with real-time satellite data
            </p>
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-space-cyan to-blue-600 text-space-black font-semibold hover:opacity-90 transition-opacity"
            >
              <Zap className="w-5 h-5" />
              <span>Launch Platform</span>
            </Link>
          </motion.div>
        </div>
      </div>

      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 GeoSentinel — Architected for AWS deployment (EC2/ECS) with Docker containerisation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;