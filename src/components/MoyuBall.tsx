'use client';

import { motion } from 'framer-motion';
import { useWritingStore } from '@/stores/writing';
import { MindFlowState } from '@/types/writing';

export function MoyuBall() {
  const { mindFlowState } = useWritingStore();

  // 根据状态确定表情
  const getExpression = () => {
    switch (mindFlowState) {
      case 'flow':
        return 'star-eyes'; // 星星眼
      case 'thinking':
        return 'spiral-eyes'; // 蚊香眼
      case 'stuck':
        return 'sweat'; // 流汗
      case 'idle':
        return 'normal'; // 正常
      default:
        return 'normal';
    }
  };

  const expression = getExpression();

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 cursor-pointer select-none"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', damping: 10 }}
    >
      {/* 墨玉球体 */}
      <motion.div
        className={`w-24 h-24 rounded-full relative overflow-hidden shadow-2xl`}
        style={{
          background: 'radial-gradient(circle at 30% 30%, #6b46c1, #44337a)',
        }}
        animate={{
          backgroundColor: [
            mindFlowState === 'stuck' ? '#a0aec0' : '#6b46c1',
            mindFlowState === 'flow' ? '#f56565' : '#6b46c1',
          ],
        }}
        transition={{
          backgroundColor: { duration: 0.5 },
          repeat: mindFlowState === 'flow' ? Infinity : 0,
          repeatType: 'reverse',
        }}
      >
        {/* 眼睛 */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-4">
          {/* 左眼 */}
          <motion.div
            className="w-8 h-8 bg-white rounded-full relative overflow-hidden border-2 border-black"
            animate={{
              rotate: [0, 5, -5, 0],
              transition: {
                duration: 4,
                repeat: expression === 'normal' ? Infinity : 0,
                repeatType: 'reverse',
              },
            }}
          >
            {/* 眼珠 */}
            <motion.div
              className="absolute inset-1 bg-black rounded-full"
              animate={{
                scale: expression === 'star-eyes' ? [1, 1.2, 1] : 1,
                backgroundColor:
                  expression === 'star-eyes'
                    ? ['#ffd700', '#ffed4e', '#ffd700']
                    : expression === 'spiral-eyes'
                    ? '#6b46c1'
                    : expression === 'sweat'
                    ? '#000000'
                    : '#000000',
              }}
              transition={{
                scale: {
                  duration: 0.5,
                  repeat: expression === 'star-eyes' ? Infinity : 0,
                },
                backgroundColor: {
                  duration: 1,
                  repeat: expression === 'star-eyes' ? Infinity : 0,
                },
              }}
            >
              {/* 星星眼特效 */}
              {expression === 'star-eyes' && (
                <div className="absolute inset-0 flex items-center justify-center text-yellow-300 text-lg">
                  ⭐
                </div>
              )}

              {/* 蚊香眼特效 */}
              {expression === 'spiral-eyes' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-black rounded-full animate-spin" />
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* 右眼 - 镜像 */}
          <motion.div
            className="w-8 h-8 bg-white rounded-full relative overflow-hidden border-2 border-black"
            animate={{
              rotate: [0, -5, 5, 0],
              transition: {
                duration: 4,
                repeat: expression === 'normal' ? Infinity : 0,
                repeatType: 'reverse',
              },
            }}
          >
            {/* 眼珠 */}
            <motion.div
              className="absolute inset-1 bg-black rounded-full"
              animate={{
                scale: expression === 'star-eyes' ? [1, 1.2, 1] : 1,
                backgroundColor:
                  expression === 'star-eyes'
                    ? ['#ffd700', '#ffed4e', '#ffd700']
                    : expression === 'spiral-eyes'
                    ? '#6b46c1'
                    : expression === 'sweat'
                    ? '#000000'
                    : '#000000',
              }}
              transition={{
                scale: {
                  duration: 0.5,
                  repeat: expression === 'star-eyes' ? Infinity : 0,
                },
                backgroundColor: {
                  duration: 1,
                  repeat: expression === 'star-eyes' ? Infinity : 0,
                },
              }}
            >
              {/* 星星眼特效 */}
              {expression === 'star-eyes' && (
                <div className="absolute inset-0 flex items-center justify-center text-yellow-300 text-lg">
                  ⭐
                </div>
              )}

              {/* 蚊香眼特效 */}
              {expression === 'spiral-eyes' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-black rounded-full animate-spin" />
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* 流汗特效 */}
        {expression === 'sweat' && (
          <motion.div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-300 rounded-full"
            animate={{
              y: [-5, 5],
              opacity: [0, 1, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
              },
            }}
          />
        )}

        {/* 嘴巴 */}
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-10 h-3 bg-black rounded-full overflow-hidden">
          <div
            className="w-full h-full bg-red-500"
            style={{
              clipPath:
                expression === 'star-eyes'
                  ? 'polygon(0% 100%, 50% 0%, 100% 100%)' // 笑脸
                  : expression === 'sweat'
                  ? 'polygon(20% 50%, 80% 50%)' // 直线
                  : 'ellipse(50% 50% at 50% 50%)', // 椭圆
            }}
          />
        </div>

        {/* 墨镜（严师模式） */}
        {mindFlowState === 'stuck' && (
          <div className="absolute top-1/3 left-0 right-0 h-8 bg-black/80 rounded-b-lg" />
        )}
      </motion.div>

      {/* 名字标签 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full bg-purple-600 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap mt-2 shadow-lg">
        墨玉
      </div>

      {/* 状态提示 */}
      <motion.div
        className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded whitespace-nowrap"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        {mindFlowState === 'flow' && '写得真棒！✨'}
        {mindFlowState === 'thinking' && '在思考呢...🤔'}
        {mindFlowState === 'stuck' && '遇到困难了吗？😅'}
        {mindFlowState === 'idle' && '等你哦~😊'}
      </motion.div>
    </motion.div>
  );
}
