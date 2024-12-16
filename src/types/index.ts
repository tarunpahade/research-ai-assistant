export interface ResearchPaper {
  id: string;
  title: string;
  url?: string;
  file?: File;
  uploadDate: Date;
}

export interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Annotation {
  type: 'draw' | 'mark' | 'underline';
  points?: { x: number; y: number }[];
  text?: string;
  position?: { x: number; y: number; width: number; height: number };
}

export interface TOCItem {
  pageNumber: number;
  title: string;
  level: number;
  children?: TOCItem[];
}