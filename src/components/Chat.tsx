import React, { useState } from "react";
import { Send } from "lucide-react";

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatProps {
  name: string;
}

export const Chat: React.FC<ChatProps> = ({ name }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const pdfContent = localStorage.getItem(name);
console.log(pdfContent);

    const url = "https://omj0m0.buildship.run/chatWithPdf"
    const data = {
      pdfContent: pdfContent,
      prompt: input+' paper details'+pdfContent,
    };
    try {
      console.log("Sending request",pdfContent);
      
      const response = await fetch(url!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.text();
      console.log("Success:", result);
      setMessages((prev) => [...prev, { text: input, isUser: true }]);

      setMessages((prev) => [
        ...prev,
        {
          text: result,
          isUser: false,
        },
      ]);

      setInput("");
    } catch (error) {
      alert("Error while featching response");
    }
  };
  // Add user message

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.isUser
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your document..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
