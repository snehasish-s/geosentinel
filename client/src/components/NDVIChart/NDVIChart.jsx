import { useMemo } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-space-navy/90 backdrop-blur-md border border-space-cyan/20 rounded-lg p-3">
        <p className="text-space-cyan font-semibold">{payload[0].value.toFixed(3)}</p>
        <p className="text-gray-400 text-xs">NDVI Index</p>
      </div>
    );
  }
  return null;
};

const NDVIChart = ({ value = 0.5, loading }) => {
  const data = useMemo(() => [
    {
      name: 'NDVI',
      value: Math.round(value * 100) / 100,
      fill: value < 0.3 ? '#FF4136' : value < 0.5 ? '#FFD700' : '#39FF14',
    },
  ], [value]);

  if (loading) {
    return (
      <div className="h-48 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-space-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="90%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            background={{ fill: 'rgba(255,255,255,0.05)' }}
            dataKey="value"
            cornerRadius={10}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="text-center -mt-16">
        <div className={`text-3xl font-bold ${
          value < 0.3 ? 'text-space-alert' : value < 0.5 ? 'text-yellow-400' : 'text-space-ndvi'
        }`}>
          {value.toFixed(3)}
        </div>
        <div className="text-xs text-gray-500 mt-1">NDVI Index</div>
      </div>
    </div>
  );
};

export default NDVIChart;