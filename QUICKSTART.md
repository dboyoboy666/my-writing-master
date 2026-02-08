# 快速开始指南

## 5分钟上手

### 第一步：安装依赖

```bash
cd my-writing-master
npm install
```

### 第二步：配置 API Key

编辑 `.env.local` 文件，添加 Claude API Key：

```
NEXT_PUBLIC_CLAUDE_API_KEY=sk-ant-xxx
```

获取 API Key: https://console.anthropic.com/settings/keys

### 第三步：启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 🎉

## 项目预览

### 页面结构

- **首页** (`/`): 项目介绍和开始按钮
- **第1步** (`/step1`): 审题大本营 - 分析题目，选择关键词
- **第2步** (`/step2`): 密林寻宝 - 挖掘素材，收集宝石
- **第3步** (`/step3`): 半山凉亭 - 选择结构模板，搭建大纲
- **第4步** (`/step4`): 绝壁攀岩 - 写作草稿，AI陪伴
- **第5步** (`/step5`): 云端魔镜 - 对比润色
- **第6步** (`/step6`): 极顶插旗 - 雷达图复盘，庆祝登顶

### 核心组件

- **MountainMap**: 登山地图导航
- **MoyuBall**: 拟人球墨玉（始终显示在右下角）
- **NavigationGuard**: 路由守卫，防止跳步

## 功能测试

### 1. 审题功能测试

1. 进入 `/step1`
2. 输入题目："那一刻，我长大了"
3. 点击"让墨玉分析题目"
4. 选择关键词通关

### 2. 素材收集测试

1. 进入 `/step2`
2. 输入素材："那天放学，妈妈在校门口等我..."
3. 点击"添加素材"
4. 回答苏格拉底追问
5. 收集10个宝石

### 3. 结构搭建测试

1. 进入 `/step3`
2. 选择"欲扬先抑法"
3. 填写每个段落的内容
4. 至少填写2个段落通关

### 4. 写作测试

1. 进入 `/step4`
2. 开始写作（至少300字）
3. 点击"问墨玉"获取帮助
4. 30秒无操作触发"灵感阶梯"

### 5. 润色测试

1. 进入 `/step5`
2. 点击"智能润色"
3. 查看原文和润色版对比
4. 手动修改润色版

### 6. 登顶庆祝测试

1. 进入 `/step6`
2. 查看金字拼图
3. 查看五维雷达图
4. 分享成就

## 常见问题

### Q: 页面空白或报错？

A: 检查是否配置了 API Key

```bash
# 确认 .env.local 文件存在
cat .env.local

# 确认 API Key 有效
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-3-5-sonnet-20241022","max_tokens":100,"messages":[{"role":"user","content":"hello"}]}'
```

### Q: 墨玉球不显示？

A: 检查浏览器控制台是否有错误，确保使用现代浏览器（Chrome、Firefox、Safari）

### Q: 无法通关？

A: 每个步骤都有最低要求：
- 步骤1: 必须选择关键词
- 步骤2: 至少收集3个素材
- 步骤3: 至少填写2个段落
- 步骤4: 至少300字
- 步骤5: 点击润色按钮

### Q: 灵感阶梯不触发？

A: 需要30秒无操作才会触发，快速连续打字不会触发

## 开发调试

### 查看状态

打开浏览器控制台，输入：

```javascript
// 查看写作状态
localStorage.getItem('writing-master-storage')
```

### 重置进度

```javascript
// 清除所有进度
localStorage.removeItem('writing-master-storage')
location.reload()
```

### 调试AI响应

在 `src/lib/cognitive-engine.ts` 中添加 `console.log`：

```typescript
console.log('AI Request:', prompt)
console.log('AI Response:', response)
```

## 下一步

- 📖 阅读 [README.md](README.md) 了解完整文档
- 🌐 查看 [DEPLOY.md](DEPLOY.md) 部署到公网
- 🛠️ 查看代码了解实现细节

---

**祝你使用愉快！** ✨
