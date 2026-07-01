import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, FileText, Image, Archive, CheckCircle, Loader } from 'lucide-react';
import { uploadsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const fileTypeIcons = {
  '.tif': Image,
  '.tiff': Image,
  '.geojson': FileText,
  '.shp': FileText,
  '.zip': Archive,
  '.csv': FileText,
};

const UploadZone = ({ onUploadComplete }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append('file', file);

      const fileObj = {
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: file.size,
        type: file.name.split('.').pop(),
        status: 'uploading',
        progress: 0,
      };

      setFiles(prev => [...prev, fileObj]);
      setUploading(true);

      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === fileObj.id && f.progress < 90) {
            return { ...f, progress: f.progress + 10 };
          }
          return f;
        }));
      }, 200);

      try {
        await uploadsAPI.upload(formData);
        clearInterval(interval);
        setFiles(prev => prev.map(f => {
          if (f.id === fileObj.id) {
            return { ...f, status: 'done', progress: 100 };
          }
          return f;
        }));
        toast.success(`Pipeline started for ${file.name}`);
      } catch (error) {
        clearInterval(interval);
        setFiles(prev => prev.map(f => {
          if (f.id === fileObj.id) {
            return { ...f, status: 'error', progress: 0 };
          }
          return f;
        }));
        toast.error(`Failed to upload ${file.name}`);
      }

      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/tiff': ['.tif', '.tiff'],
      'application/geo+json': ['.geojson'],
      'application/zip': ['.zip'],
      'text/csv': ['.csv'],
    },
  });

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
          isDragActive
            ? 'border-space-cyan bg-space-cyan/10'
            : 'border-white/20 hover:border-space-cyan/50 hover:bg-white/5'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-space-cyan/20 to-blue-600/20 flex items-center justify-center">
            <Upload className="w-8 h-8 text-space-cyan" />
          </div>
          <div>
            <p className="text-lg font-medium text-white">
              {isDragActive ? 'Drop files here' : 'Drag & drop satellite files'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              or click to browse • .tif, .tiff, .geojson, .shp, .zip, .csv
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Upload Queue</h3>
          {files.map((file) => {
            const Icon = fileTypeIcons[`.${file.type}`] || File;
            return (
              <div key={file.id} className="glass-card p-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    file.status === 'done' ? 'bg-space-ndvi/20' :
                    file.status === 'error' ? 'bg-space-alert/20' :
                    'bg-space-cyan/20'
                  }`}>
                    {file.status === 'uploading' ? (
                      <Loader className="w-5 h-5 text-space-cyan animate-spin" />
                    ) : file.status === 'done' ? (
                      <CheckCircle className="w-5 h-5 text-space-ndvi" />
                    ) : (
                      <Icon className="w-5 h-5 text-space-cyan" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">{file.name}</span>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs text-gray-500 uppercase">{file.type}</span>
                      <span className="text-xs text-gray-500">{formatSize(file.size)}</span>
                      <span className={`text-xs ${
                        file.status === 'done' ? 'text-space-ndvi' :
                        file.status === 'error' ? 'text-space-alert' :
                        'text-space-cyan'
                      }`}>
                        {file.status === 'uploading' ? 'Uploading...' :
                         file.status === 'done' ? 'Complete' :
                         file.status === 'error' ? 'Failed' : 'Pending'}
                      </span>
                    </div>
                    {file.status === 'uploading' && (
                      <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-space-cyan transition-all duration-200"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UploadZone;