import React from 'react';
import { UploadProgress } from '@/types';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface ProgressBarProps {
  progress: UploadProgress | null;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  if (!progress) return null;

  const getStatusIcon = () => {
    switch (progress.status) {
      case 'complete':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'extracting':
      case 'uploading':
        return <Loader className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <p className="text-sm font-medium text-gray-700 truncate">{progress.fileName}</p>
          </div>
          <span className="text-xs font-semibold text-gray-600">{progress.progress}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              progress.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progress.progress}%` }}
          />
        </div>

        {progress.error && <p className="text-xs text-red-600 mt-2">{progress.error}</p>}
      </div>
    </div>
  );
};

