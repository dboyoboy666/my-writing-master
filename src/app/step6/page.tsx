'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Trophy, Star, Award, Share2 } from 'lucide-react';
import { useWritingStore } from '@/stores/writing';
import { RadarData } from '@/types/writing';

const themePhrases = [
  { theme: '成长', phrase: '破茧成蝶' },
  { theme: '坚持', phrase: '锲而不舍' },
  { theme: '感恩', phrase: '寸草春晖' },
  { theme: '梦想', phrase: '志存高远' },
  { theme: '友情', phrase: '肝胆相照' },
  { theme: '亲情', phrase: '舐犊情深' },
  { theme: '勇气', phrase: '勇往直前' },
  { theme: '收获', phrase: '硕果累累' },
];

export default function Step6SummitPanorama() {
  const { draft, polished, collectedKeywords, collectedMaterials } = useWritingStore();
  const [showCelebration, setShowCelebration] = useState(false);
  const [finalText, setFinalText] = useState('');
  const [radarData, setRadarData] = useState<RadarData | null>(null);
  const [goldenChars, setGoldenChars] = useState<string[]>([]);
  const [collectedPhrase, setCollectedPhrase] = useState('');
  const controls = useAnimation();

  useEffect(() => {
    // 获取最终文本
    setFinalText(polished || draft);

    // 生成雷达图数据（模拟）
    const data: RadarData = {
      labels: ['立意', '选材', '结构', '语言', '情感'],
      datasets: [
        {
          label: '你的文章',
          data: [
            Math.min(90, 50 + collectedKeywords.length * 10),
            Math.min(95, 50 + collectedMaterials.length * 8),
            Math.min(90, 60 + Math.floor(finalText.length / 100)),
            Math.min(85, 40 + Math.floor(finalText.length / 50)),
            80,
          ],
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgb(59, 130, 246)',
        },
      ],
    };
    setRadarData(data);

    // 生成金字拼图
    const phrase = themePhrases[Math.floor(Math.random() * themePhrases.length)];
    setCollectedPhrase(phrase.phrase);
    setGoldenChars(phrase.phrase.split(''));

    // 触发庆祝动画
    setShowCelebration(true);
    setTimeout(() => {
      controls.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.5, repeat: 3 },
      });
    }, 500);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '我的随身写作大师',
          text: `我刚刚完成了一篇作文！字数：${finalText.length}，快来试试吧！`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('分享取消');
      }
    } else {
      alert('你的浏览器不支持分享功能');
    }
  };

  const handleRestart = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 py-8 overflow-hidden">
      {/* 庆祝特效 */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -200],
                transition: {
                  duration: 2,
                  delay: i * 0.05,
                },
              }}
            >
              🎉
            </motion.div>
          ))}
        </div>
      )}

      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.h1
          className="text-6xl font-bold text-white mb-4 drop-shadow-lg"
          animate={controls}
        >
          🏆 极顶插旗
        </motion.h1>
        <p className="text-2xl text-white/90 drop-shadow-md">全景复盘，巅峰时刻</p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4">
        {/* 金字拼图 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-yellow-700">
            🎯 金字拼图
          </h2>
          <div className="flex justify-center space-x-4 mb-6">
            {goldenChars.map((char, i) => (
              <motion.div
                key={i}
                className="text-6xl font-bold text-yellow-500 animate-bounce"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2 + i * 0.2 }}
              >
                {char}
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xl text-gray-700 font-semibold">
            恭喜你完成：《{collectedPhrase}》
          </p>
        </motion.div>

        {/* 雷达图 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
            📊 五维能力雷达图
          </h2>
          {radarData && (
            <div className="grid grid-cols-5 gap-4 text-center">
              {radarData.labels.map((label, i) => (
                <div key={i}>
                  <div
                    className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center relative overflow-hidden"
                    style={{
                      clipPath: `inset(${100 - radarData.datasets[0].data[i]}% 0 0 0)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600" />
                    <div className="relative text-white font-bold text-2xl">
                      {Math.round(radarData.datasets[0].data[i])}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700 font-semibold">{label}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* 文章展示 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 max-h-[500px] overflow-y-auto"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
            📝 你的作品
          </h2>
          <div className="prose prose-lg max-w-none mx-auto">
            <div className="whitespace-pre-line text-gray-800 leading-relaxed">
              {finalText}
            </div>
          </div>
        </motion.div>

        {/* 成就统计 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
            🏅 写作成就
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">
                {finalText.length}
              </div>
              <div className="text-gray-600">总字数</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">
                {collectedKeywords.length}
              </div>
              <div className="text-gray-600">关键词</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600">
                {collectedMaterials.length}
              </div>
              <div className="text-gray-600">素材数</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-600">
                6
              </div>
              <div className="text-gray-600">关卡</div>
            </div>
          </div>
        </motion.div>

        {/* 按钮组 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5 }}
          className="flex flex-col md:flex-row justify-center gap-4"
        >
          <motion.button
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestart}
          >
            <div className="flex items-center justify-center">
              <Star className="w-6 h-6 mr-2" />
              再写一篇
            </div>
          </motion.button>

          <motion.button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
          >
            <div className="flex items-center justify-center">
              <Share2 className="w-6 h-6 mr-2" />
              分享成就
            </div>
          </motion.button>
        </motion.div>

        {/* 鼓励语 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          className="mt-12 text-center text-white/90 text-xl italic"
        >
          <p>🚀 写作之路永无止境，期待你的下一次精彩创作！</p>
        </motion.div>
      </div>
    </div>
  );
}
