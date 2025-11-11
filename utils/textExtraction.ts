import * as pdfjsLib from 'pdfjs-dist';
import Tesseract from 'tesseract.js';

// Set up PDF.js worker - use unpkg CDN for reliability
if (typeof window !== 'undefined') {
  // Get the version from the installed package
  const workerVersion = pdfjsLib.version || '4.10.38';
  // Use unpkg CDN which is more reliable than cdnjs
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${workerVersion}/build/pdf.worker.min.mjs`;
}

/**
 * Extract text from PDF file
 * @param file - PDF file to extract
 * @param onProgress - Callback for progress updates
 * @returns Extracted text
 */
export const extractTextFromPDF = async (
  file: File,
  onProgress?: (progress: number) => void,
): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';
    const totalPages = pdf.numPages;

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';

      // Report progress
      if (onProgress) {
        onProgress(Math.round((pageNum / totalPages) * 100));
      }
    }

    return fullText.trim();
  } catch (error) {
    throw new Error(
      `PDF extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

/**
 * Extract text from image using OCR (Tesseract.js)
 * @param file - Image file to extract
 * @param onProgress - Callback for progress updates
 * @returns Extracted text and confidence score
 */
export const extractTextFromImage = async (
  file: File,
  onProgress?: (progress: number) => void,
): Promise<{ text: string; confidence: number }> => {
  try {
    const imageUrl = URL.createObjectURL(file);

    const result = await Tesseract.recognize(imageUrl, 'eng', {
      logger: (message) => {
        if (message.progress) {
          onProgress?.(Math.round(message.progress * 100));
        }
      },
    });

    URL.revokeObjectURL(imageUrl);

    return {
      text: result.data.text.trim(),
      confidence: result.data.confidence || 0,
    };
  } catch (error) {
    throw new Error(
      `OCR extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

/**
 * Main extraction handler
 */
export const extractTextFromFile = async (
  file: File,
  onProgress?: (progress: number) => void,
): Promise<{ text: string; confidence?: number }> => {
  const isPDF = file.type === 'application/pdf';

  if (isPDF) {
    const text = await extractTextFromPDF(file, onProgress);
    return { text };
  } else {
    return await extractTextFromImage(file, onProgress);
  }
};

