export const validateFile = (file: File): { valid: boolean; error?: string } => {
  const SUPPORTED_FORMATS = [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
  ];
  const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (!SUPPORTED_FORMATS.includes(file.type)) {
    return {
      valid: false,
      error: `Unsupported file format. Supported: PDF, PNG, JPG, WEBP`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds 25MB limit. Current: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
    };
  }

  return { valid: true };
};

export const getFilePreviewUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject('Failed to read file');
    reader.readAsDataURL(file);
  });
};
