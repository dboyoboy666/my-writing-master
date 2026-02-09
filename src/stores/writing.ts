import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WritingProcess, StepStatus, MindFlowState, GameElements, Achievement } from '@/types/writing';

interface WritingStore extends WritingProcess {
  // Actions
  setCurrentStep: (step: number) => void;
  completeStep: (step: number) => void;
  resetProcess: () => void;
  addKeyword: (keyword: string) => void;
  addMaterial: (material: string) => void;
  setStructure: (structure: any) => void;
  setDraft: (draft: string) => void;
  setPolished: (polished: string) => void;

  // Mind Flow
  mindFlowState: MindFlowState;
  lastActivity: number;
  setMindFlowState: (state: MindFlowState) => void;
  updateActivity: () => void;

  // Game Elements
  gameElements: GameElements;
  collectGoldenChar: (char: string) => void;
  unlockAchievement: (achievementId: string) => void;
}

export const useWritingStore = create<WritingStore>()(
  persist(
    (set) => ({
      // Writing Process
      currentStep: 1,
      stepStatus: ['active', 'locked', 'locked', 'locked', 'locked', 'locked'],
      totalTime: 0,
      collectedKeywords: [],
      collectedMaterials: [],
      structure: {
        id: 'home',
        name: '首页',
        description: '首页初始结构',
        slots: []
      },
      draft: '',
      polished: '',

      setCurrentStep: (step) => set({ currentStep: step }),
      completeStep: (step) => {
        set((state) => {
          const newStatus = [...state.stepStatus];
          newStatus[step - 1] = 'completed';
          if (step < 6) newStatus[step] = 'active';
          return { stepStatus: newStatus, currentStep: step + 1 };
        });
      },
      resetProcess: () =>
        set({
          currentStep: 1,
          stepStatus: ['active', 'locked', 'locked', 'locked', 'locked', 'locked'],
          totalTime: 0,
          collectedKeywords: [],
          collectedMaterials: [],
          structure: {
        id: 'home',
        name: '首页',
        description: '首页初始结构',
        slots: []
      },
          draft: '',
          polished: '',
        }),
      addKeyword: (keyword) =>
        set((state) => ({ collectedKeywords: [...state.collectedKeywords, keyword] })),
      addMaterial: (material) =>
        set((state) => ({ collectedMaterials: [...state.collectedMaterials, material] })),
      setStructure: (structure) => set({ structure }),
      setDraft: (draft) => set({ draft }),
      setPolished: (polished) => set({ polished }),

      // Mind Flow
      mindFlowState: 'idle',
      lastActivity: Date.now(),
      setMindFlowState: (state) => set({ mindFlowState: state }),
      updateActivity: () => set({ lastActivity: Date.now() }),

      // Game Elements
      gameElements: {
        goldenChars: [],
        totalChars: 8,
        collectedChars: 0,
        achievements: [
          { id: 'first_step', name: '第一步', description: '完成审题大本营', icon: '🎯', unlocked: false },
          { id: 'inspiration_master', name: '灵感大师', description: '收集10个素材宝石', icon: '💎', unlocked: false },
          { id: 'structure_builder', name: '结构大师', description: '完成大纲搭建', icon: '🏗️', unlocked: false },
          { id: 'draft_writer', name: '草稿达人', description: '完成初稿写作', icon: '✍️', unlocked: false },
          { id: 'polish_expert', name: '润色专家', description: '完成文章润色', icon: '✨', unlocked: false },
          { id: 'summit_reacher', name: '登顶者', description: '成功到达山巅', icon: '🏆', unlocked: false },
        ],
      },
      collectGoldenChar: (char) =>
        set((state) => {
          const newChars = [...state.gameElements.goldenChars, char];
          return {
            gameElements: {
              ...state.gameElements,
              goldenChars: newChars,
              collectedChars: newChars.length,
            },
          };
        }),
      unlockAchievement: (achievementId) =>
        set((state) => ({
          gameElements: {
            ...state.gameElements,
            achievements: state.gameElements.achievements.map((a) =>
              a.id === achievementId ? { ...a, unlocked: true } : a
            ),
          },
        })),
    }),
    {
      name: 'writing-master-storage',
    }
  )
);
