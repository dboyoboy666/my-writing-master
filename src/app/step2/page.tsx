'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gem, MessageSquare, Plus } from 'lucide-react';
import { useWritingStore } from '@/stores/writing';
import { CognitiveEngine } from '@/lib/cognitive-engine';
import { SocraticQuestion } from '@/types/ai';

export default function Step2InspirationMine() {
  const { completeStep, addMaterial } = useWritingStore();
  const [materials, setMaterials] = useState<string[]>([]);
  const [currentMaterial, setCurrentMaterial] = useState('');
  const [questions, setQuestions] = useState<SocraticQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [collectedGems, setCollectedGems] = useState<string[]>([]);

  const AI_API_KEY = process.env.NEXT_PUBLIC_CLAUDE_API_KEY || '';

  const handleAddMaterial = async () => {
    if (!currentMaterial.trim()) return;

    setMaterials([...materials, currentMaterial]);
    setCurrentMaterial('');

    // 触发苏格拉底式追问
    setIsLoading(true);
    try {
      const engine = new CognitiveEngine(AI_API_KEY);
      const q = await engine.dig(currentMaterial);
      setQuestions(q);
    } catch (error) {
      console.error('生成追问失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerQuestion = (answer: string) => {
    // 将回答作为新素材
    setMaterials([...materials, answer]);
    setQuestions(questions.slice(1)); // 移除已回答的问题

    // 收集宝石
    if (collectedGems.length < 10) {
      setCollectedGems([...collectedGems, `💎`]);
    }
  };

  const handleComplete = () => {
    materials.forEach(m => addMaterial(m));
    completeStep(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-8">
      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-purple-800 mb-2">💎 密林寻宝</h1>
        <p className="text-lg text-gray-600">挖掘素材，收集宝石</p>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4">
        {/* 宝石收集进度 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Gem className="w-6 h-6 mr-2 text-yellow-600" />
            宝石收集进度：{collectedGems.length} / 10
          </h2>
          <div className="flex flex-wrap gap-2">
            {collectedGems.map((gem, i) => (
              <motion.div
                key={i}
                className="text-3xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                {gem}
              </motion.div>
            ))}
            {[...Array(10 - collectedGems.length)].map((_, i) => (
              <div key={i} className="text-3xl text-gray-300">
                💎
              </div>
            ))}
          </div>
        </motion.div>

        {/* 素材输入 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Plus className="w-6 h-6 mr-2 text-blue-600" />
            记录你的素材
          </h2>
          <p className="text-gray-600 mb-4">
            回忆与题目相关的生活经历，写下你的素材：
          </p>

          <textarea
            value={currentMaterial}
            onChange={(e) => setCurrentMaterial(e.target.value)}
            placeholder="例如：那天放学，妈妈在校门口等我..."
            className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500 resize-none min-h-[120px] text-lg"
          />

          <motion.button
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddMaterial}
            disabled={isLoading || !currentMaterial.trim()}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2">🔍</span>
                墨玉正在挖掘细节...
              </span>
            ) : (
              '➕ 添加素材'
            )}
          </motion.button>
        </motion.div>

        {/* 已收集素材 */}
        {materials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">📚 已收集素材</h2>
            <div className="space-y-3">
              {materials.map((material, i) => (
                <motion.div
                  key={i}
                  className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {material}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 苏格拉底式追问 */}
        {questions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
              墨玉的追问
            </h2>
            <p className="text-gray-600 mb-4">
              为了挖掘更多细节，请回答以下问题：
            </p>

            <div className="space-y-4">
              {questions.slice(0, 3).map((q, i) => (
                <div key={i} className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-blue-800 mb-2">{q.question}</p>
                  {q.hint && (
                    <p className="text-sm text-blue-600">💡 {q.hint}</p>
                  )}
                  <div className="mt-3 flex space-x-3">
                    <motion.button
                      className="px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleAnswerQuestion(`关于"${q.question}"的思考...`)}
                    >
                      回答
                    </motion.button>
                    <motion.button
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      稍后
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 通关按钮 */}
        {materials.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <motion.button
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-4 rounded-xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleComplete}
            >
              🎯 素材充足，前往下一关！
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
