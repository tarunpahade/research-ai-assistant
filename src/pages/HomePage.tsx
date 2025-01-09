import React from 'react';
import { Layout } from '../components/Layout';
import { PaperInfoForm } from '../components/forms/PaperInfoForm';

export const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Convert Pdf structured data 
        </h2>
        <p className="text-gray-600">
          Leverage AI to finetune and convert to structured JSON query or JSONL 
        </p>
      </div>
      <PaperInfoForm />
    </Layout>
  );
};