/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  file: string | null;
  name: string
}
export interface StoredPDFContent {
  content: string;
  timestamp: number;
  fileUrl: string;
}



export const PDFViewer: React.FC<PDFViewerProps> = ({ file,name }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
const [papertitle,setpaperTitle]=useState('')
  const onDocumentLoadSuccess = async ({ numPages,title  }: { numPages: number,title:string }) => {
    setNumPages(numPages);
    console.log(title);
    
    setpaperTitle(title)

    await extractFullContent(file)
  };

  const extractFullContent = async (file: string | null) => {
    if (!file) {
      console.error('No file provided');
      return;
    }
  
    try {
      const pdf = await pdfjs.getDocument(file).promise;
      const fullContent: string[] = [];
  
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        try {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          console.log(`Extracted text for page ${pageNum}:`, pageText);
          fullContent.push(pageText);
        } catch (pageError) {
          console.error(`Error extracting text from page ${pageNum}:`, pageError);
        }
      }
console.log(papertitle,fullContent.join('\n\n'));

      localStorage.setItem(name, JSON.stringify(fullContent.join('\n\n')));
    
      return fullContent.join('\n\n');
    } catch (error) {
      console.error('Error loading PDF document:', error);
      return;
    }
  };
  

  


  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => Math.min(Math.max(1, prevPageNumber + offset), numPages));
  };

  if (!file) return null;

  return (
    <div className="flex flex-col items-center">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        className="max-w-full"
      >
        <Page 
          pageNumber={pageNumber} 
          
          className="shadow-lg rounded-lg overflow-hidden"
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => changePage(-1)}
          disabled={pageNumber <= 1}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <p className="text-sm">
          Page {pageNumber} of {numPages}
        </p>
        
        <button
          onClick={() => changePage(1)}
          disabled={pageNumber >= numPages}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};