import React, { useState } from 'react';
import { ExtractedResult } from '@/types';
import { Copy, Download, ChevronLeft } from 'lucide-react';

interface ResultViewProps {
  result: ExtractedResult | null;
  onBack: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ result, onBack }) => {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const handleCopyText = () => {
    navigator.clipboard.writeText(result.extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([result.extractedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    // Remove file extension and add .txt
    const fileNameWithoutExt = result.fileName.replace(/\.[^/.]+$/, '');
    element.download = `${fileNameWithoutExt}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  };

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <p className="text-sm font-medium text-gray-900">{result.fileName}</p>
            <p className="text-xs text-gray-500">
              {result.fileType.toUpperCase()} • {new Date(result.extractedAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition text-sm font-medium"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownloadText}
            className="flex items-center gap-2 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 h-[calc(100%-80px)] overflow-hidden">
        {/* Left: Preview */}
        <div className="flex flex-col bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-white">
            <p className="text-sm font-semibold text-gray-700">File Preview</p>
          </div>
          <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
            {result.fileType === 'pdf' ? (
              <iframe
                src={result.previewUrl}
                className="w-full h-full min-h-[600px] rounded-lg"
                title="PDF Preview"
              />
            ) : (
              <img
                src={result.previewUrl}
                alt="Preview"
                className="max-w-full h-auto rounded-lg shadow-sm"
              />
            )}
          </div>
        </div>

        {/* Right: Extracted Text */}
        <div className="flex flex-col bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
            <p className="text-sm font-semibold text-gray-700">Extracted Text</p>
            {result.confidence !== undefined && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {result.confidence.toFixed(0)}% confidence
              </span>
            )}
          </div>
          <div className="flex-1 overflow-auto p-4">
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {result.extractedText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

