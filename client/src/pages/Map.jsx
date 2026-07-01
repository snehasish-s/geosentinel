import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Layers, X } from 'lucide-react';
import MapView from '../components/MapView/MapView';
import { useDistricts } from '../hooks/useNDVI';

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
    Critical: 'text-red-600',
    High: 'text-orange-500',
    Medium: 'text-yellow-500',
    Low: 'text-green-600',
  };

  return (
    <div className="min-h-screen bg-gov-light flex">
      <div className="flex-1 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gov-blue">Interactive Map View</h1>
          <p className="text-gray-600 mt-1">Explore district risk levels and satellite data overlay</p>
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

      <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Search Districts</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or state..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:border-gov-blue outline-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Layer Controls</h3>
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
                  className="w-4 h-4 rounded border-gray-300 bg-gray-50 text-gov-blue focus:ring-gov-blue"
                />
                <span className="text-sm text-gray-700 capitalize">{layer} Overlay</span>
              </label>
            ))}
          </div>
        </div>

        {selectedDistrict && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 gov-card p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gov-blue">{selectedDistrict.name}</h3>
              <button
                onClick={() => setSelectedDistrict(null)}
                className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">State</span>
                <span className="text-gray-800">{selectedDistrict.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Risk Level</span>
                <span className={`font-medium ${riskColors[selectedDistrict.riskLevel]}`}>
                  {selectedDistrict.riskLevel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last NDVI</span>
                <span className="text-gray-800">{selectedDistrict.lastNDVI?.toFixed(3) || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Water Extent</span>
                <span className="text-gray-800">{selectedDistrict.lastWaterExtent?.toFixed(2) || '-'} km²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Active Alerts</span>
                <span className={`font-medium ${selectedDistrict.activeAlerts > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {selectedDistrict.activeAlerts || 0}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <div>
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">All Districts</h3>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {filteredDistricts.map((district) => (
              <button
                key={district._id}
                onClick={() => setSelectedDistrict(district)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedDistrict?._id === district._id
                    ? 'bg-blue-100 text-gov-blue'
                    : 'hover:bg-gray-100 text-gray-700'
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