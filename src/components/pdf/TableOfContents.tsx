import React from 'react';
import { ChevronDown } from 'lucide-react';

interface TOCItem {
  pageNumber: number;
  title: string;
  level: number;
  children?: TOCItem[];
}

interface TableOfContentsProps {
  items: TOCItem[];
  onPageSelect: (pageNumber: number) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items, onPageSelect }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
        Table of Contents
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </h3>
      <nav className="space-y-1">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => onPageSelect(item.pageNumber)}
            className={`w-full text-left px-2 py-1 rounded hover:bg-gray-50 text-sm
              ${item.level > 1 ? 'ml-' + (item.level - 1) * 4 : ''}`}
          >
            {item.title}
          </button>
        ))}
      </nav>
    </div>
  );
};