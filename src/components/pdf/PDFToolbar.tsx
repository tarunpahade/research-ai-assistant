import React from 'react';
import { Code, Highlighter, Underline, Eye, Eraser } from 'lucide-react';

interface PDFToolbarProps {
  onToolSelect: (tool: 'draw' | 'mark' | 'underline' | 'vision') => void;
  activeTool: string | null;
}

export const PDFToolbar: React.FC<PDFToolbarProps> = ({ onToolSelect, activeTool }) => {
  const tools = [
    { id: 'draw', icon: Code, label: 'Draw Code' },
    { id: 'mark', icon: Highlighter, label: 'Mark' },
    { id: 'underline', icon: Underline, label: 'Underline' },
    { id: 'vision', icon: Eye, label: 'Ask Vision' },
  ];

  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg mb-4">
      <div className="flex gap-2">
        {tools.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onToolSelect(id as 'draw' | 'mark' | 'underline' | 'vision')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              activeTool === id
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            title={label}
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
      
      <div className="flex gap-2">
        <button
          className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
          title="Eraser"
        >
          <Eraser className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};