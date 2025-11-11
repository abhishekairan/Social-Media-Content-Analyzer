# Social Media Content Analyzer - Text Extraction Module

A lightweight React application that extracts text from PDF and image files using Tesseract.js for OCR and pdf.js for PDF text extraction.

## Features

- ✅ **Drag-and-Drop Upload** - Large, prominent drop zone with visual feedback
- ✅ **Progress Tracking** - Real-time extraction progress with percentage
- ✅ **Two-Column View** - Left preview, right extracted text
- ✅ **File Validation** - Format & size checks with clear error messages
- ✅ **Responsive Design** - Mobile-first, works on all screen sizes
- ✅ **Copy & Download** - Extract text utilities
- ✅ **Recent History** - Quick access to previous extractions
- ✅ **Clean Code** - TypeScript, modular components, proper error handling

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

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
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main app page
│   └── globals.css         # Global styles
├── components/
│   ├── FileUploader.tsx    # Drag-drop upload component
│   ├── ProgressBar.tsx     # Upload progress indicator
│   └── ResultView.tsx      # Two-column preview + extracted text
├── hooks/
│   └── useFileExtraction.ts # Custom hook for extraction logic
├── utils/
│   ├── textExtraction.ts   # PDF & OCR extraction logic
│   ├── fileValidation.ts   # File type & size validation
│   └── constants.ts        # Config constants
└── types/
    └── index.ts            # TypeScript interfaces
```

## Supported Formats

- PDF files (.pdf)
- Image files (.png, .jpg, .jpeg, .webp)
- Maximum file size: 25MB

## Technology Stack

- **Next.js** - React framework
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

## License

MIT

