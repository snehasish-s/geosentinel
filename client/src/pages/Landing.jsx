import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Satellite, AlertTriangle, Map, Shield, Zap, Globe } from 'lucide-react';

const stats = [
  { label: 'Districts Monitored', value: 156, suffix: '+' },
  { label: 'Alerts Sent', value: 2847, suffix: '' },
  { label: 'Satellites Tracked', value: 12, suffix: '' },
];

const features = [
  { icon: Globe, title: 'Real-time NDVI Monitoring', desc: 'Track vegetation health across districts with precision satellite analysis' },
  { icon: AlertTriangle, title: 'Automated Alert System', desc: 'Instant alerts when thresholds are breached for flood, drought, and fire' },
  { icon: Map, title: 'Interactive Map Dashboard', desc: 'Visualize risk levels and active incidents on an interactive choropleth map' },
  { icon: Shield, title: 'Enterprise Security', desc: 'JWT-protected endpoints with audit logging and role-based access' },
];

const Landing = () => {
  const [mounted, setMounted] = useState(false);
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = stats.map(s => s.value);
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCounters(targets.map(t => Math.floor((t / steps) * currentStep)));
    }, interval);

    return () => clearInterval(timer);
  }, [mounted]);

  return (
    <div className="min-h-screen bg-space-black">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-space-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-space-cyan to-blue-600 flex items-center justify-center">
              <Satellite className="w-6 h-6 text-space-black" />
            </div>
            <span className="font-display font-bold text-xl text-white">GeoSentinel</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-space-cyan text-space-black font-medium hover:bg-space-cyan/90 transition-colors"
            >
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-space-navy/50 to-space-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-space-cyan/10 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                <span className="text-white">Cloud-Deployed</span>
                <br />
                <span className="bg-gradient-to-r from-space-cyan to-blue-500 bg-clip-text text-transparent">
                  Geospatial Monitoring
                </span>
              </h1>
              <p className="text-lg text-gray-400 mb-8 max-w-lg">
                Real-time satellite data ingestion with serverless NDVI and water-body extent modules
                triggering automated district-level disaster alerts across India.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/login"
                  className="px-6 py-3 rounded-xl bg-space-cyan text-space-black font-semibold hover:bg-space-cyan/90 transition-all hover:scale-105 flex items-center space-x-2"
                >
                  <Zap className="w-5 h-5" />
                  <span>Access Platform</span>
                </Link>
                <Link
                  to="/about"
                  className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-all"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 lg:h-[500px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-space-cyan/20 to-transparent rounded-3xl" />
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-space-navy to-space-black border border-white/10 flex items-center justify-center overflow-hidden">
                <Globe className="w-48 h-48 text-space-cyan/50" />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 grid grid-cols-3 gap-8"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl lg:text-5xl font-display font-bold text-space-cyan">
                  {counters[i]}{stat.suffix}
                </div>
                <div className="text-sm text-gray-500 mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-space-navy/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Platform Capabilities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Enterprise-grade disaster monitoring built on modern cloud-native architecture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-space-cyan/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-space-cyan" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500">
            © 2026 GeoSentinel — Cloud-Native Disaster Risk Platform. Architected for AWS deployment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;