'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MountainMap } from '@/components/MountainMap';
import { Trophy, GraduationCap, BookOpen } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-emerald-500">
      {/* 顶部标题 */}
      <div className="container mx-auto px-4 pt-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-white mb-4 animate-bounce">
            📝 我的随身写作大师
          </h1>
          <p className="text-2xl text-white/90 mb-8">
            基于大语言模型的沉浸式、伴随式写作指导
          </p>
        </motion.div>
      </div>

      {/* 登山地图 */}
      <div className="container mx-auto px-4 max-w-6xl">
        <MountainMap />
      </div>

      {/* 核心功能卡片 */}
      <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-3 gap-8 mt-12">
        {/* 卡片1：教学理念 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-shadow"
        >
          <GraduationCap className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold mb-3">六步登山法</h3>
          <p className="text-gray-600">
            从审题到登顶，每一步都有墨玉的陪伴和指导，循序渐进提升写作能力。
          </p>
        </motion.div>

        {/* 卡片2：三阶认知 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-shadow"
        >
          <BookOpen className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-2xl font-bold mb-3">三阶认知迭代</h3>
          <p className="text-gray-600">
            启发式引导 → 苏格拉底追问 → 批判性挑刺，深度挖掘写作潜能。
          </p>
        </motion.div>

        {/* 卡片3：游戏化 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-shadow"
        >
          <Trophy className="w-12 h-12 text-yellow-600 mb-4" />
          <h3 className="text-2xl font-bold mb-3">游戏化激励</h3>
          <p className="text-gray-600">
            金字拼图、成就系统、巅峰庆祝，让写作变成一场有趣的冒险。
          </p>
        </motion.div>
      </div>

      {/* 开始写作按钮 */}
      <div className="container mx-auto px-4 mt-16 text-center">
        <motion.button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-16 py-6 rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/step1')}
        >
          🚀 立即开始写作冒险
        </motion.button>

        <p className="text-white/80 mt-8">
          每天免费1篇，会员无限量 | 看广告解锁高阶点评
        </p>
      </div>

      {/* 底部信息 */}
      <footer className="mt-24 py-8 text-center text-white/60">
        <p>© 2026 我的随身写作大师 | 让每个孩子都能享受写作的乐趣</p>
      </footer>
    </div>
  );
}
