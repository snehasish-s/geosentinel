import { MapContainer, TileLayer, GeoJSON, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

const riskColors = {
  Critical: '#FF4136',
  High: '#FF851B',
  Medium: '#FFDC00',
  Low: '#39FF14',
};

const MapContent = ({ districts, selectedDistrict, onSelectDistrict }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedDistrict) {
      map.setView([selectedDistrict.coordinates.lat, selectedDistrict.coordinates.lng], 8);
    }
  }, [selectedDistrict, map]);

  const getStyle = (feature) => {
    const district = districts.find(d => d.name === feature.properties.name);
    const riskLevel = district?.riskLevel || 'Low';
    return {
      fillColor: riskColors[riskLevel],
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7,
    };
  };

  const onEachFeature = (feature, layer) => {
    const district = districts.find(d => d.name === feature.properties.name);
    if (district) {
      layer.bindPopup(`
        <div style="min-width: 150px;">
          <h3 style="font-weight: bold; margin-bottom: 8px;">${district.name}</h3>
          <p style="margin: 4px 0;"><strong>State:</strong> ${district.state}</p>
          <p style="margin: 4px 0;"><strong>Risk:</strong> ${district.riskLevel}</p>
          <p style="margin: 4px 0;"><strong>Last NDVI:</strong> ${district.lastNDVI?.toFixed(3) || '-'}</p>
          <p style="margin: 4px 0;"><strong>Water Extent:</strong> ${district.lastWaterExtent?.toFixed(2) || '-'} km²</p>
        </div>
      `);
      layer.on({
        click: () => onSelectDistrict(district),
        mouseover: (e) => {
          e.target.setStyle({ fillOpacity: 0.9 });
        },
        mouseout: (e) => {
          e.target.setStyle({ fillOpacity: 0.7 });
        },
      });
    }
  };

  return (
    <GeoJSON
      data={indiaDistricts}
      style={getStyle}
      onEachFeature={onEachFeature}
    />
  );
};

const indiaDistricts = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { name: "Madhubani" }, geometry: { type: "Polygon", coordinates: [[[86.07, 26.35], [86.15, 26.35], [86.15, 26.45], [86.07, 26.45], [86.07, 26.35]]] } },
    { type: "Feature", properties: { name: "Darbhanga" }, geometry: { type: "Polygon", coordinates: [[[85.89, 26.15], [85.97, 26.15], [85.97, 26.25], [85.89, 26.25], [85.89, 26.15]]] } },
    { type: "Feature", properties: { name: "Muzaffarpur" }, geometry: { type: "Polygon", coordinates: [[[85.36, 26.12], [85.44, 26.12], [85.44, 26.22], [85.36, 26.22], [85.36, 26.12]]] } },
    { type: "Feature", properties: { name: "Gopalganj" }, geometry: { type: "Polygon", coordinates: [[[84.43, 26.46], [84.51, 26.46], [84.51, 26.56], [84.43, 26.56], [84.43, 26.46]]] } },
    { type: "Feature", properties: { name: "East Champaran" }, geometry: { type: "Polygon", coordinates: [[[84.94, 26.65], [85.02, 26.65], [85.02, 26.75], [84.94, 26.75], [84.94, 26.65]]] } },
    { type: "Feature", properties: { name: "West Champaran" }, geometry: { type: "Polygon", coordinates: [[[84.19, 27.10], [84.27, 27.10], [84.27, 27.20], [84.19, 27.20], [84.19, 27.10]]] } },
    { type: "Feature", properties: { name: "Gaya" }, geometry: { type: "Polygon", coordinates: [[[84.99, 24.74], [85.07, 24.74], [85.07, 24.84], [84.99, 24.84], [84.99, 24.74]]] } },
    { type: "Feature", properties: { name: "Dhanbad" }, geometry: { type: "Polygon", coordinates: [[[86.43, 23.79], [86.51, 23.79], [86.51, 23.89], [86.43, 23.89], [86.43, 23.79]]] } },
    { type: "Feature", properties: { name: "Ranchi" }, geometry: { type: "Polygon", coordinates: [[[85.31, 23.34], [85.39, 23.34], [85.39, 23.44], [85.31, 23.44], [85.31, 23.34]]] } },
    { type: "Feature", properties: { name: "Hazaribagh" }, geometry: { type: "Polygon", coordinates: [[[85.36, 23.99], [85.44, 23.99], [85.44, 24.09], [85.36, 24.09], [85.36, 23.99]]] } },
  ]
};

const MapView = ({ districts = [], selectedDistrict, onSelectDistrict, loading }) => {
  const [activeLayer, setActiveLayer] = useState('street');

  if (loading) {
    return (
      <div className="h-96 bg-space-navy/50 rounded-xl flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-space-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute top-4 left-4 z-[1000] flex flex-col space-y-2">
        {['street', 'satellite'].map(layer => (
          <button
            key={layer}
            onClick={() => setActiveLayer(layer)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeLayer === layer
                ? 'bg-space-cyan text-space-black'
                : 'bg-space-navy/90 text-white hover:bg-space-navy'
            }`}
          >
            {layer.charAt(0).toUpperCase() + layer.slice(1)} View
          </button>
        ))}
      </div>
      <MapContainer
        center={[26.0, 85.5]}
        zoom={7}
        className="h-96 rounded-xl z-0"
        style={{ background: '#0A0E1A' }}
      >
        <TileLayer
          url={
            activeLayer === 'satellite'
              ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
              : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          }
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <MapContent
          districts={districts}
          selectedDistrict={selectedDistrict}
          onSelectDistrict={onSelectDistrict}
        />
      </MapContainer>
    </div>
  );
};

export default MapView;