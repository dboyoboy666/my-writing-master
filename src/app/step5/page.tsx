'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, Award } from 'lucide-react';
import { useWritingStore } from '@/stores/writing';

export default function Step5PolishingMirror() {
  const { completeStep, setPolished, draft } = useWritingStore();
  const [polished, setPolishedLocal] = useState('');
  const [showComparison, setShowComparison] = useState(false);
  const [highlightOriginal, setHighlightOriginal] = useState(false);
  const [highlightPolished, setHighlightPolished] = useState(false);

  const handleAutoPolish = () => {
    // 模拟AI润色（实际应该调用AI API）
    setShowComparison(true);

    const basicImprovements = draft
      .replace(/很/, '非常')
      .replace(/说/, '说道')
      .replace(/走/, '漫步')
      .replace(/看/, '凝视');

    setPolishedLocal(basicImprovements);
  };

  const handleManualEdit = (e: React.ChangeInterceptor<HTMLTextAreaElement>) => {
    setPolishedLocal(e.target.value);
  };

  const handleComplete = () => {
    setPolished(polished || draft);
    completeStep(5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-100 py-8">
      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-pink-800 mb-2">✨ 云端魔镜</h1>
        <p className="text-lg text-gray-600">对比润色，提升文采</p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4">
        {/* 自动润色按钮 */}
        {!showComparison && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center"
          >
            <Sparkles className="w-16 h-16 mx-auto text-yellow-500 mb-4 animate-pulse" />
            <h2 className="text-2xl font-semibold mb-4">让墨玉帮你润色</h2>
            <p className="text-gray-600 mb-6">
              墨玉会对比你的原文和润色后的版本，帮你学习如何提升文采。
            </p>
            <motion.button
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAutoPolish}
            >
              ✨ 智能润色
            </motion.button>
          </motion.div>
        )}

        {/* 对比展示 */}
        {showComparison && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-8 mb-8"
          >
            {/* 原文 */}
            <motion.div
              className={`bg-white rounded-2xl shadow-xl p-8 ${
                highlightOriginal ? 'ring-4 ring-blue-500' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setHighlightOriginal(true)}
              onHoverEnd={() => setHighlightOriginal(false)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-700">📝 原文</h3>
                <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {draft.length} 字
                </div>
              </div>
              <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-line">
                {draft}
              </div>
            </motion.div>

            {/* 润色版 */}
            <motion.div
              className={`bg-white rounded-2xl shadow-xl p-8 ${
                highlightPolished ? 'ring-4 ring-green-500' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setHighlightPolished(true)}
              onHoverEnd={() => setHighlightPolished(false)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-green-700">✨ 润色版</h3>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {polished.length} 字
                </div>
              </div>
              <textarea
                value={polished}
                onChange={handleManualEdit}
                className="w-full min-h-[400px] p-4 border-2 border-green-200 rounded-lg focus:ring-4 focus:ring-green-200 focus:border-green-500 resize-none text-lg"
              />
            </motion.div>
          </motion.div>
        )}

        {/* 润色技巧提示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Award className="w-6 h-6 mr-2 text-purple-600" />
            润色小技巧
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="font-semibold text-purple-700 mb-2">丰富动词</p>
              <p className="text-sm text-gray-600">用"漫步"代替"走"，用"凝视"代替"看"</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="font-semibold text-blue-700 mb-2">添加修饰</p>
              <p className="text-sm text-gray-600">加入形容词和副词，让描写更具体</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="font-semibold text-green-700 mb-2">运用修辞</p>
              <p className="text-sm text-gray-600">适当使用比喻、拟人等修辞手法</p>
            </div>
          </div>
        </motion.div>

        {/* 最终版本确认 */}
        {(showComparison || polished) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h3 className="text-xl font-semibold mb-4">🎯 最终版本</h3>
            <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-line bg-gray-50 p-6 rounded-lg">
              {polished || draft}
            </div>
          </motion.div>
        )}

        {/* 通关按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <motion.button
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-4 rounded-xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleComplete}
          >
            <div className="flex items-center justify-center">
              <CheckCircle className="w-8 h-8 mr-2" />
              ✅ 润色完成，准备登顶！
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
