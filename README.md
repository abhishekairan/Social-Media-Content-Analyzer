# Social Media Content Analyzer - Text Extraction Module

A Nextjs application that extracts text from PDF and image files using Tesseract.js for OCR and pdf.js for PDF text extraction.

## Features

- ✅ **Drag-and-Drop Upload** - Large, prominent drop zone with visual feedback
- ✅ **Progress Tracking** - Real-time extraction progress with percentage
- ✅ **File Validation** - Format & size checks with clear error messages
- ✅ **Responsive Design** - Mobile-first, works on all screen sizes
- ✅ **Copy & Download** - Extract text utilities
- ✅ **Recent History** - Quick access to previous extractions
- ✅ **Responsive UI** - Works well on screen sizes


## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server on port 5001

## Supported Formats

- PDF files (.pdf)
- Image files (.png, .jpg, .jpeg, .webp)
- Maximum file size: 25MB

## Technology Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Tesseract.js** - OCR for image text extraction
- **pdf.js** - PDF text extraction
- **Lucide React** - Icons

## Deployment

The application can be deployed to Vercel, Netlify, or any Node.js hosting platform.

```bash
npm run build
npm run start
```

See demo on [text-extractor.abhishekairan.com](https://text-extractor.abhishekairan.com/)

## License

MIT

