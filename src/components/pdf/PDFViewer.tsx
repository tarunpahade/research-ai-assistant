/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PDFToolbar } from './PDFToolbar';
import { TableOfContents } from './TableOfContents';
import { PDFAnnotationLayer } from './PDFAnnotationLayer';
import { DrawingCanvas } from './DrawingCanvas';
import { useAnnotations } from '../../hooks/useAnnotations';
// import type { Annotation } from '../../types';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  file: string | null;
  onVisionRequest?: (selection: string) => void;
  onContentExtracted?: (content: string) => void;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ file, onVisionRequest,onContentExtracted }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { annotations, addAnnotation } = useAnnotations();

  const onDocumentLoadSuccess = async ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);


await extractFullContent()

  
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
    
        return fullContent.join('\n\n');
      } catch (error) {
        console.error('Error loading PDF document:', error);
        return;
      }
    };
    
  

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => Math.min(Math.max(1, prevPageNumber + offset), numPages));
  };

  const handleToolSelect = (tool: 'draw' | 'mark' | 'underline' | 'vision') => {
    setActiveTool(tool === activeTool ? null : tool);
    if (tool === 'vision' && onVisionRequest) {
      // Handle vision tool activation
    }
  };

  const handlePageLoadSuccess = async ({ width, height }: { width: number; height: number }) => {
    setPageSize({ width, height });
console.log(width,'width',height,'Height');

    const page = await pdfjs.getDocument(file as string).promise.getPage(pageNumber);
    const textContent = await page.getTextContent();
console.log(textContent,'this is the page content');

    // Convert extracted content into plain text
    const content = textContent.items.map((item: any) => item.str).join(' ');
    if (onContentExtracted) {
      onContentExtracted(content);
      console.log(content);
      
    }


  };

  if (!file) return null;

  return (
    <div className="flex flex-col h-full" ref={containerRef}>
      <PDFToolbar onToolSelect={handleToolSelect} activeTool={activeTool} />
      
      <div className="flex gap-4 flex-1 min-h-0">
        <TableOfContents
          items={[
            { pageNumber: 1, title: 'Introduction', level: 1 },
            { pageNumber: 1, title: 'Background', level: 2 },
          ]}
          onPageSelect={setPageNumber}
        />
        
        <div className="flex-1 overflow-auto relative">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            className="max-w-full"
          >
            <div className="relative">
              <Page 
                pageNumber={pageNumber} 
                className="shadow-lg rounded-lg overflow-hidden"
                renderTextLayer={false}
                renderAnnotationLayer={false}
                scale={scale}
                onLoadSuccess={handlePageLoadSuccess}
              />
              {activeTool === 'draw' && pageSize.width > 0 && (
                <DrawingCanvas
                  width={pageSize.width}
                  height={pageSize.height}
                  scale={scale}
                  className="cursor-crosshair"
                />
              )}
              <PDFAnnotationLayer
                annotations={annotations}
                scale={scale}
                onAnnotationClick={() => {}}
              />
            </div>
          </Document>
          
          <div className="flex items-center gap-4 mt-4 justify-center">
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
      </div>
    </div>
  );
};