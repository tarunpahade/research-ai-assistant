import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PDFViewer } from '../components/PDFViewer';
import { Chat } from '../components/Chat';
import type { ResearchPaper } from '../types';

export const PaperViewPage: React.FC = () => {
  const { paperId } = useParams<{ paperId: string }>();
  const location = useLocation();
  const paperInfo = location.state as ResearchPaper;

  const pdfUrl = paperInfo.file ? URL.createObjectURL(paperInfo.file) : paperInfo.url;

  return (
    <Layout>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">{paperInfo.title}</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PDF Viewer */}
        <div className="bg-white rounded-lg shadow-sm p-6 min-h-[700px]">
          <PDFViewer name={paperId!} file={pdfUrl || null} />
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-lg shadow-sm h-[700px]">
          <Chat name={paperId} />
        </div>
      </div>
    </Layout>
  );
};