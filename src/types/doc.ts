export interface QuickstartStep {
  step: number;
  title: string;
  command: string;
  explanation: string;
  tip?: string;
}

export interface DocSection {
  id: string;
  title: string;
  category: "guide" | "concepts" | "reference";
  summary: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
    caption?: string;
  };
}
