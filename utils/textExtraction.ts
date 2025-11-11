import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import Tesseract from 'tesseract.js';


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

    if (typeof window === 'undefined') {
      throw new Error('PDF extraction must be run in a browser environment');
    }

    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs`;

    const pdf: PDFDocumentProxy = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';
    const totalPages = pdf.numPages;

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const page: PDFPageProxy = await pdf.getPage(pageNum);
      const textContent: any = await page.getTextContent();

      let lastY: number | null = null;
      let pageText = '';

      textContent.items.forEach((item: any) => {
        const currentY = item.transform[5]; // Y coordinate

        // Detect line break by significant change in Y coordinate
        if (lastY !== null && Math.abs(currentY - lastY) > 5) {
          pageText += '\n';
        }

        pageText += item.str;
        lastY = currentY;
      });

      fullText += pageText + '\n\n'; // Add double newline between pages

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

