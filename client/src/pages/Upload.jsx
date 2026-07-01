import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, File, Download, Trash2, Loader } from 'lucide-react';
import UploadZone from '../components/UploadZone/UploadZone';
import { uploadsAPI } from '../services/api';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const UploadPage = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUploads = async () => {
    try {
      const { data } = await uploadsAPI.getAll();
      setUploads(data.data);
    } catch (err) {
      console.error('Fetch uploads error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  const handleDelete = async (id) => {
    try {
      await uploadsAPI.delete(id);
      toast.success('File deleted');
      fetchUploads();
    } catch (err) {
      toast.error('Failed to delete file');
    }
  };

  const handleExportReport = async () => {
    try {
      const { data } = await uploadsAPI.exportReport();
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'processing-report.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Report downloaded');
    } catch (err) {
      toast.error('Failed to export report');
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const processingCount = uploads.filter(u => u.status === 'Processing' || u.status === 'Queued').length;
  const doneCount = uploads.filter(u => u.status === 'Done').length;

  return (
    <div className="min-h-screen bg-space-black p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-display font-bold text-white">Satellite Data Upload Center</h1>
          <p className="text-gray-500 mt-1">Upload and process multisource raster and vector satellite data</p>
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="glass-card p-6 mb-6">
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Upload Files</h2>
                <UploadZone onUploadComplete={fetchUploads} />
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Quick Stats</h2>
                  <button
                    onClick={handleExportReport}
                    className="flex items-center space-x-2 text-xs text-space-cyan hover:text-space-cyan/80"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Report</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold text-space-cyan">{processingCount}</div>
                    <div className="text-xs text-gray-500">Processing</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold text-space-ndvi">{doneCount}</div>
                    <div className="text-xs text-gray-500">Completed</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="glass-card p-6">
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Processing Queue</h2>

                {loading ? (
                  <div className="flex items-center justify-center h-48">
                    <Loader className="w-8 h-8 text-space-cyan animate-spin" />
                  </div>
                ) : uploads.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No files uploaded yet
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Size</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Uploaded</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {uploads.map((upload) => (
                          <tr key={upload._id} className="hover:bg-white/5">
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-3">
                                <File className="w-5 h-5 text-space-cyan" />
                                <span className="text-sm text-white truncate max-w-[150px]">{upload.originalName}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-400 uppercase">
                              {upload.mimetype?.split('/')[1] || upload.originalName?.split('.').pop()}
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-400">
                              {formatSize(upload.size)}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                upload.status === 'Done' ? 'bg-space-ndvi/20 text-space-ndvi' :
                                upload.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-400' :
                                upload.status === 'Failed' ? 'bg-space-alert/20 text-space-alert' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {upload.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-400">
                              {format(new Date(upload.uploadedAt), 'dd MMM HH:mm')}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => handleDelete(upload._id)}
                                className="p-1.5 rounded-lg hover:bg-space-alert/20 text-gray-400 hover:text-space-alert transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;