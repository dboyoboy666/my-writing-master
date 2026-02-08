'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Plus, CheckCircle, GripVertical } from 'lucide-react';
import { useWritingStore } from '@/stores/writing';

const structureTemplates = [
  {
    id: 'yiyang',
    name: '欲扬先抑法',
    description: '先写不足/困境，再写转变/成长，最后升华主题',
    slots: [
      { id: '1', name: '抑-铺垫', description: '描述困境或不足' },
      { id: '2', name: '转折点', description: '关键事件或感悟' },
      { id: '3', name: '扬-成长', description: '展现转变和收获' },
      { id: '4', name: '升华', description: '点明主题，呼应开头' },
    ],
  },
  {
    id: 'shunxu',
    name: '顺叙法',
    description: '按照时间顺序展开，清晰自然',
    slots: [
      { id: '1', name: '开头', description: '引入场景和人物' },
      { id: '2', name: '发展', description: '事件展开' },
      { id: '3', name: '高潮', description: '故事的转折点' },
      { id: '4', name: '结尾', description: '总结和升华' },
    ],
  },
  {
    id: 'daoxu',
    name: '倒叙法',
    description: '从结果或高潮开始，再回溯过程',
    slots: [
      { id: '1', name: '结果', description: '引人入胜的开头' },
      { id: '2', name: '回溯', description: '交代背景和起因' },
      { id: '3', name: '展开', description: '详细叙述过程' },
      { id: '4', name: '呼应', description: '回到开头，深化主题' },
    ],
  },
];

export default function Step3StructureBlueprint() {
  const { completeStep, setStructure } = useWritingStore();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [structureContent, setStructureContent] = useState<{ [key: string]: string }>({});
  const [isDragging, setIsDragging] = useState(false);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setStructureContent({});
  };

  const handleSlotChange = (slotId: string, value: string) => {
    setStructureContent({ ...structureContent, [slotId]: value });
  };

  const handleComplete = () => {
    if (selectedTemplate) {
      const template = structureTemplates.find(t => t.id === selectedTemplate);
      if (template) {
        setStructure({
          ...template,
          content: structureContent,
        });
        completeStep(3);
      }
    }
  };

  const currentTemplate = selectedTemplate
    ? structureTemplates.find(t => t.id === selectedTemplate)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 py-8">
      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-blue-800 mb-2">🏗️ 半山凉亭</h1>
        <p className="text-lg text-gray-600">搭建结构，规划大纲</p>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4">
        {/* 选择结构模板 */}
        {!selectedTemplate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {structureTemplates.map((template, i) => (
              <motion.div
                key={template.id}
                className="bg-white rounded-2xl shadow-xl p-6 cursor-pointer hover:shadow-2xl transition-shadow border-2 border-transparent hover:border-blue-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTemplateSelect(template.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-2 text-blue-700">
                  {template.name}
                </h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <div className="space-y-2">
                  {template.slots.map((slot, j) => (
                    <div
                      key={j}
                      className="flex items-start space-x-2 text-sm"
                    >
                      <GripVertical className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-blue-600">
                          {slot.name}
                        </div>
                        <div className="text-gray-500">{slot.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* 结构搭建界面 */}
        {selectedTemplate && currentTemplate && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-blue-800">
                  📐 {currentTemplate.name}
                </h2>
                <motion.button
                  className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedTemplate(null)}
                >
                  换一个模板
                </motion.button>
              </div>
              <p className="text-gray-600 mb-6">{currentTemplate.description}</p>

              {/* 拖拽搭建区域 */}
              <div className="space-y-6">
                {currentTemplate.slots.map((slot, i) => (
                  <motion.div
                    key={slot.id}
                    className="bg-blue-50 rounded-lg p-6 border-2 border-dashed border-blue-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ borderColor: '#3b82f6' }}
                  >
                    <div className="flex items-center mb-3">
                      <GripVertical className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-bold text-lg text-blue-700">
                        {slot.name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {slot.description}
                    </p>
                    <textarea
                      value={structureContent[slot.id] || ''}
                      onChange={(e) => handleSlotChange(slot.id, e.target.value)}
                      placeholder={`在这里填写"${slot.name}"的内容...`}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 resize-none min-h-[100px] text-base"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 预览 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Layout className="w-6 h-6 mr-2 text-green-600" />
                大纲预览
              </h3>
              <div className="space-y-4">
                {currentTemplate.slots.map((slot, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-lg ${
                      structureContent[slot.id]
                        ? 'bg-green-50 border-l-4 border-green-500'
                        : 'bg-gray-50 border-l-4 border-gray-300'
                    }`}
                  >
                    <div className="font-bold text-green-700 mb-2">
                      {i + 1}. {slot.name}
                    </div>
                    <div className="text-gray-700">
                      {structureContent[slot.id] || '暂无内容'}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 通关按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <motion.button
                className={`px-12 py-4 rounded-xl font-bold text-xl shadow-2xl transition-all ${
                  Object.keys(structureContent).length >= 2
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-3xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                whileHover={{ scale: Object.keys(structureContent).length >= 2 ? 1.05 : 1 }}
                whileTap={{ scale: Object.keys(structureContent).length >= 2 ? 0.95 : 1 }}
                onClick={handleComplete}
                disabled={Object.keys(structureContent).length < 2}
              >
                <div className="flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 mr-2" />
                  {Object.keys(structureContent).length >= 2
                    ? '✅ 大纲完成，前往写作！'
                    : '请至少填写2个段落'}
                </div>
              </motion.button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
