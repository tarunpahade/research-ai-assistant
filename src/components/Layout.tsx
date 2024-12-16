import React from 'react';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Research Assistant</h1>
          </Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};