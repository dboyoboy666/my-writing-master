# 部署指南

## 方式一：使用 Vercel 一键部署（推荐）

### 1. 准备工作

- 注册 [Vercel](https://vercel.com) 账号
- 安装 Git
- 获取 Claude API Key: https://console.anthropic.com/settings/keys

### 2. 一键部署

点击下方按钮，按照提示完成部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**或者手动部署：**

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 进入项目目录
cd my-writing-master

# 4. 部署到开发环境
vercel

# 5. 设置环境变量
vercel env add NEXT_PUBLIC_CLAUDE_API_KEY

# 6. 部署到生产环境
vercel --prod
```

### 3. 配置环境变量

在 Vercel Dashboard 中：

1. 进入项目设置
2. 点击 "Environment Variables"
3. 添加变量：
   - `NEXT_PUBLIC_CLAUDE_API_KEY` = 你的API Key
   - `NEXT_PUBLIC_CLAUDE_MODEL` = claude-3-5-sonnet-20241022

## 方式二：部署到其他平台

### Netlify

```bash
# 1. 安装 Netlify CLI
npm install -g netlify-cli

# 2. 登录
netlify login

# 3. 构建项目
npm run build

# 4. 部署
netlify deploy --prod
```

### Railway

1. 访问 https://railway.app
2. 点击 "New Project" → "Deploy from GitHub repo"
3. 选择项目仓库
4. 添加环境变量
5. 点击 "Deploy"

### Render

1. 访问 https://render.com
2. 点击 "New +" → "Web Service"
3. 连接 GitHub 仓库
4. 配置：
   - Build Command: `npm run build`
   - Start Command: `npm start`
5. 添加环境变量
6. 点击 "Create Web Service"

## 方式三：自建服务器部署

### 使用 Docker

```bash
# 1. 构建镜像
docker build -t writing-master .

# 2. 运行容器
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_CLAUDE_API_KEY=your_key \
  writing-master
```

### 使用 PM2 (Node.js 服务器)

```bash
# 1. 安装依赖
npm install

# 2. 构建
npm run build

# 3. 安装 PM2
npm install -g pm2

# 4. 启动
pm2 start npm --name "writing-master" -- start

# 5. 设置开机自启
pm2 startup
pm2 save
```

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 域名绑定

### Vercel

1. 进入项目设置
2. 点击 "Domains"
3. 添加你的域名
4. 按照提示配置 DNS

### 其他平台

参考对应平台的域名绑定文档

## SSL 证书

- **Vercel/Netlify**: 自动提供免费 SSL
- **自建服务器**: 使用 Let's Encrypt

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com
```

## 性能优化建议

### 1. CDN 加速

- 使用 Cloudflare CDN
- 配置缓存策略

### 2. 图片优化

```bash
# 使用 Next.js Image 组件自动优化
import Image from 'next/image';
```

### 3. 代码分割

Next.js 自动进行代码分割，无需额外配置

### 4. 数据库（如果需要）

当前版本使用浏览器本地存储，如需持久化：

- **Supabase**: 免费 PostgreSQL
- **Firebase**: 实时数据库
- **MongoDB Atlas**: 免费云数据库

## 监控和日志

### 错误监控

推荐使用：
- Sentry: https://sentry.io
- LogRocket: https://logrocket.com

### 性能监控

- Google Analytics
- Vercel Analytics (内置)

## 备份策略

### 代码备份

- 使用 Git 定期提交
- 推送到 GitHub/GitLab

### 数据备份

当前使用浏览器本地存储，如需后端：

- 每日自动备份数据库
- 使用对象存储（如 AWS S3）

## 故障排查

### 常见问题

**1. 页面无法加载**

```bash
# 检查构建日志
vercel logs

# 本地测试构建
npm run build
npm start
```

**2. API 调用失败**

- 检查环境变量是否正确设置
- 确认 API Key 有效
- 查看 API 配额

**3. 样式异常**

```bash
# 清理缓存重新构建
rm -rf .next
npm run build
```

## 更新部署

### Vercel

```bash
# 推送代码自动触发部署
git add .
git commit -m "Update"
git push origin main
```

### 其他平台

参考对应平台的持续集成文档

## 成本估算

### Vercel

- Hobby: 免费（每月100GB带宽）
- Pro: $20/月（无限带宽）

### API 调用成本

- 单篇作文: ¥0.06
- 1000用户/天: 约¥180/月

## 技术支持

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- 项目 Issues: https://github.com/your-username/my-writing-master/issues

---

**部署成功后，访问你的域名即可使用！** 🎉
