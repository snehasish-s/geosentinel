import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Layers, X } from 'lucide-react';
import MapView from '../components/MapView/MapView';
import { useDistricts } from '../hooks/useNDVI';
import { AlertTriangle } from 'lucide-react';

const MapPage = () => {
  const { districts, loading } = useDistricts();
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLayers, setActiveLayers] = useState(['ndvi']);

  const filteredDistricts = districts.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const riskColors = {
    Critical: 'text-space-alert',
    High: 'text-orange-400',
    Medium: 'text-yellow-400',
    Low: 'text-space-ndvi',
  };

  return (
    <div className="min-h-screen bg-space-black flex">
      <div className="flex-1 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-display font-bold text-white">Interactive Map View</h1>
          <p className="text-gray-500 mt-1">Explore district risk levels and satellite data overlay</p>
        </motion.div>

        <div className="h-[calc(100vh-200px)]">
          <MapView
            districts={districts}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            loading={loading}
          />
        </div>
      </div>

      <div className="w-80 bg-space-navy/50 border-l border-white/10 p-6 overflow-y-auto">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Search Districts</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or state..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-space-cyan outline-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Layer Controls</h3>
          <div className="space-y-2">
            {['satellite', 'ndvi', 'flood'].map(layer => (
              <label key={layer} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeLayers.includes(layer)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setActiveLayers([...activeLayers, layer]);
                    } else {
                      setActiveLayers(activeLayers.filter(l => l !== layer));
                    }
                  }}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-space-cyan focus:ring-space-cyan"
                />
                <span className="text-sm text-gray-300 capitalize">{layer} Overlay</span>
              </label>
            ))}
          </div>
        </div>

        {selectedDistrict && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 glass-card p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">{selectedDistrict.name}</h3>
              <button
                onClick={() => setSelectedDistrict(null)}
                className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">State</span>
                <span className="text-white">{selectedDistrict.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Risk Level</span>
                <span className={`font-medium ${riskColors[selectedDistrict.riskLevel]}`}>
                  {selectedDistrict.riskLevel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last NDVI</span>
                <span className="text-white">{selectedDistrict.lastNDVI?.toFixed(3) || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Water Extent</span>
                <span className="text-white">{selectedDistrict.lastWaterExtent?.toFixed(2) || '-'} km²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Active Alerts</span>
                <span className={`font-medium ${selectedDistrict.activeAlerts > 0 ? 'text-space-alert' : 'text-space-ndvi'}`}>
                  {selectedDistrict.activeAlerts || 0}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">All Districts</h3>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {filteredDistricts.map((district) => (
              <button
                key={district._id}
                onClick={() => setSelectedDistrict(district)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedDistrict?._id === district._id
                    ? 'bg-space-cyan/20 text-space-cyan'
                    : 'hover:bg-white/5 text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{district.name}</span>
                  <span className={`text-xs ${riskColors[district.riskLevel]}`}>
                    {district.riskLevel}
                  </span>
                </div>
                <div className="text-xs text-gray-500">{district.state}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;