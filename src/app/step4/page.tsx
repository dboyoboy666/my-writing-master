'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Edit, MessageCircle, Sparkles, CheckCircle } from 'lucide-react';
import { useWritingStore } from '@/stores/writing';
import { InspirationLadder } from '@/lib/inspiration-ladder';
import { ParrotTrap } from '@/lib/parrot-trap';

export default function Step4CompanionClimb() {
  const { completeStep, setDraft, collectedMaterials, structure } = useWritingStore();
  const [draft, setLocalDraft] = useState('');
  const [showAIHelper, setShowAIHelper] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [showInspirationLadder, setShowInspirationLadder] = useState(false);
  const [inspirationStep, setInspirationStep] = useState(1);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [isParrotDetected, setIsParrotDetected] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const ladder = new InspirationLadder();
  const parrotTrap = new ParrotTrap();

  // 心流检测
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = now - lastActivity;

      if (diff > 30000 && !showInspirationLadder) {
        // 30秒无操作，触发灵感阶梯
        setShowInspirationLadder(true);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [lastActivity, showInspirationLadder]);

  const handleInputChange = (e: React.ChangeInterceptor<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setLocalDraft(value);
    setLastActivity(Date.now());
    setShowInspirationLadder(false);
    setInspirationStep(1);
  };

  const handleAskAI = async () => {
    if (!draft.trim()) return;

    setShowAIHelper(true);
    // 这里应该调用AI API，暂时模拟
    setAiResponse('墨玉正在思考如何帮助你改进这一段...');
    setTimeout(() => {
      setAiResponse('建议：可以增加一些环境描写来烘托氛围，比如当时的天气、光线、周围的声音等。同时，试着加入更多内心感受，让读者能感受到你的情绪变化。');
    }, 1500);
  };

  const handleInspirationClick = () => {
    if (inspirationStep < 3) {
      setInspirationStep(inspirationStep + 1);
    } else {
      setShowInspirationLadder(false);
      setInspirationStep(1);
    }
  };

  const handleParrotCheck = () => {
    // 检测是否复制了AI的建议
    if (aiResponse && draft.includes(aiResponse)) {
      const result = parrotTrap.detectParrot(draft, [aiResponse]);
      if (result.isParrot) {
        setIsParrotDetected(true);
      }
    }
  };

  const handleComplete = () => {
    handleParrotCheck();
    setDraft(draft);
    completeStep(4);
  };

  const currentContext = structure?.content
    ? Object.values(structure.content).join('\n')
    : collectedMaterials.join('\n');

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-100 py-8">
      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-amber-800 mb-2">🧗 绝壁攀岩</h1>
        <p className="text-lg text-gray-600">沉浸写作，伴随指导</p>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4">
        {/* 写作区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Edit className="w-6 h-6 mr-2 text-amber-600" />
            开始写作吧！
          </h2>
          <p className="text-gray-600 mb-6">
            根据你的大纲和素材，尽情发挥吧！墨玉会在你身边随时提供帮助。
          </p>

          <textarea
            ref={textareaRef}
            value={draft}
            onChange={handleInputChange}
            placeholder="在这里写下你的文章..."
            className="w-full px-6 py-4 border-4 border-amber-300 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-500 resize-none min-h-[500px] text-lg leading-relaxed"
          />

          {/* AI助手按钮 */}
          <motion.button
            className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAskAI}
            disabled={!draft.trim()}
          >
            <MessageCircle className="w-5 h-5" />
            <span>问墨玉</span>
          </motion.button>

          {/* AI助手对话框 */}
          {showAIHelper && aiResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  墨
                </div>
                <div>
                  <p className="text-gray-800">{aiResponse}</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* 灵感阶梯 */}
        {showInspirationLadder && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-dashed border-purple-400"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
              💡 灵感阶梯
            </h3>

            {inspirationStep === 1 && (
              <div>
                <p className="text-gray-700 mb-4">
                  {ladder.getStep1Guidance(currentContext)}
                </p>
                <motion.button
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleInspirationClick}
                >
                  需要更多帮助
                </motion.button>
              </div>
            )}

            {inspirationStep === 2 && (
              <div>
                <p className="text-gray-700 mb-4">看看这个对比：</p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <p className="font-semibold text-red-700 mb-2">初阶写法：</p>
                    <p className="text-gray-700">那天天气很好。</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <p className="font-semibold text-green-700 mb-2">高阶写法：</p>
                    <p className="text-gray-700">
                      晨曦如金线般穿透云层，温柔地洒在青石板路上。
                    </p>
                  </div>
                </div>
                <motion.button
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleInspirationClick}
                >
                  了解高阶写法的奥秘
                </motion.button>
              </div>
            )}

            {inspirationStep === 3 && (
              <div>
                <p className="text-gray-700 mb-4">
                  高阶写法运用了"以景衬情"的手法，通过细腻的感官描写营造氛围，让读者身临其境。
                </p>
                <motion.button
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleInspirationClick}
                >
                  我明白了，继续写作！
                </motion.button>
              </div>
            )}
          </motion.div>
        )}

        {/* 鹦鹉学舌警告 */}
        {isParrotDetected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-2 border-red-500 rounded-2xl p-6 mb-8"
          >
            <h3 className="text-xl font-semibold text-red-700 mb-3">
              ⚠️ 警告：检测到直接复制
            </h3>
            <p className="text-red-600 mb-4">
              这是墨玉的词，不是你的心声！请用自己的语言重新表达。
            </p>
            <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
              <p className="font-semibold text-red-700 mb-2">练习改写：</p>
              <p className="text-gray-700">
                保留句式结构，但更换主语和动词：
              </p>
              <p className="text-sm text-gray-500 mt-2">
                原句：晨曦如金线般穿透云层，温柔地洒在青石板路上。
              </p>
              <p className="text-sm text-gray-500">
                改写：____ 如 ____ 般 ____ ____，____ 地 ____ 在 ____。
              </p>
            </div>
          </motion.div>
        )}

        {/* 统计信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex justify-around text-center">
            <div>
              <div className="text-3xl font-bold text-amber-600">
                {draft.length}
              </div>
              <div className="text-gray-600">字数</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {Math.floor(draft.length / 300)}
              </div>
              <div className="text-gray-600">段落</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">
                ⏱️
              </div>
              <div className="text-gray-600">专注中</div>
            </div>
          </div>
        </motion.div>

        {/* 通关按钮 */}
        {draft.length >= 300 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
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
                ✅ 初稿完成，前往润色！
              </div>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
