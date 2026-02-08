'use client';

import { motion } from 'framer-motion';
import { MapPin, Lock, CheckCircle2, Trophy } from 'lucide-react';
import { useWritingStore } from '@/stores/writing';

const steps = [
  { id: 1, name: '审题大本营', icon: '🎯', description: '高亮关键词，理解题意' },
  { id: 2, name: '密林寻宝', icon: '💎', description: '挖掘素材，收集宝石' },
  { id: 3, name: '半山凉亭', icon: '🏗️', description: '搭建结构，规划大纲' },
  { id: 4, name: '绝壁攀岩', icon: '🧗', description: '沉浸写作，伴随指导' },
  { id: 5, name: '云端魔镜', icon: '✨', description: '对比润色，提升文采' },
  { id: 6, name: '极顶插旗', icon: '🏆', description: '全景复盘，登顶庆祝' },
];

export function MountainMap() {
  const { currentStep, stepStatus, setCurrentStep } = useWritingStore();

  return (
    <div className="relative w-full h-64 mb-8">
      {/* 山脉背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-emerald-500 rounded-xl overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-800 to-transparent" />
      </div>

      {/* 登山路径 */}
      <svg className="absolute inset-0" viewBox="0 0 800 400">
        <path
          d="M 50 350 Q 150 300, 200 250 T 350 200 T 500 150 T 650 100 T 750 50"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeDasharray="10,5"
          opacity="0.5"
        />
      </svg>

      {/* 站点标记 */}
      {steps.map((step, index) => {
        const status = stepStatus[index];
        const isActive = currentStep === step.id;
        const isCompleted = status === 'completed';
        const isLocked = status === 'locked';

        const positions = [
          { x: 50, y: 350 },
          { x: 200, y: 250 },
          { x: 350, y: 200 },
          { x: 500, y: 150 },
          { x: 650, y: 100 },
          { x: 750, y: 50 },
        ];

        return (
          <motion.div
            key={step.id}
            className={`absolute cursor-pointer transition-all ${
              isActive ? 'scale-125' : 'scale-100'
            }`}
            style={{
              left: `${positions[index].x - 25}px`,
              top: `${positions[index].y - 25}px`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => !isLocked && setCurrentStep(step.id)}
          >
            {/* 站点气泡 */}
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                isActive
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 animate-pulse'
                  : isCompleted
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                  : isLocked
                  ? 'bg-gray-400'
                  : 'bg-white/30'
              }`}
            >
              <span className="text-2xl">{step.icon}</span>
            </div>

            {/* 站点信息 */}
            <div
              className={`mt-2 text-center text-white ${
                isActive ? 'font-bold' : ''
              }`}
            >
              <div className="text-sm">{step.name}</div>
              {isCompleted && (
                <CheckCircle2 className="w-4 h-4 mx-auto mt-1 text-green-400" />
              )}
              {isLocked && (
                <Lock className="w-4 h-4 mx-auto mt-1 text-gray-300" />
              )}
            </div>

            {/* 锁定提示 */}
            {isLocked && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded whitespace-nowrap">
                需要先完成上一步
              </div>
            )}
          </motion.div>
        );
      })}

      {/* 当前位置指示器 */}
      <motion.div
        className="absolute w-8 h-8 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${50 + (currentStep - 1) * 140}px`,
          top: `${350 - (currentStep - 1) * 50}px`,
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
      />

      {/* 当前步骤卡片 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-xl">
        <div className="text-center">
          <div className="text-sm text-gray-600">当前步骤</div>
          <div className="text-xl font-bold text-blue-600">
            {steps[currentStep - 1].name}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {steps[currentStep - 1].description}
          </div>
        </div>
      </div>
    </div>
  );
}
