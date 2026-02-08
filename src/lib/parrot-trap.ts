/**
 * 鹦鹉学舌陷阱 - 防抄袭检测
 * 触发：用户直接复制AI例句（相似度>80%）
 */

export class ParrotTrap {
  /**
   * 简单的文字相似度对比（余弦相似度）
   * 用于端侧快速判断，减少AI API调用
   */
  calculateSimilarity(str1: string, str2: string): number {
    // 简化版相似度计算 - 基于词频
    const words1 = this.tokenize(str1);
    const words2 = this.tokenize(str2);

    if (words1.length === 0 || words2.length === 0) return 0;

    // 计算词频向量
    const freq1 = this.wordFrequency(words1);
    const freq2 = this.wordFrequency(words2);

    // 计算余弦相似度
    const dotProduct = this.dotProduct(freq1, freq2);
    const magnitude1 = Math.sqrt(this.dotProduct(freq1, freq1));
    const magnitude2 = Math.sqrt(this.dotProduct(freq2, freq2));

    if (magnitude1 === 0 || magnitude2 === 0) return 0;

    return dotProduct / (magnitude1 * magnitude2);
  }

  /**
   * 拆词
   */
  private tokenize(text: string): string[] {
    // 简单的中文分词（按字符）
    return text.replace(/[^\u4e00-\u9fa5]/g, '').split('');
  }

  /**
   * 词频统计
   */
  private wordFrequency(words: string[]): { [key: string]: number } {
    const freq: { [key: string]: number } = {};
    words.forEach(word => {
      freq[word] = (freq[word] || 0) + 1;
    });
    return freq;
  }

  /**
   * 点积计算
   */
  private dotProduct(freq1: { [key: string]: number }, freq2: { [key: string]: number }): number {
    let sum = 0;
    Object.keys(freq1).forEach(key => {
      if (freq2[key]) {
        sum += freq1[key] * freq2[key];
      }
    });
    return sum;
  }

  /**
   * 检测是否为鹦鹉学舌
   */
  detectParrot(userText: string, aiExamples: string[]): { isParrot: boolean; similarity: number; original: string } {
    let maxSimilarity = 0;
    let originalExample = '';

    for (const example of aiExamples) {
      const similarity = this.calculateSimilarity(userText, example);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        originalExample = example;
      }
    }

    // 阈值：80%
    const isParrot = maxSimilarity > 0.8;

    return {
      isParrot,
      similarity: maxSimilarity,
      original: originalExample,
    };
  }

  /**
   * 拆解+迁移教学
   * 保留句式骨架，强制要求更换主语和动词进行仿写
   */
  generateMigrationExercise(originalSentence: string): {
    skeleton: string;
    blanks: string[];
    hint: string;
  } {
    // 简单的句式骨架提取
    // 这里使用规则匹配，实际项目应该使用NLP技术
    let skeleton = originalSentence;
    const blanks: string[] = [];

    // 示例规则：替换名词、动词
    const nounPatterns = /([一二三四五六七八九十百千万零]+|[春夏秋冬春夏秋冬]+|[天地人你我他她它们]+)/g;
    const verbPatterns = /(跑|走|跳|吃|喝|睡|看|听|说|想|做|写|读|学|爱|喜欢|高兴|难过|害怕|紧张|感动|流泪|拥抱|微笑|大笑|哭泣|奔跑|跳跃|飞翔|游泳|唱歌|跳舞|弹琴|画画|写字|读书|学习|工作|生活|成长|变化|进步|成功|失败|坚持|放弃|努力|奋斗|拼搏|梦想|希望|未来|过去|现在|今天|明天|昨天|早晨|中午|下午|晚上|深夜|凌晨)/g;

    // 标记需要替换的部分
    let match;
    while ((match = nounPatterns.exec(originalSentence)) !== null) {
      if (match[0].length > 1) {
        skeleton = skeleton.replace(match[0], '【____】');
        blanks.push(match[0]);
      }
    }

    while ((match = verbPatterns.exec(originalSentence)) !== null) {
      if (match[0].length > 1) {
        skeleton = skeleton.replace(match[0], '【____】');
        blanks.push(match[0]);
      }
    }

    return {
      skeleton,
      blanks,
      hint: '请根据句式骨架，用自己的素材填充空白处，保持句式但改变内容。',
    };
  }

  /**
   * 降级为填空题（连续3次失败后的兜底方案）
   */
  generateFillInTheBlank(originalSentence: string): {
    sentence: string;
    options: string[][];
    answer: number[];
  } {
    const words = this.tokenize(originalSentence);
    const blanksCount = Math.min(3, Math.floor(words.length / 5));

    const blankPositions: number[] = [];
    const options: string[][] = [];

    // 随机选择位置
    for (let i = 0; i < blanksCount; i++) {
      const pos = Math.floor(Math.random() * words.length);
      blankPositions.push(pos);

      // 提供选项
      options.push([
        words[pos],
        this.getSynonym(words[pos]) || '其他词1',
        this.getSynonym(words[pos]) || '其他词2',
      ]);
    }

    // 构建填空句子
    const sentenceParts = words.map((word, index) =>
      blankPositions.includes(index) ? `【第${blankPositions.indexOf(index) + 1}空】` : word
    );

    return {
      sentence: sentenceParts.join(''),
      options,
      answer: blankPositions.map(() => 0), // 第一个选项是正确答案
    };
  }

  /**
   * 获取同义词（简化版）
   */
  private getSynonym(word: string): string | null {
    const synonyms: { [key: string]: string[] } = {
      '高兴': ['快乐', '愉快', '开心'],
      '难过': ['悲伤', '伤心', '痛苦'],
      '美丽': ['漂亮', '好看', '迷人'],
      '跑': ['奔跑', '疾走', '飞奔'],
      '说': ['讲', '谈', '道'],
      // ...更多同义词
    };

    const options = synonyms[word];
    return options ? options[Math.floor(Math.random() * options.length)] : null;
  }
}
