export interface ExtractedResult {
	fileName: string;
	fileType: 'pdf' | 'image';
	extractedText: string;
	previewUrl: string;
	confidence?: number;
	extractedAt: Date;
}

export interface UploadProgress {
	fileName: string;
	progress: number; // 0-100
	status: 'idle' | 'uploading' | 'extracting' | 'complete' | 'error';
	error?: string;
}

export interface ExtractionOptions {
	language?: string;
	includeConfidence?: boolean;
}

