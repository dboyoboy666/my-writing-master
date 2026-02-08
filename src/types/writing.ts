// 作文类型定义
export interface WritingMaterial {
  topic: string;
  keywords: string[];
  materials: string[];
  structure: string[];
  draft: string;
}

// 六步流程状态
export interface WritingProcess {
  currentStep: number; // 1-6
  stepStatus: StepStatus[];
  totalTime: number;
  collectedKeywords: string[];
  collectedMaterials: string[];
  structure: StructureTemplate | null;
  draft: string;
  polished: string;
}

export type StepStatus = 'locked' | 'active' | 'completed';

// 结构模板
export interface StructureTemplate {
  id: string;
  name: string;
  type: 'yiyang' | 'shunxu' | 'daoxu' | 'chafa';
  slots: StructureSlot[];
}

export interface StructureSlot {
  id: string;
  name: string;
  description: string;
  content: string;
}

// AI消息类型
export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// 鹦鹉学舌检测
export interface ParrotCheckResult {
  isParrot: boolean;
  similarity: number;
  originalSentence: string;
  suggestions: string[];
}

// 雷达图数据
export interface RadarData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
}

// 游戏化元素
export interface GameElements {
  goldenChars: string[];
  totalChars: number;
  collectedChars: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

// 心流状态
export type MindFlowState = 'flow' | 'thinking' | 'stuck' | 'idle';
