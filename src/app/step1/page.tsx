'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Brain, CheckCircle } from 'lucide-react';
import { useWritingStore } from '@/stores/writing';
import { CognitiveEngine } from '@/lib/cognitive-engine';

const sampleTopics = [
  '那一刻，我长大了',
  '最美的风景',
  '难忘的瞬间',
  '我的成长故事',
  '那次，我学会了坚持',
];

export default function Step1BaseCamp() {
  const { completeStep, addKeyword } = useWritingStore();
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  // 模拟AI API Key（实际部署时应该从环境变量获取）
  const AI_API_KEY = process.env.NEXT_PUBLIC_CLAUDE_API_KEY || '';

  const analyzeTopic = async () => {
    if (!topic.trim()) return;

    setIsLoading(true);

    try {
      // 使用启发式引导分析题目
      const engine = new CognitiveEngine(AI_API_KEY);
      const response = await engine.spark(topic, []);

      setAiResponse(response);

      // 提取关键词（简化版）
      const extractedKeywords = extractKeywords(topic);
      setKeywords(extractedKeywords);
    } catch (error) {
      console.error('分析题目失败:', error);
      setAiResponse('分析题目时遇到问题，请稍后再试。');
    } finally {
      setIsLoading(false);
    }
  };

  const extractKeywords = (text: string): string[] => {
    // 简化的关键词提取（实际应该使用NLP技术）
    const commonWords = ['的', '了', '在', '是', '我', '有', '和', '就', '不', '那', '这'];
    return text
      .split('')
      .filter(char => !commonWords.includes(char) && char.trim())
      .slice(0, 5);
  };

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeyword(keyword);
    addKeyword(keyword);
  };

  const handleQuickTopic = (quickTopic: string) => {
    setTopic(quickTopic);
  };

  const handleComplete = () => {
    if (selectedKeyword) {
      completeStep(1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-emerald-100 py-8">
      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-blue-800 mb-2">🎯 审题大本营</h1>
        <p className="text-lg text-gray-600">高亮题目关键词，理解题意精髓</p>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4">
        {/* 题目输入 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Target className="w-6 h-6 mr-2 text-blue-600" />
            请输入或选择作文题目
          </h2>

          <div className="space-y-4">
            {/* 快捷题目选择 */}
            <div>
              <p className="text-sm text-gray-600 mb-2">快捷选择：</p>
              <div className="flex flex-wrap gap-2">
                {sampleTopics.map((t, i) => (
                  <motion.button
                    key={i}
                    className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickTopic(t)}
                  >
                    {t}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* 题目输入框 */}
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="例如：那一刻，我长大了"
              className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 resize-none min-h-[100px] text-lg"
            />

            {/* 分析按钮 */}
            <motion.button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={analyzeTopic}
              disabled={isLoading || !topic.trim()}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">🌀</span>
                  墨玉正在分析题目...
                </span>
              ) : (
                '🔍 让墨玉分析题目'
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* AI分析结果 */}
        {aiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Brain className="w-6 h-6 mr-2 text-purple-600" />
              墨玉的分析
            </h2>
            <div className="prose prose-blue max-w-none">
              {aiResponse.split('\n').map((line, i) => (
                <p key={i} className="mb-3">
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        )}

        {/* 关键词选择 */}
        {keywords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2 text-yellow-600" />
              题眼关键词
            </h2>
            <p className="text-gray-600 mb-4">
              请选择最能体现题目核心的关键词（选中后即可通关）：
            </p>
            <div className="flex flex-wrap gap-3">
              {keywords.map((keyword, i) => (
                <motion.button
                  key={i}
                  className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all ${
                    selectedKeyword === keyword
                      ? 'bg-green-500 text-white shadow-lg scale-110'
                      : 'bg-yellow-100 hover:bg-yellow-200 text-gray-800'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleKeywordClick(keyword)}
                >
                  {keyword}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* 通关按钮 */}
        {selectedKeyword && (
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
              <div className="flex items-center justify-center">
                <CheckCircle className="w-8 h-8 mr-2" />
                通关！选中题眼：{selectedKeyword}
              </div>
            </motion.button>
          </motion.div>
        )}

        {/* 提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>💡 提示：选中关键词后，墨玉会帮你记住，方便后续写作时参考</p>
        </motion.div>
      </div>
    </div>
  );
}
