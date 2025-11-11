'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FileUploader } from '@/components/FileUploader';
import { ProgressBar } from '@/components/ProgressBar';
import { ResultView } from '@/components/ResultView';
import { useFileExtraction } from '@/hooks/useFileExtraction';

export default function Home() {
  const { extractedResults, uploadProgress, isLoading, handleFileExtraction } =
    useFileExtraction();
  const [activeResultIndex, setActiveResultIndex] = useState<number | null>(null);
  const prevResultsLengthRef = useRef(0);

  // Automatically show the most recent result when a new extraction completes
  useEffect(() => {
    if (extractedResults.length > prevResultsLengthRef.current && !isLoading) {
      // New result was added and extraction is complete
      setActiveResultIndex(0);
    }
    prevResultsLengthRef.current = extractedResults.length;
  }, [extractedResults.length, isLoading]);

  const handleFileSelect = async (file: File, previewUrl: string) => {
    setActiveResultIndex(null); // Reset to show upload area while processing
    await handleFileExtraction(file, previewUrl);
  };

  const activeResult = activeResultIndex !== null ? extractedResults[activeResultIndex] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Text Extractor</h1>
          <p className="text-gray-600 mt-1">Extract text from PDFs and images instantly</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {activeResult ? (
          <ResultView
            result={activeResult}
            onBack={() => setActiveResultIndex(null)}
          />
        ) : (
          <div className="space-y-8">
            <FileUploader onFileSelect={handleFileSelect} isLoading={isLoading} />
            <ProgressBar progress={uploadProgress} />

            {/* Recent Extractions */}
            {extractedResults.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Extractions</h2>
                <div className="space-y-3">
                  {extractedResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveResultIndex(idx)}
                      className="w-full text-left p-4 hover:bg-blue-50 rounded-lg transition border border-gray-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{result.fileName}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {result.fileType.toUpperCase()} •{' '}
                            {new Date(result.extractedAt).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {result.extractedText}
                          </p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                          {result.fileType.toUpperCase()}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

