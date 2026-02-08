// AI引擎配置
export interface AIConfig {
  model: string;
  apiKey: string;
  maxTokens: number;
  temperature: number;
}

// 三阶认知迭代
export type CognitiveStage = 'spark' | 'dig' | 'refine';

export interface AIResponse {
  stage: CognitiveStage;
  content: string;
  thinkingProcess?: string;
  suggestions?: string[];
  keywords?: string[];
}

// 灵感阶梯
export interface InspirationStep {
  level: 1 | 2 | 3;
  guidance: string;
  examples?: { basic: string; advanced: string };
  explanation?: string;
}

// 苏格拉底式追问
export interface SocraticQuestion {
  category: 'sensory' | 'emotional' | 'logical' | 'perspective';
  question: string;
  hint?: string;
}

// 上下文压缩
export interface ContextSummary {
  timestamp: number;
  summary: string;
  keyPoints: string[];
  wordCount: number;
}
