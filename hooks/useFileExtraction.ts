import { useState, useCallback } from 'react';
import { extractTextFromFile } from '@/utils/textExtraction';
import { ExtractedResult, UploadProgress } from '@/types';

export const useFileExtraction = () => {
	const [extractedResults, setExtractedResults] = useState<ExtractedResult[]>([]);
	const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleFileExtraction = useCallback(async (file: File, previewUrl: string) => {
		const fileType = file.type === 'application/pdf' ? 'pdf' : 'image';

		setIsLoading(true);
		setUploadProgress({
			fileName: file.name,
			progress: 0,
			status: 'extracting',
		});

		try {
			const { text, confidence } = await extractTextFromFile(file, (progress) => {
				setUploadProgress((prev) =>
					prev ? { ...prev, progress, status: 'extracting' } : null,
				);
			});

			const result: ExtractedResult = {
				fileName: file.name,
				fileType,
				extractedText: text,
				previewUrl,
				confidence,
				extractedAt: new Date(),
			};

			setExtractedResults((prev) => [result, ...prev]);
			setUploadProgress({ fileName: file.name, progress: 100, status: 'complete' });

			// Clear progress after 2 seconds
			setTimeout(() => setUploadProgress(null), 2000);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Extraction failed';
			setUploadProgress({
				fileName: file.name,
				progress: 0,
				status: 'error',
				error: errorMessage,
			});
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		extractedResults,
		uploadProgress,
		isLoading,
		handleFileExtraction,
		clearResults: () => setExtractedResults([]),
	};
};

