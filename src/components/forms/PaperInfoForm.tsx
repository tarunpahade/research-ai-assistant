import React, { useState } from 'react';
import { 
  //Upload,
   Link as LinkIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { pdfjs } from 'react-pdf';

export const PaperInfoForm: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [file, 
  //  setFile
  ] = useState<File | null>(null);

  const [isUrlInput, setIsUrlInput] = useState(false);

// const handleAPICall = async (pdfData: string) => {
//     const input='Convert this data into Structured JSON data  No Need for comments or justifications'; 
//     if (pdfData) return;
    
// console.log(pdfData);

//     const url = "https://omj0m0.buildship.run/chatWithPdf"
//     const data = {
//       pdfContent: pdfData,
//       prompt: input+' paper details'+pdfData,
//     };
//     try {
//       console.log("Sending request",pdfData);
      
//       const response = await fetch(url!, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       const result = await response.text();
//       console.log("Success:", result);
// return result;
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       alert("Error while featching response");
//     }
//   };
//   const extractFullContent = async (file: string | null) => {
//     if (!file) {
//       console.error('No file provided');
//       return;
//     }
  
//     try {




//       const pdf = await pdfjs.getDocument(file).promise;
//       const fullContent: string[] = [];
  
//       for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//         try {
//           const page = await pdf.getPage(pageNum);
//           const textContent = await page.getTextContent();
          
//           const pageText = textContent.items.map((item: any) => item.str).join(' ');
//           console.log(`Extracted text for page ${pageNum}:`, pageText);
//           fullContent.push(pageText);
//         } catch (pageError) {
//           console.error(`Error extracting text from page ${pageNum}:`, pageError);
//         }
//       }
// console.log(title,fullContent.join('\n\n'));

// const geminiResp=await handleAPICall(fullContent.join('\n\n'));    
//       return geminiResp;
//     } catch (error) {
//       console.error('Error loading PDF document:', error);
//       return;
//     }
//   };
  



  const handleSubmit = (e: React.FormEvent) => {
//send a API Call to gemini



    e.preventDefault();
    const paperId = encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'));
    navigate(`/paper/${paperId}`, { 
      state: { 
        title,
        url: url || undefined,
        file: file || undefined,
        uploadDate: new Date()
      } 
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Paper Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter paper title"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setIsUrlInput(!isUrlInput)}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              {isUrlInput ? 'Convert to structured JSON' : 'Convert to JSONL for finetuning'}
            </button>
          </div>

          {/* {isUrlInput ? ( */}
            <div className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter PDF URL"
              />
            </div>
          {/* // ) : (
          //   <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
          //     <Upload className="w-8 h-8 text-gray-400" />
          //     <span className="mt-2 text-sm text-gray-500">
          //       {file ? file.name : 'Upload PDF'}
          //     </span>
          //     <input
          //       type="file"
          //       accept=".pdf"
          //       onChange={handleFileChange}
          //       className="hidden"
          //     />
          //   </label>
          // )} */}
        </div>

        <button
          type="submit"
          disabled={!title || (!file && !url)}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </form>
    </div>
  );
};