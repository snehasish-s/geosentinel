import { Activity, AlertTriangle, Database, CheckCircle, XCircle, Loader } from 'lucide-react';

const stageIcons = {
  ingestion: Database,
  processing: Loader,
  alertEngine: AlertTriangle,
};

const stageLabels = {
  ingestion: 'Data Ingestion',
  processing: 'Processing',
  alertEngine: 'Alert Engine',
};

const PipelineStatus = ({ status, loading, onTrigger }) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="glass-card p-4 animate-pulse">
            <div className="h-4 bg-white/10 rounded w-32 mb-2" />
            <div className="h-3 bg-white/10 rounded w-24" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {Object.entries(status).map(([stage, data]) => {
        const Icon = stageIcons[stage];
        const isRunning = data.status === 'running';
        const isProcessing = data.status === 'processing';
        const isError = data.status === 'error';

        return (
          <div key={stage} className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  isError ? 'bg-space-alert/20' :
                  isProcessing ? 'bg-yellow-500/20' :
                  'bg-space-ndvi/20'
                }`}>
                  <Icon className={`w-4 h-4 ${
                    isError ? 'text-space-alert' :
                    isProcessing ? 'text-yellow-400' :
                    'text-space-ndvi'
                  } ${isProcessing ? 'animate-spin' : ''}`} />
                </div>
                <div>
                  <div className="font-medium text-white">{stageLabels[stage]}</div>
                  <div className="text-xs text-gray-500">{data.message}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`status-dot ${
                  isError ? 'status-error' :
                  isProcessing ? 'status-processing' :
                  'status-running'
                }`} />
                <span className={`text-xs ${
                  isError ? 'text-space-alert' :
                  isProcessing ? 'text-yellow-400' :
                  'text-space-ndvi'
                }`}>
                  {isError ? 'Error' : isProcessing ? 'Processing' : 'Running'}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      <button
        onClick={onTrigger}
        disabled={loading}
        className="w-full mt-4 py-2 px-4 rounded-lg bg-space-cyan/10 text-space-cyan border border-space-cyan/30 hover:bg-space-cyan/20 transition-colors disabled:opacity-50"
      >
        Trigger Pipeline
      </button>
    </div>
  );
};

export default PipelineStatus;