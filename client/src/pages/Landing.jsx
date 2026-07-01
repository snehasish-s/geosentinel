import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Satellite, AlertTriangle, Map, Shield, Zap, Globe, Mountain, 
  Droplets, Wind, ChevronDown, Play, Gamepad2, Languages, Sun, Moon, Star,
  Search, Menu, X, Calendar, TrendingUp, Users, Database, Bell, FileText,
  ExternalLink, ArrowRight, ChevronLeft, ChevronRight, Building, TreePine,
  Wheat, Fish, Home, Info, Phone, Mail, MapPin
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const northeastStates = [
  { name: 'Arunachal Pradesh', capital: 'Itanagar', districts: 25, icon: Mountain, color: '#228B22', description: 'Land of the Dawn-Lit Mountains', festivals: 'Losar, Solung', specialty: 'Tawang Monastery, Siang River' },
  { name: 'Assam', capital: 'Dispur', districts: 33, icon: Droplets, color: '#FF9933', description: 'Gateway to Northeast India', festivals: 'Bihu, Ambubachi', specialty: 'Kaziranga, Tea Gardens' },
  { name: 'Manipur', capital: 'Imphal', districts: 16, icon: Sun, color: '#9D00FF', description: 'Jewel of India', festivals: 'Yaoshang, Cheiraoba', specialty: 'Loktak Lake, Keibul Lamjao' },
  { name: 'Meghalaya', capital: 'Shillong', districts: 12, icon: Cloud, color: '#00D4FF', description: 'Abode of Clouds', festivals: 'Nongkrem, Shad Suk Mynsiem', specialty: 'Living Root Bridges, Cherrapunji' },
  { name: 'Mizoram', capital: 'Aizawl', districts: 11, icon: TreePine, color: '#ADFF2F', description: 'Land of the Mizo People', festivals: 'Chapchar Kut, Mim Kut', specialty: 'Phawngpui, Blue Mountain' },
  { name: 'Nagaland', capital: 'Kohima', districts: 16, icon: Zap, color: '#FF10F0', description: 'Land of the Nagas', festivals: 'Hornbill Festival, Moatsu', specialty: 'Kohima War Cemetery, Dzukou Valley' },
  { name: 'Tripura', capital: 'Agartala', districts: 8, icon: Building, color: '#FF6600', description: 'Land of Two Cities', festivals: 'Kharchi, Garia', specialty: 'Ujjayanta Palace, Neermahal' },
];

const stats = [
  { label: 'Districts Monitored', value: 156, icon: Map, color: 'blue' },
  { label: 'Active Alerts', value: 24, icon: Bell, color: 'orange' },
  { label: 'Satellites Tracked', value: 12, icon: Satellite, color: 'green' },
];

const quickLinks = [
  { title: 'About Northeast', href: '#about', icon: Info },
  { title: 'Disaster Alerts', href: '/alerts', icon: AlertTriangle },
  { title: 'Interactive Map', href: '/map', icon: Map },
  { title: 'Play Games', href: '/games', icon: Gamepad2 },
];

const newsItems = [
  { title: 'Flood Alert: Brahmaputra water level rising in Dibrugarh', date: '2 hours ago', severity: 'High' },
  { title: 'Landslide warning issued for Kohima district', date: '5 hours ago', severity: 'Medium' },
  { title: 'Heavy rainfall predicted across Northeast states', date: '8 hours ago', severity: 'Low' },
];

const Landing = () => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const { t, currentLang, changeLanguage, languages } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gov-light">
      {/* Header */}
      <header className="gov-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                <Satellite className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">GeoSentinel</h1>
                <p className="text-xs text-white/80">Northeast India Disaster Monitoring</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 w-64 focus:outline-none focus:bg-white/20"
                />
              </div>
              
              <div className="language-selector relative">
                <select 
                  value={currentLang}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="text-white bg-transparent border-white/30"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code} className="text-gray-900">
                      {lang.nativeName}
                    </option>
                  ))}
                </select>
              </div>

              <Link to="/login" className="px-4 py-2 bg-white text-gov-blue rounded-lg font-semibold hover:bg-white/90 transition-colors">
                Login
              </Link>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="gov-nav">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-1 py-2 overflow-x-auto">
              <Link to="/" className="flex items-center gap-2 px-4 py-2 text-white font-medium hover:bg-white/20 rounded-lg transition-colors">
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link to="/about" className="flex items-center gap-2 px-4 py-2 text-white font-medium hover:bg-white/20 rounded-lg transition-colors">
                <Info className="w-4 h-4" />
                About
              </Link>
              <Link to="/alerts" className="flex items-center gap-2 px-4 py-2 text-white font-medium hover:bg-white/20 rounded-lg transition-colors">
                <AlertTriangle className="w-4 h-4" />
                Alerts
              </Link>
              <Link to="/map" className="flex items-center gap-2 px-4 py-2 text-white font-medium hover:bg-white/20 rounded-lg transition-colors">
                <Map className="w-4 h-4" />
                Map
              </Link>
              <Link to="/games" className="flex items-center gap-2 px-4 py-2 text-white font-medium hover:bg-white/20 rounded-lg transition-colors">
                <Gamepad2 className="w-4 h-4" />
                Games
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gov-blue border-b border-white/20 p-4">
          <div className="space-y-2">
            <Link to="/" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              <Home className="w-4 h-4" /> Home
            </Link>
            <Link to="/about" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              <Info className="w-4 h-4" /> About
            </Link>
            <Link to="/alerts" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              <AlertTriangle className="w-4 h-4" /> Alerts
            </Link>
            <Link to="/map" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              <Map className="w-4 h-4" /> Map
            </Link>
            <Link to="/games" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              <Gamepad2 className="w-4 h-4" /> Games
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 text-gov-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
                <AlertTriangle className="w-4 h-4" />
                Real-time Disaster Monitoring Platform
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gov-blue mb-4">
                Protecting Northeast India
              </h1>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                India's Northeast region comprises eight states: Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Tripura, and Sikkim. Known as the "Seven Sister States" plus Sikkim, this ecologically diverse region spans the Eastern Himalayas and is home to over 45 million people.
              </p>

              <div className="info-box mb-6">
                <p className="text-sm text-gray-700">
                  <strong>Geographic Significance:</strong> The region covers approximately 7.2 lakh sq km, featuring the Brahmaputra and Barak river valleys, dense forests, and some of India's highest peaks including Kangchenjunga (8,586m).
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/login" className="gov-btn-primary flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Access Platform
                </Link>
                <Link to="/games" className="gov-btn-secondary flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5" />
                  Play Games
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8 border border-gray-200">
                <div className="grid grid-cols-3 gap-4">
                  {northeastStates.map((state, i) => (
                    <motion.div
                      key={state.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      onClick={() => setSelectedState(selectedState === state.name ? null : state.name)}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        selectedState === state.name 
                          ? 'bg-gov-blue text-white shadow-lg' 
                          : 'bg-white hover:shadow-md border border-gray-200'
                      }`}
                    >
                      <state.icon className="w-8 h-8 mb-2 mx-auto" style={{ color: state.color }} />
                      <div className="text-xs font-semibold text-center">{state.name.split(' ')[0]}</div>
                    </motion.div>
                  ))}
                </div>
                
                {selectedState && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-white rounded-xl border-2 border-saffron"
                  >
                    {(() => {
                      const state = northeastStates.find(s => s.name === selectedState);
                      return (
                        <div>
                          <h3 className="font-bold text-gov-blue text-lg mb-2">{state.name}</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div><span className="text-gray-500">Capital:</span> {state.capital}</div>
                            <div><span className="text-gray-500">Districts:</span> {state.districts}</div>
                            <div className="col-span-2"><span className="text-gray-500">Specialty:</span> {state.specialty}</div>
                            <div className="col-span-2"><span className="text-gray-500">Festivals:</span> {state.festivals}</div>
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gov-light py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="stat-card">
              <Map className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-1">156+</div>
              <div className="text-sm opacity-80">Districts Monitored</div>
            </div>
            <div className="stat-card-alt">
              <Bell className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-1">24</div>
              <div className="text-sm opacity-80">Active Alerts</div>
            </div>
            <div className="stat-card-green">
              <Satellite className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-1">12</div>
              <div className="text-sm opacity-80">Satellites Tracked</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <div className="gov-card p-6">
                <h2 className="section-title flex items-center gap-2">
                  <Info className="w-6 h-6 text-saffron" />
                  About Northeast India
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gov-blue mb-2">Historical Background</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      The Northeastern region was originally part of Bengal Province during British rule. The states were reorganized between 1963 and 1987, with Nagaland achieving statehood in 1963, followed by Meghalaya, Manipur, and Tripura in 1971. Arunachal Pradesh and Mizoram became full states in 1987. Sikkim was integrated as the eighth state in 2002.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="highlight-box">
                      <h4 className="font-semibold text-gray-800 mb-1">Geography</h4>
                      <p className="text-sm text-gray-600">
                        The region features the Eastern Himalayas, Brahmaputra and Barak valleys, and receives heavy monsoon rainfall (2,000-10,000 mm annually). Cherrapunji is one of the wettest places on Earth.
                      </p>
                    </div>
                    <div className="info-box">
                      <h4 className="font-semibold text-gray-800 mb-1">Seismic Zone</h4>
                      <p className="text-sm text-gray-600">
                        Northeast India lies in a high-risk seismic zone (Zone V). Major earthquakes include the 1897 (8.7 magnitude) and 1950 Assam-Tibet earthquake (8.6 magnitude).
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gov-blue mb-3">Cultural Diversity</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Austroasiatic', 'Tibeto-Burman', 'Indo-Aryan', 'Kra-Dai'].map(lang => (
                        <div key={lang} className="bg-gray-50 px-3 py-2 rounded-lg text-center text-sm">
                          {lang}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      The region has over 220 ethnic groups speaking nearly 220 languages. Major religions: Hinduism (54%), Islam (25%), Christianity (17%).
                    </p>
                  </div>
                </div>
              </div>

              {/* All States Overview */}
              <div className="gov-card p-6">
                <h2 className="section-title flex items-center gap-2">
                  <Building className="w-6 h-6 text-saffron" />
                  All Eight States
                </h2>
                
                <div className="space-y-4">
                  {northeastStates.map((state) => (
                    <div key={state.name} className="state-card">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${state.color}20` }}>
                          <state.icon className="w-7 h-7" style={{ color: state.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-gov-blue">{state.name}</h3>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{state.capital}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{state.description}</p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">{state.districts} Districts</span>
                            <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded">{state.festivals.split(',')[0]}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wildlife & National Parks */}
              <div className="gov-card p-6">
                <h2 className="section-title flex items-center gap-2">
                  <TreePine className="w-6 h-6 text-saffron" />
                  Wildlife & National Parks
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: 'Kaziranga', state: 'Assam', species: 'One-horned Rhinoceros, Tiger' },
                    { name: 'Manas', state: 'Assam', species: 'Tiger, Elephant, Golden Langur' },
                    { name: 'Khangchendzonga', state: 'Sikkim', species: 'Snow Leopard, Red Panda' },
                    { name: 'Namdapha', state: 'Arunachal', species: 'Takin, Hoolock Gibbon' },
                  ].map((park) => (
                    <div key={park.name} className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <h4 className="font-semibold text-green-800">{park.name}</h4>
                      <p className="text-sm text-green-600">{park.state}</p>
                      <p className="text-xs text-gray-600 mt-1">{park.species}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Links */}
              <div className="gov-card p-6">
                <h3 className="font-bold text-gov-blue mb-4">Quick Links</h3>
                <div className="space-y-2">
                  {quickLinks.map((link) => (
                    <Link 
                      key={link.title} 
                      to={link.href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <link.icon className="w-5 h-5 text-saffron" />
                      <span className="text-gray-700">{link.title}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Live Alerts */}
              <div className="gov-card p-6">
                <h3 className="font-bold text-gov-blue mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Live Alerts
                </h3>
                <div className="space-y-3">
                  {newsItems.map((news, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-lg border-l-4 border-saffron">
                      <p className="text-sm font-medium text-gray-800">{news.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <span>{news.date}</span>
                        <span className={`px-2 py-0.5 rounded text-white ${
                          news.severity === 'High' ? 'bg-red-500' : 
                          news.severity === 'Medium' ? 'bg-orange-500' : 'bg-yellow-500'
                        }`}>
                          {news.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/alerts" className="block text-center text-gov-blue font-medium mt-4 hover:underline">
                  View All Alerts →
                </Link>
              </div>

              {/* Contact Info */}
              <div className="gov-card p-6">
                <h3 className="font-bold text-gov-blue mb-4">Contact</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-saffron" />
                    <span className="text-gray-600">Guwahati, Assam</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-saffron" />
                    <span className="text-gray-600">+91 361-XXX-XXXX</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-saffron" />
                    <span className="text-gray-600">info@geosentinel.gov.in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-gov py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <Satellite className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">GeoSentinel</span>
              </div>
              <p className="text-sm text-gray-400">
                Real-time satellite monitoring platform for disaster risk management in Northeast India.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/about" className="quick-link block text-sm">About</Link>
                <Link to="/alerts" className="quick-link block text-sm">Alerts</Link>
                <Link to="/map" className="quick-link block text-sm">Map</Link>
                <Link to="/games" className="quick-link block text-sm">Games</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">States</h4>
              <div className="space-y-2">
                {northeastStates.slice(0, 5).map(state => (
                  <div key={state.name} className="quick-link text-sm">{state.name}</div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2">
                <a href="#" className="quick-link block text-sm">API Documentation</a>
                <a href="#" className="quick-link block text-sm">User Guide</a>
                <a href="#" className="quick-link block text-sm">NDVI Data</a>
                <a href="#" className="quick-link block text-sm">Contact Support</a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 GeoSentinel | Government of India | Developed by NIC</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;